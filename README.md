# Driver Delivery Dashboard

A real-time driver delivery management dashboard MVP built with **React**, **Redux Toolkit**, and **WebSockets**. Dispatchers can monitor, assign, reassign, pause, resume, and complete driver deliveries on an interactive live map.

---

## Setup & Running

```bash
# Install dependencies
npm install

# Start the Vite frontend
npm run dev

# Start the WebSocket server (in a separate terminal)
npx tsx server/server.ts
```

---

## Architectural Decisions

- **Redux** for global state (drivers, selection, filter, pending actions). Centralising state makes optimistic updates and rollbacks straightforward to reason about.

- **WebSocket** connects once on app mount via `useWebSocket`. The server batches all drivers into a single message per tick to minimise message overhead.

- **Optimistic UI** — a state snapshot is saved before each action is applied locally. If the server responds with `ACTION_ERROR`, the snapshot is restored and an error is surfaced to the user.

- **Leaflet + OpenStreetMap** — free, no API key required, and straightforward to integrate with React.

- **Single-page layout** — `DriverList` on the left, `MapView` on the right. Selecting a driver in either panel updates `selectedDriverId` in Redux, which both components read from.

---

## Trade-offs & Known Limitations

| Area                     | Detail                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Driver movement**      | Position is linearly interpolated between two points, not routed along actual roads.                                                       |
| **No persistence**       | Restarting the server resets all drivers to their initial positions.                                                                       |
| **Mocked data**          | All driver data, locations, and delivery states are statically mocked — there is no real data source.                                      |
| **No backend**           | There is no real backend. The server and WebSocket are mocked, meaning no business logic, authentication, or database connectivity exists. |
| **Marker overlap**       | Drivers at the same coordinates stack on the map, obscuring one another.                                                                   |
| **No responsive design** | The layout is built for desktop/laptop viewports only.                                                                                     |
| **Hard-coded locations** | All origin and destination points are within NL, Canada, with no way to extend them dynamically.                                           |
| **Static driver roster** | Drivers are fixed at five. There is no way to add, remove, or manage drivers at runtime.                                                   |
| **Inaccurate ETAs**      | ETAs are not calculated from actual distances or road paths between points and should not be treated as reliable estimates.                |
