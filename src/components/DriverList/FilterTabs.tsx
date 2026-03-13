import type { DriverStatus } from "../../types";
import { FILTERS } from "../../constants";

interface FilterTabsProps {
  active: DriverStatus | "All";
  onChange: (filter: DriverStatus | "All") => void;
}

const FilterTabs = ({ active, onChange }: FilterTabsProps) => (
  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
    {FILTERS.map((filter) => (
      <button
        key={filter}
        onClick={() => {
          onChange(filter);
        }}
        style={{
          padding: "4px 10px",
          borderRadius: 12,
          border: "1px solid #ccc",
          background: active === filter ? "#333" : "#fff",
          color: active === filter ? "#fff" : "#333",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        {filter}
      </button>
    ))}
  </div>
);

export default FilterTabs;
