import PropTypes from "prop-types";

const ConfigErrorScreen = ({ missingFirebaseEnv }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
      background: "#f6f7fb",
      color: "#1f2937",
    }}
  >
    <div style={{ maxWidth: "760px", width: "100%", background: "#fff", padding: "1.5rem", borderRadius: "12px" }}>
      <h1 style={{ marginTop: 0 }}>Firebase configuration missing</h1>
      <p style={{ marginBottom: "0.75rem" }}>
        Create a <code>.env</code> file in the project root and add these keys:
      </p>
      <pre
        style={{
          background: "#111827",
          color: "#f9fafb",
          borderRadius: "8px",
          padding: "1rem",
          overflowX: "auto",
        }}
      >
        {missingFirebaseEnv.map((key) => `${key}=...`).join("\n")}
      </pre>
      <p style={{ marginBottom: 0 }}>
        Then restart <code>npm run dev</code>.
      </p>
    </div>
  </div>
);

ConfigErrorScreen.propTypes = {
  missingFirebaseEnv: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ConfigErrorScreen;
