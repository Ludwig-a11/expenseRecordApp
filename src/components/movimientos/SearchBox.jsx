import PropTypes from "prop-types";
import styles from "./SearchBox.module.css";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M10 4a6 6 0 1 0 3.75 10.65l4.3 4.3 1.4-1.4-4.3-4.3A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
  </svg>
);

const SearchBox = ({ value, onChange }) => (
  <div className={styles.wrapper}>
    <span className={styles.icon} aria-hidden="true"><SearchIcon /></span>
    <input
      type="search"
      className={styles.input}
      placeholder="Buscar gasto..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Buscar gasto"
    />
  </div>
);

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
