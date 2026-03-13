import BaseModal from "./BaseModal";
import AssignDeliveryModal from "./AssignDeliveryModal";
import ReassignDeliveryModal from "./ReassignDeliveryModal";
import type { Driver, ConfirmPayload } from "../../types";
import { driverCanBeAssignedToNewDelivery } from "../../utils";

interface DeliveryModalProps {
  driver: Driver;
  drivers: Driver[];
  onConfirm: (payload: ConfirmPayload) => void;
  onCancel: () => void;
}

const DeliveryModal = ({
  driver,
  drivers,
  onConfirm,
  onCancel,
}: DeliveryModalProps) => {
  const assignMode = driverCanBeAssignedToNewDelivery(driver.status);

  const availableDrivers = drivers.filter(
    (d) => d.id !== driver.id && driverCanBeAssignedToNewDelivery(d.status),
  );

  return (
    <BaseModal onClose={onCancel}>
      <h3 style={{ margin: "0 0 8px" }}>
        {assignMode ? "Assign Delivery" : "Reassign Delivery"}
      </h3>
      <p style={{ fontSize: 13, color: "#555", margin: "0 0 16px" }}>
        {assignMode ? (
          <>
            <strong>{driver.name}</strong> will depart from their current
            location.
          </>
        ) : (
          <>
            Select an <strong>available</strong> driver to take over from{" "}
            <strong>{driver.name}</strong>.
          </>
        )}
      </p>

      {assignMode ? (
        <AssignDeliveryModal
          driverLat={driver.lat}
          driverLng={driver.lng}
          onConfirm={(destinationKey) => {
            onConfirm({ type: "assign", destinationKey });
          }}
          onCancel={onCancel}
        />
      ) : (
        <ReassignDeliveryModal
          drivers={availableDrivers}
          onConfirm={(toDriverId) => {
            onConfirm({ type: "reassign", toDriverId });
          }}
          onCancel={onCancel}
        />
      )}
    </BaseModal>
  );
};

export default DeliveryModal;
