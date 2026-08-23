import PropTypes from "prop-types";
import styles from "./PercentChangeBadge.module.css";

const PercentChangeBadge = ({ percentChange, invert = false }) => {
  if (percentChange === null || percentChange === undefined) {
    return <span className={styles.badge}>Nuevo</span>;
  }

  const rounded = Math.round(percentChange);
  const isIncrease = rounded > 0;
  const isDecrease = rounded < 0;
  const isGood = invert ? isIncrease : isDecrease;
  const isBad = invert ? isDecrease : isIncrease;

  const sign = isIncrease ? "+" : "";
  const className = [
    styles.badge,
    isGood ? styles.badgeGood : "",
    isBad ? styles.badgeBad : "",
  ].filter(Boolean).join(" ");

  return <span className={className}>{sign}{rounded}%</span>;
};

PercentChangeBadge.propTypes = {
  percentChange: PropTypes.number,
  invert: PropTypes.bool,
};

export default PercentChangeBadge;
