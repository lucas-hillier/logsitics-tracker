import type { DriverStatus } from "./types";

export const makeId = () => Math.random().toString(36).slice(2, 9);

export const driverCanBeAssignedToNewDelivery = (
  status: DriverStatus,
): boolean => status === "Idle" || status === "Completed";
