import { initialDrivers } from "../server/mockData";
import type { Driver } from "../types";
import DriverCard from "./DriverCard";

const DriverDashboard = () => {
  const drivers: Driver[] = [...initialDrivers];
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>Driver Display Panel</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {drivers.map((driver) => (
          <DriverCard key={driver.driverId} driver={driver} />
        ))}
      </div>
    </div>
  );
};
export default DriverDashboard;
