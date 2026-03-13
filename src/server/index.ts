import { WebSocketServer, WebSocket } from "ws";
import { INITIAL_DRIVERS } from "./mockData.ts";
import type { Driver } from "../types";

const PORT = 8080;
const TICK_MS = 2000;

const wss = new WebSocketServer({ port: PORT });

const broadcast = (data: Record<string, unknown>) => {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

let drivers: Driver[] = structuredClone(INITIAL_DRIVERS);

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "SYNC_DRIVERS", drivers }));

  ws.on("message", (raw) => {
    try {
      const action = JSON.parse(raw.toString());

      switch (action.type) {
        case "PAUSE_DRIVER": {
          drivers = drivers.map((d) =>
            d.id === action.driverId ? { ...d, status: "Paused" } : d,
          );
          break;
        }

        case "RESUME_DRIVER": {
          drivers = drivers.map((d) =>
            d.id === action.driverId ? { ...d, status: "Delivering" } : d,
          );
          break;
        }

        case "COMPLETE_DELIVERY": {
          drivers = drivers.map((d) =>
            d.id === action.driverId
              ? { ...d, status: "Completed", progress: 1, eta: "Arrived" }
              : d,
          );
          break;
        }

        case "ASSIGN_DELIVERY": {
          const { origin, destination } = action;
          if (!origin || !destination) break;

          drivers = drivers.map((d) =>
            d.id === action.driverId
              ? {
                  ...d,
                  status: "Delivering",
                  origin,
                  destination,
                  progress: 0,
                  lat: origin.lat,
                  lng: origin.lng,
                  eta: "120 min",
                }
              : d,
          );
          break;
        }

        case "REASSIGN_DELIVERY": {
          const fromDriver = drivers.find((d) => d.id === action.driverId);
          const toDriver = drivers.find((d) => d.id === action.toDriverId);
          if (!fromDriver || !toDriver) break;

          drivers = drivers.map((d) => {
            if (d.id === action.driverId) {
              return { ...d, status: "Idle", progress: 0, eta: "N/A" };
            }
            if (d.id === action.toDriverId) {
              return {
                ...d,
                status: "Delivering",
                origin: {
                  name: "Current Location",
                  lat: toDriver.lat,
                  lng: toDriver.lng,
                },
                destination: fromDriver.destination,
                progress: 0,
                lat: toDriver.lat,
                lng: toDriver.lng,
                eta: "120 min",
              };
            }
            return d;
          });
          break;
        }

        default:
          console.warn("Unknown action type:", action.type);
      }

      broadcast({ type: "ACTION_ACK", actionId: action.actionId });
      broadcast({ type: "SYNC_DRIVERS", drivers });
    } catch (err) {
      console.error("Failed to parse message:", err);
    }
  });
});

setInterval(() => {
  drivers = drivers.map((driver) => {
    if (driver.status !== "Delivering") return driver;

    const newProgress = Math.min(driver.progress + 0.02, 1);
    const totalLat = driver.destination.lat - driver.origin.lat;
    const totalLng = driver.destination.lng - driver.origin.lng;

    return {
      ...driver,
      progress: newProgress,
      lat: driver.origin.lat + totalLat * newProgress,
      lng: driver.origin.lng + totalLng * newProgress,
      eta:
        newProgress >= 1
          ? "Arrived"
          : `${Math.round((1 - newProgress) * 120)} min`,
      status: newProgress >= 1 ? "Completed" : "Delivering",
    };
  });

  broadcast({ type: "SYNC_DRIVERS", drivers });
}, TICK_MS);

console.log(`WebSocket server running on ws://localhost:${PORT}`);
