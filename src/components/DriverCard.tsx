import type { Driver } from "../types";

const DriverCard = ({ driver }: { driver: Driver }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "0px 10px",
        cursor: "pointer",
        userSelect: "none",
        margin: "0.5rem",
      }}
      onClick={() => {}}
    >
      <h3
        style={{
          fontSize: "1.5em",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {driver.name}
      </h3>
      <p>
        <strong>Location:</strong> {driver.latitude.toFixed(4)},{" "}
        {driver.longitude.toFixed(4)}
      </p>
      <p>
        <strong>Delivery Status:</strong> {driver.status}
      </p>
      <p>
        <strong>ETA:</strong> {driver.eta ? driver.eta : "N/A"}
      </p>
      <p>
        <strong>Assigned Delivery:</strong>{" "}
        {driver.assignedDelivery ? driver.assignedDelivery : "N/A"}
      </p>
    </div>
  );
};
export default DriverCard;
