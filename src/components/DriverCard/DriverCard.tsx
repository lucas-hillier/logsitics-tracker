import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDriverAction } from "../../hooks/useDriverAction";
import { handleModalConfirm } from "./DriverCard.helpers";
import DeliveryModal from "../modals/DeliveryModal";
import { DriverCardActions } from "./DriverCardActions";
import { STATUS_COLORS } from "../../constants";
import type { Driver } from "../../types";

interface DriverCardProps {
  driver: Driver;
  isSelected: boolean;
  onSelect: () => void;
}

const isActive = (status: Driver["status"]) =>
  status !== "Idle" && status !== "Completed";

const DriverCard = ({ driver, isSelected, onSelect }: DriverCardProps) => {
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const dispatchAction = useDriverAction(driver.id);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={onSelect}
        style={{
          border: isSelected ? "2px solid #1a6bc4" : "1px solid #ddd",
          borderRadius: 8,
          padding: 10,
          marginBottom: 8,
          cursor: "pointer",
          background: isSelected ? "#f0f6ff" : "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>{driver.name}</strong>
          <span
            style={{
              fontSize: 11,
              color: STATUS_COLORS[driver.status] ?? "#888",
              fontWeight: 600,
            }}
          >
            {driver.status.toUpperCase()}
          </span>
        </div>

        <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          {isActive(driver.status)
            ? `${driver.origin.name} → ${driver.destination.name}`
            : "No active delivery"}
        </div>
        <div style={{ fontSize: 12, color: "#777" }}>
          {isActive(driver.status) && `ETA: ${driver.eta} | `}
          {driver.lat.toFixed(4)}, {driver.lng.toFixed(4)}
        </div>

        <DriverCardActions
          driver={driver}
          onAction={dispatchAction}
          onOpenModal={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <DeliveryModal
          driver={driver}
          drivers={drivers}
          onConfirm={(payload) => {
            handleModalConfirm(payload, driver, drivers, dispatchAction);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DriverCard;
