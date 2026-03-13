import type { DriverStatus } from "./types";

export const STATUS_COLORS: Record<DriverStatus, string> = {
  Delivering: "#2a9d2a",
  Paused: "#e08c00",
  Idle: "#888",
  Completed: "#1a6bc4",
};

export const STATUS_ORDER: DriverStatus[] = [
  "Delivering",
  "Paused",
  "Idle",
  "Completed",
];

export const FILTERS: Array<DriverStatus | "All"> = ["All", ...STATUS_ORDER];
