import PropTypes from "prop-types";
import styles from "./QuickReplyChip.module.css";

const QuickReplyChip = ({ label, onClick }) => (
  <button type="button" className={styles.chip} onClick={onClick}>
    {label}
  </button>
);

QuickReplyChip.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default QuickReplyChip;
