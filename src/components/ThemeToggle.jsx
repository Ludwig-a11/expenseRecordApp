import PropTypes from "prop-types";
import { useTheme, DARK_THEME } from "../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 16a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm9.75-6a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75Zm-16 0a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75Zm12.19-7.94a.75.75 0 0 1 1.06 1.06l-1.41 1.41a.75.75 0 0 1-1.06-1.06l1.41-1.41ZM6.47 15.78a.75.75 0 0 1 1.06 1.06l-1.41 1.41a.75.75 0 0 1-1.06-1.06l1.41-1.41Zm11.47 2.47a.75.75 0 0 1-1.06 0l-1.41-1.41a.75.75 0 0 1 1.06-1.06l1.41 1.41a.75.75 0 0 1 0 1.06ZM7.53 7.53a.75.75 0 0 1-1.06 0L5.06 6.12A.75.75 0 0 1 6.12 5.06l1.41 1.41a.75.75 0 0 1 0 1.06Z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.4 14.15a.75.75 0 0 0-.92-.4 7.26 7.26 0 0 1-9.23-9.23.75.75 0 0 0-.4-.92.75.75 0 0 0-.97.2A9 9 0 1 0 20.2 15.12a.75.75 0 0 0 .2-.97Z" />
  </svg>
);

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === DARK_THEME;
  const classes = [styles.toggle, className].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      <span className={styles.iconWrap}>{isDark ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default ThemeToggle;
