import PropTypes from "prop-types";
import styles from "./SegmentedToggle.module.css";

const SegmentedToggle = ({ value, onChange, options, groupLabel }) => (
  <div className={styles.toggle} role="group" aria-label={groupLabel}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={`${styles.btn} ${value === option.value ? styles.btnActive : ""}`}
        onClick={() => onChange(option.value)}
        aria-pressed={value === option.value}
        aria-label={option.label}
        title={option.label}
      >
        {option.icon}
      </button>
    ))}
  </div>
);

SegmentedToggle.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  groupLabel: PropTypes.string,
};

export default SegmentedToggle;
