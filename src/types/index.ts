export type DriverStatus = "Delivering" | "Paused" | "Idle" | "Completed";

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  lat: number;
  lng: number;
  progress: number; // 0.0 → 1.0
  eta: string;
  origin: Location;
  destination: Location;
}

export interface WSMessage {
  drivers: Driver[];
}

export interface ConfirmPayload {
  type: "assign" | "reassign";
  toDriverId?: string;
  destinationKey?: string;
}
