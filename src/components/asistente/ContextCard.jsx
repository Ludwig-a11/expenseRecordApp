import PropTypes from "prop-types";
import PercentChangeBadge from "./../../elements/PercentChangeBadge";
import ProgressBar from "./../../elements/ProgressBar";
import { getCategoryLabel } from "./../../functions/categoryLabels";
import convertToCurrency from "./../../functions/convertToCurrency";
import { SUGGESTIONS } from "./mockConversation";
import styles from "./ContextCard.module.css";

const ContextCard = ({ remaining, percentUsed, topCategories, onSuggestionClick }) => (
  <div className={styles.column}>
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Disponible</h2>
      <p className={styles.available}>{convertToCurrency(remaining)}</p>
      <ProgressBar percent={percentUsed} />
      <p className={styles.usageHint}>{Math.round(percentUsed)}% usado</p>
    </div>

    {topCategories.length > 0 && (
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Top categorías</h2>
        <div className={styles.categoryList}>
          {topCategories.map((item) => (
            <div key={item.category} className={styles.categoryRow}>
              <span>{getCategoryLabel(item.category)}</span>
              <PercentChangeBadge percentChange={item.percentChange} />
            </div>
          ))}
        </div>
      </div>
    )}

    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Sugerencias</h2>
      <div className={styles.suggestions}>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={styles.suggestionBtn}
            onClick={() => onSuggestionClick(suggestion)}
          >
            &quot;{suggestion}&quot;
          </button>
        ))}
      </div>
    </div>
  </div>
);

ContextCard.propTypes = {
  remaining: PropTypes.number.isRequired,
  percentUsed: PropTypes.number.isRequired,
  topCategories: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string.isRequired, percentChange: PropTypes.number })
  ).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
};

export default ContextCard;
