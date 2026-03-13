interface ListHeaderProps {
  sortLabel: string;
  isActive: boolean;
  onSort: () => void;
}

const ListHeader = ({ sortLabel, isActive, onSort }: ListHeaderProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    }}
  >
    <h2 style={{ margin: 0 }}>Drivers</h2>
    <button
      onClick={onSort}
      style={{
        padding: "3px 10px",
        borderRadius: 12,
        border: "1px solid #ccc",
        background: isActive ? "#333" : "#fff",
        color: isActive ? "#fff" : "#333",
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {sortLabel}
    </button>
  </div>
);

export default ListHeader;
