import PropTypes from "prop-types";
import { CATEGORY_LABELS_ES, getCategoryLabel } from "./../../functions/categoryLabels";
import styles from "./CategoryFilterPills.module.css";

const CATEGORY_IDS = Object.keys(CATEGORY_LABELS_ES);

const CategoryFilterPills = ({ selected, onChange }) => (
  <div className={styles.row}>
    <button
      type="button"
      className={`${styles.pill} ${!selected ? styles.pillActive : ""}`}
      onClick={() => onChange(null)}
      aria-pressed={!selected}
    >
      Todo
    </button>

    {CATEGORY_IDS.map((id) => (
      <button
        key={id}
        type="button"
        className={`${styles.pill} ${selected === id ? styles.pillActive : ""}`}
        onClick={() => onChange(id)}
        aria-pressed={selected === id}
      >
        {getCategoryLabel(id)}
      </button>
    ))}
  </div>
);

CategoryFilterPills.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CategoryFilterPills;
