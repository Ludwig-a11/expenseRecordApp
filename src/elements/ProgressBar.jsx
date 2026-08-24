import PropTypes from "prop-types";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percent, danger = false }) => (
  <div className={styles.track}>
    <div
      className={`${styles.fill} ${danger ? styles.fillDanger : ""}`}
      style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  danger: PropTypes.bool,
};

export default ProgressBar;
