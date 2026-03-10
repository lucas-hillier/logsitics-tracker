export interface Driver {
  driverId: string;
  name: string;
  latitude: number;
  longitude: number;
  status: DeliveryStatus;
  eta: string | null;
  assignedDelivery: string | null;
}

export type DeliveryStatus = "Delivering" | "Paused" | "Idle" | "Completed";
