import { useState } from "react";
import PropTypes from "prop-types";
import { CATEGORY_LABELS_ES, getCategoryLabel } from "./../functions/categoryLabels";
import { getCategoryIcon, PRIMARY_CATEGORY_IDS } from "./../functions/categoryIcons";
import styles from "./SelectCategories.module.css";

const ALL_CATEGORY_IDS = Object.keys(CATEGORY_LABELS_ES);
const OVERFLOW_CATEGORY_IDS = ALL_CATEGORY_IDS.filter((id) => !PRIMARY_CATEGORY_IDS.includes(id));

const SelectCategories = ({ category, setCategory }) => {
  const [showOverflow, setShowOverflow] = useState(false);
  const selectedIsOverflow = OVERFLOW_CATEGORY_IDS.includes(category);

  const handleSelect = (id) => {
    setCategory(id);
    setShowOverflow(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chipRow}>
        {PRIMARY_CATEGORY_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`${styles.chip} ${category === id ? styles.chipActive : ""}`}
            onClick={() => handleSelect(id)}
            aria-pressed={category === id}
          >
            <span className={styles.chipIcon} aria-hidden="true">{getCategoryIcon(id)}</span>
            {getCategoryLabel(id)}
          </button>
        ))}

        <button
          type="button"
          className={`${styles.chip} ${selectedIsOverflow ? styles.chipActive : ""}`}
          onClick={() => setShowOverflow((current) => !current)}
          aria-expanded={showOverflow}
        >
          {selectedIsOverflow ? (
            <>
              <span className={styles.chipIcon} aria-hidden="true">{getCategoryIcon(category)}</span>
              {getCategoryLabel(category)}
            </>
          ) : (
            <>
              <span className={styles.chipIcon} aria-hidden="true">···</span>
              Más
            </>
          )}
        </button>
      </div>

      {showOverflow && (
        <div className={styles.overflowRow}>
          {OVERFLOW_CATEGORY_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`${styles.chip} ${category === id ? styles.chipActive : ""}`}
              onClick={() => handleSelect(id)}
              aria-pressed={category === id}
            >
              <span className={styles.chipIcon} aria-hidden="true">{getCategoryIcon(id)}</span>
              {getCategoryLabel(id)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SelectCategories.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default SelectCategories;
