import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./InsightCard.module.css";

const InsightCard = ({ text, linkTo = "/asistente", linkLabel = "Preguntar al asistente" }) => (
  <div className={styles.card}>
    <div className={styles.headRow}>
      <span className={styles.icon} aria-hidden="true">✦</span>
      <span className={styles.title}>Análisis de hoy</span>
    </div>

    <p className={styles.text}>{text}</p>

    <Link to={linkTo} className={styles.link}>{linkLabel} →</Link>
  </div>
);

InsightCard.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  linkLabel: PropTypes.string,
};

export default InsightCard;
