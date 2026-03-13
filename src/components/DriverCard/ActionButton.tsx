interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton = ({ label, onClick }: ActionButtonProps) => (
  <button
    onClick={onClick}
    style={{
      fontSize: 11,
      padding: "3px 8px",
      borderRadius: 4,
      border: "1px solid #ccc",
      background: "#f5f5f5",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

export default ActionButton;
