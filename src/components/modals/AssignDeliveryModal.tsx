import { useState } from "react";
import { LOCATIONS } from "../../server/mockData";
import ModalFooter from "./ModalFooter";

interface AssignDeliveryModal {
  driverLat: number;
  driverLng: number;
  onConfirm: (destinationKey: string) => void;
  onCancel: () => void;
}

const AssignDeliveryModal = ({
  driverLat,
  driverLng,
  onConfirm,
  onCancel,
}: AssignDeliveryModal) => {
  const availableLocations = Object.keys(LOCATIONS).filter(
    (key) =>
      LOCATIONS[key].lat !== driverLat || LOCATIONS[key].lng !== driverLng,
  );
  const [destinationKey, setDestinationKey] = useState(availableLocations[0]);

  return (
    <>
      <label style={{ fontSize: 12, fontWeight: 600, display: "block" }}>
        Destination
        <select
          value={destinationKey}
          onChange={(e) => setDestinationKey(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 13,
            marginTop: 4,
            marginBottom: 12,
          }}
        >
          {availableLocations.map((key) => (
            <option key={key} value={key}>
              {LOCATIONS[key].name}
            </option>
          ))}
        </select>
      </label>
      <ModalFooter
        onConfirm={() => onConfirm(destinationKey)}
        onCancel={onCancel}
      />
    </>
  );
};

export default AssignDeliveryModal;
