import PropTypes from "prop-types";
import styles from "./ViewModeToggle.module.css";

const DetailedIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 5h16v3H4V5Zm0 5.5h16v3H4v-3ZM4 16h16v3H4v-3Z" />
  </svg>
);

const CompactIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" opacity="0.5" />
    <path d="M4 6h16v2H4V6Z" />
  </svg>
);

const ViewModeToggle = ({ mode, onChange }) => (
  <div className={styles.toggle} role="group" aria-label="Vista de movimientos">
    <button
      type="button"
      className={`${styles.btn} ${mode === "detailed" ? styles.btnActive : ""}`}
      onClick={() => onChange("detailed")}
      aria-pressed={mode === "detailed"}
      aria-label="Vista detallada"
      title="Vista detallada"
    >
      <DetailedIcon />
    </button>
    <button
      type="button"
      className={`${styles.btn} ${mode === "compact" ? styles.btnActive : ""}`}
      onClick={() => onChange("compact")}
      aria-pressed={mode === "compact"}
      aria-label="Vista compacta"
      title="Vista compacta"
    >
      <CompactIcon />
    </button>
  </div>
);

ViewModeToggle.propTypes = {
  mode: PropTypes.oneOf(["detailed", "compact"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewModeToggle;
