export default function Toast({ message, type }) {
  if (!message) return null;

  const colors = {
    success: "green",
    error: "red",
    info: "blue",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: colors[type] || "black",
        color: "white",
        padding: "10px",
      }}
    >
      {message}
    </div>
  );
}
