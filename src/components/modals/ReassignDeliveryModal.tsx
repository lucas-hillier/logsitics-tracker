import { useState } from "react";
import type { Driver } from "../../types";
import ModalFooter from "./ModalFooter";

interface ReassignDeliveryModalProps {
  drivers: Driver[];
  onConfirm: (toDriverId: string) => void;
  onCancel: () => void;
}

const ReassignDeliveryModal = ({
  drivers,
  onConfirm,
  onCancel,
}: ReassignDeliveryModalProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      {drivers.length === 0 ? (
        <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
          No drivers available.
        </p>
      ) : (
        drivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => setSelectedId(driver.id)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              marginBottom: 8,
              cursor: "pointer",
              fontSize: 13,
              border:
                selectedId === driver.id
                  ? "2px solid #1a6bc4"
                  : "1px solid #ddd",
              background: selectedId === driver.id ? "#f0f6ff" : "#fafafa",
            }}
          >
            <strong>{driver.name}</strong>
            <span style={{ color: "#888", marginLeft: 8, fontSize: 11 }}>
              {driver.status.toUpperCase()}
            </span>
          </div>
        ))
      )}
      <ModalFooter
        onConfirm={() => selectedId && onConfirm(selectedId)}
        onCancel={onCancel}
        confirmDisabled={!selectedId}
      />
    </>
  );
};

export default ReassignDeliveryModal;
