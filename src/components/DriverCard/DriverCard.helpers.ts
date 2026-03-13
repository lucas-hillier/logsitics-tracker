import { LOCATIONS } from "../../server/mockData";
import type { Driver } from "../../types";
import type { ConfirmPayload } from "../../types";

type DispatchAction = (
  type: string,
  driverIds: string[],
  updates: (Partial<Driver> & { id: string })[],
  rest?: Record<string, unknown>,
) => void;

export const handleModalConfirm = (
  payload: ConfirmPayload,
  driver: Driver,
  allDrivers: Driver[],
  dispatchAction: DispatchAction,
) => {
  if (payload.type === "reassign" && payload.toDriverId) {
    const toDriver = allDrivers.find(
      (driver) => driver.id === payload.toDriverId,
    );
    if (!toDriver) return;

    dispatchAction(
      "REASSIGN_DELIVERY",
      [driver.id, payload.toDriverId],
      [
        { id: driver.id, status: "Idle", progress: 0, eta: "N/A" },
        {
          id: payload.toDriverId,
          status: "Delivering",
          origin: {
            name: "Current Location",
            lat: toDriver.lat,
            lng: toDriver.lng,
          },
          destination: driver.destination,
          progress: 0,
          lat: toDriver.lat,
          lng: toDriver.lng,
          eta: "120 min",
        },
      ],
      { toDriverId: payload.toDriverId },
    );
  }

  if (payload.type === "assign" && payload.destinationKey) {
    const destination = LOCATIONS[payload.destinationKey];

    const origin = {
      name: "Current Location",
      lat: driver.lat,
      lng: driver.lng,
    };

    dispatchAction(
      "ASSIGN_DELIVERY",
      [driver.id],
      [
        {
          id: driver.id,
          status: "Delivering",
          origin,
          destination,
          progress: 0,
          lat: driver.lat,
          lng: driver.lng,
          eta: "120 min",
        },
      ],
      { origin, destination },
    );
  }
};
