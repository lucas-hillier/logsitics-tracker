import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { applyOptimistic, clearError, setError } from "../store/driversSlice";
import { sendAction } from "./useWebSocket";
import { makeId } from "../utils";
import type { Driver } from "../types";

export const useDriverAction = (driverId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    type: string,
    driverIds: string[],
    updates: Array<Partial<Driver> & { id: string }>,
    rest?: Record<string, unknown>,
  ) => {
    const actionId = makeId();
    const sent = sendAction({ type, actionId, driverId, ...rest });

    if (!sent) {
      dispatch(setError("Connection lost. Please reconnect and try again."));
      return;
    }

    dispatch(clearError());
    dispatch(applyOptimistic({ actionId, driverIds, updates }));
  };
};
