import type { Driver } from "../types";

export const initialDrivers: Driver[] = [
  {
    driverId: "1",
    name: "John Smith",
    latitude: 47.5615,
    longitude: -52.7126,
    status: "Delivering",
    eta: "15 min",
    assignedDelivery: "DELIVERY_0001",
  },
  {
    driverId: "2",
    name: "Jane Doe",
    latitude: 48.95,
    longitude: -57.95,
    status: "Idle",
    eta: null,
    assignedDelivery: null,
  },
  {
    driverId: "3",
    name: "Bob Johnson",
    latitude: 48.95,
    longitude: -54.62,
    status: "Paused",
    eta: "30 min",
    assignedDelivery: "DELIVERY_0002",
  },
  {
    driverId: "4",
    name: "Alice Williams",
    latitude: 48.74,
    longitude: -55.19,
    status: "Delivering",
    eta: "10 min",
    assignedDelivery: "DELIVERY_0003",
  },
  {
    driverId: "5",
    name: "Michael Brown",
    latitude: 50.92,
    longitude: -56.49,
    status: "Completed",
    eta: null,
    assignedDelivery: null,
  },
];
