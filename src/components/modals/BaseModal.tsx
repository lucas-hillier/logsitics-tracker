interface BaseModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ onClose, children }: BaseModalProps) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    }}
    onClick={onClose}
  >
    <div
      style={{ background: "#fff", borderRadius: 8, padding: 24, width: 300 }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  </div>
);

export default BaseModal;
