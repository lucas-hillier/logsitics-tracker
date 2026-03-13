import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { setFilter, selectDriver } from "../../store/driversSlice";
import { useDriverSort } from "../../hooks/useDriverSort";
import DriverCard from "../DriverCard/DriverCard";
import ErrorBanner from "./ErrorBanner";
import FilterTabs from "./FilterTabs";
import ListHeader from "./ListHeader";

const DriverList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { drivers, filterStatus, selectedDriverId, error } = useSelector(
    (state: RootState) => state.drivers,
  );

  const { sortDirection, toggle, sortLabel, sort } = useDriverSort();

  const filtered =
    filterStatus === "All"
      ? drivers
      : drivers.filter((d) => d.status === filterStatus);

  const driversToDisplay = sort(filtered);

  return (
    <div style={{ padding: 12 }}>
      <ListHeader
        sortLabel={sortLabel}
        isActive={sortDirection !== "none"}
        onSort={toggle}
      />

      {error && <ErrorBanner message={error} />}

      <FilterTabs
        active={filterStatus}
        onChange={(f) => dispatch(setFilter(f))}
      />

      {driversToDisplay.map((driver) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          isSelected={driver.id === selectedDriverId}
          onSelect={() =>
            dispatch(
              selectDriver(driver.id === selectedDriverId ? null : driver.id),
            )
          }
        />
      ))}
    </div>
  );
};

export default DriverList;
