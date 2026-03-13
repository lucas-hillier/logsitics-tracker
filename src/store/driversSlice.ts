import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_DRIVERS } from "../server/mockData";
import type { Driver, DriverStatus } from "../types";

interface PendingAction {
  actionId: string;
  driverIds: string[];
  snapshot: Driver[];
}

interface DriversState {
  drivers: Driver[];
  selectedDriverId: string | null;
  filterStatus: DriverStatus | "All";
  pendingActions: PendingAction[];
  error: string | null;
}

const initialState: DriversState = {
  drivers: INITIAL_DRIVERS,
  selectedDriverId: null,
  filterStatus: "All",
  pendingActions: [],
  error: null,
};

const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    syncDrivers(state, action: PayloadAction<Driver[]>) {
      const pendingDriverIds = new Set(
        state.pendingActions.flatMap((p) => p.driverIds ?? []),
      );

      state.drivers = state.drivers.map((existing) => {
        const serverDriver = action.payload.find((d) => d.id === existing.id);
        if (!serverDriver) return existing;
        if (pendingDriverIds.has(existing.id)) return existing;
        return serverDriver;
      });
    },

    selectDriver(state, action: PayloadAction<string | null>) {
      state.selectedDriverId = action.payload;
    },

    setFilter(state, action: PayloadAction<DriverStatus | "All">) {
      state.filterStatus = action.payload;
    },

    applyOptimistic(
      state,
      action: PayloadAction<{
        actionId: string;
        driverIds: string[];
        updates: Array<Partial<Driver> & { id: string }>;
      }>,
    ) {
      const { actionId, driverIds, updates } = action.payload;
      const snapshot: Driver[] = current(state.drivers);

      state.pendingActions.push({ actionId, driverIds, snapshot });

      updates.forEach((update) => {
        state.drivers = state.drivers.map((d) =>
          d.id === update.id ? { ...d, ...update } : d,
        );
      });

      state.error = null;
    },

    confirmAction(state, action: PayloadAction<string>) {
      state.pendingActions = state.pendingActions.filter(
        (p) => p.actionId !== action.payload,
      );
    },

    rollbackAction(state, action: PayloadAction<string>) {
      const pending = state.pendingActions.find(
        (p) => p.actionId === action.payload,
      );
      if (pending) {
        state.drivers = pending.snapshot;
        state.pendingActions = state.pendingActions.filter(
          (p) => p.actionId !== action.payload,
        );
        state.error = "Action failed — changes were rolled back.";
      }
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  syncDrivers,
  selectDriver,
  setFilter,
  applyOptimistic,
  confirmAction,
  rollbackAction,
  setError,
  clearError,
} = driversSlice.actions;

export default driversSlice.reducer;
