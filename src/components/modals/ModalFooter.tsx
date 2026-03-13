interface ModalFooterProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
}

const ModalFooter = ({
  onConfirm,
  onCancel,
  confirmDisabled = false,
}: ModalFooterProps) => (
  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
    <button
      onClick={onConfirm}
      disabled={confirmDisabled}
      style={{
        flex: 1,
        padding: "6px 0",
        borderRadius: 4,
        border: "none",
        background: confirmDisabled ? "#ccc" : "#1a6bc4",
        color: "#fff",
        fontSize: 13,
        cursor: confirmDisabled ? "not-allowed" : "pointer",
      }}
    >
      Confirm
    </button>
    <button
      onClick={onCancel}
      style={{
        flex: 1,
        padding: "6px 0",
        borderRadius: 4,
        border: "1px solid #ccc",
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      Cancel
    </button>
  </div>
);

export default ModalFooter;
