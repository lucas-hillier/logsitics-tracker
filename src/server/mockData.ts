import type { Location, Driver } from "../types";

// All deliverable locations in Newfoundland
export const LOCATIONS: Record<string, Location> = {
  stjohns: { name: "St. John's", lat: 47.5615, lng: -52.7126 },
  clarenville: { name: "Clarenville", lat: 48.1667, lng: -53.9667 },
  gander: { name: "Gander", lat: 48.9569, lng: -54.6089 },
  grandfalls: { name: "Grand Falls-Windsor", lat: 48.9333, lng: -55.6667 },
  stephenville: { name: "Stephenville", lat: 48.55, lng: -58.5833 },
  portauxbasques: { name: "Port aux Basques", lat: 47.5769, lng: -59.1369 },
};

// 5 drivers with staggered starting progress so they aren't all at the same point
export const INITIAL_DRIVERS: Driver[] = [
  {
    id: "D1",
    name: "Mike Parsons",
    status: "Delivering",
    progress: 0.0,
    lat: LOCATIONS.stjohns.lat,
    lng: LOCATIONS.stjohns.lng,
    eta: "120 min",
    origin: LOCATIONS.stjohns,
    destination: LOCATIONS.portauxbasques,
  },
  {
    id: "D2",
    name: "Sara Furey",
    status: "Delivering",
    progress: 0.2,
    lat: LOCATIONS.clarenville.lat,
    lng: LOCATIONS.clarenville.lng,
    eta: "96 min",
    origin: LOCATIONS.clarenville,
    destination: LOCATIONS.grandfalls,
  },
  {
    id: "D3",
    name: "John Okeefe",
    status: "Delivering",
    progress: 0.4,
    lat: LOCATIONS.gander.lat,
    lng: LOCATIONS.gander.lng,
    eta: "72 min",
    origin: LOCATIONS.gander,
    destination: LOCATIONS.stephenville,
  },
  {
    id: "D4",
    name: "Amy Squires",
    status: "Paused",
    progress: 0.1,
    lat: LOCATIONS.grandfalls.lat,
    lng: LOCATIONS.grandfalls.lng,
    eta: "108 min",
    origin: LOCATIONS.grandfalls,
    destination: LOCATIONS.stjohns,
  },
  {
    id: "D5",
    name: "Tom Bartlett",
    status: "Idle",
    progress: 0.0,
    lat: LOCATIONS.stephenville.lat,
    lng: LOCATIONS.stephenville.lng,
    eta: "N/A",
    origin: LOCATIONS.stephenville,
    destination: LOCATIONS.stephenville,
  },
];
