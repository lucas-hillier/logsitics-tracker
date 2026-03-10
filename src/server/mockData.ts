import type { Driver } from "../types";

export const initialDrivers: Driver[] = [
  {
    driverId: "1",
    name: "John Smith",
    latitude: 40.7128,
    longitude: -74.006,
    status: "Delivering",
    eta: "15 min",
    assignedDelivery: "DELIVERY_0001",
  },
  {
    driverId: "2",
    name: "Jane Doe",
    latitude: 34.0522,
    longitude: -118.2437,
    status: "Idle",
    eta: null,
    assignedDelivery: null,
  },
  {
    driverId: "3",
    name: "Bob Johnson",
    latitude: 41.8781,
    longitude: -87.6298,
    status: "Paused",
    eta: "30 min",
    assignedDelivery: "DELIVERY_0002",
  },
  {
    driverId: "4",
    name: "Alice Williams",
    latitude: 29.7604,
    longitude: -95.3698,
    status: "Delivering",
    eta: "10 min",
    assignedDelivery: "DELIVERY_0003",
  },
  {
    driverId: "5",
    name: "Michael Brown",
    latitude: 39.7392,
    longitude: -104.9903,
    status: "Completed",
    eta: null,
    assignedDelivery: null,
  },
];
