export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ background: "#fff", padding: "20px", minWidth: "300px" }}>
        <p>{message}</p>
        <button onClick={onConfirm} style={{ color: "red" }}>
          Confirm
        </button>
        <button onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
