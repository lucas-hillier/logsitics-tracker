import type { Driver } from "../../types";
import { driverCanBeAssignedToNewDelivery } from "../../utils";
import ActionButton from "./ActionButton";

interface DriverCardActionsProps {
  driver: Driver;
  onAction: (
    type: string,
    driverIds: string[],
    updates: Array<Partial<Driver> & { id: string }>,
  ) => void;
  onOpenModal: () => void;
}

export const DriverCardActions = ({
  driver,
  onAction,
  onOpenModal,
}: DriverCardActionsProps) => (
  <div
    style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}
    onClick={(e) => e.stopPropagation()}
  >
    {driver.status === "Delivering" && (
      <>
        <ActionButton
          label="Pause"
          onClick={() =>
            onAction(
              "PAUSE_DRIVER",
              [driver.id],
              [
                {
                  id: driver.id,
                  status: "Paused",
                  lat: driver.lat,
                  lng: driver.lng,
                },
              ],
            )
          }
        />
        <ActionButton
          label="Complete"
          onClick={() =>
            onAction(
              "COMPLETE_DELIVERY",
              [driver.id],
              [
                {
                  id: driver.id,
                  status: "Completed",
                  eta: "Arrived",
                  progress: 1,
                },
              ],
            )
          }
        />
        <ActionButton label="Reassign" onClick={onOpenModal} />
      </>
    )}

    {driver.status === "Paused" && (
      <>
        <ActionButton
          label="Resume"
          onClick={() =>
            onAction(
              "RESUME_DRIVER",
              [driver.id],
              [
                {
                  id: driver.id,
                  status: "Delivering",
                  lat: driver.lat,
                  lng: driver.lng,
                },
              ],
            )
          }
        />
        <ActionButton label="Reassign" onClick={onOpenModal} />
      </>
    )}

    {driverCanBeAssignedToNewDelivery(driver.status) && (
      <ActionButton label="Assign Delivery" onClick={onOpenModal} />
    )}
  </div>
);
