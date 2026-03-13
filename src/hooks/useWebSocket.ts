import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
  syncDrivers,
  confirmAction,
  rollbackAction,
} from "../store/driversSlice";
import type { Driver } from "../types";

const WS_URL = "ws://localhost:8080";

let socket: WebSocket | null = null;
const sendQueue: object[] = [];

let destroyed = false;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

export const sendAction = (payload: object): boolean => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
    return true;
  }

  if (socket && socket.readyState === WebSocket.CONNECTING) {
    sendQueue.push(payload);
    return true;
  }

  console.warn("WebSocket not open — action dropped:", payload);
  return false;
};

export const useWebSocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pendingAcks = useRef<Map<string, Driver[]>>(new Map());

  useEffect(() => {
    destroyed = false;

    const connect = () => {
      if (destroyed) return;

      const ws = new WebSocket(WS_URL);
      socket = ws;

      ws.onopen = () => {
        while (sendQueue.length > 0) {
          ws.send(JSON.stringify(sendQueue.shift()!));
        }
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case "SYNC_DRIVERS": {
              const drivers = message.drivers as Driver[];
              dispatch(syncDrivers(drivers));
              pendingAcks.current.set("latest", drivers);
              break;
            }

            case "ACTION_ACK": {
              if (message.actionId) {
                dispatch(confirmAction(message.actionId));
                const buffered = pendingAcks.current.get("latest");
                if (buffered) {
                  dispatch(syncDrivers(buffered));
                  pendingAcks.current.delete("latest");
                }
              }
              break;
            }

            case "ACTION_ERROR": {
              if (message.actionId) {
                dispatch(rollbackAction(message.actionId));
                pendingAcks.current.delete("latest");
              }
              break;
            }

            default:
              console.warn("Unknown message type:", message.type);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
      };

      ws.onclose = () => {
        socket = null;
        if (!destroyed) {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      destroyed = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      if (socket) {
        socket.close();
        socket = null;
      }
      sendQueue.length = 0;
    };
  }, [dispatch]);
};
