import { initialDrivers } from "../server/mockData";
import type { Driver } from "../types";
import DriverCard from "./DriverCard";
import Map from "./Map";

const DriverDashboard = () => {
  const drivers: Driver[] = [...initialDrivers];
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Driver Display Panel</h1>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
            maxWidth: "25%",
          }}
        >
          {drivers.map((driver) => (
            <DriverCard key={driver.driverId} driver={driver} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            margin: "1rem",
          }}
        >
          <Map />
        </div>
      </div>
    </div>
  );
};
export default DriverDashboard;
