import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const THEME_STORAGE_KEY = "expense-app-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const ThemeContext = createContext({
  theme: DARK_THEME,
  toggleTheme: () => {},
  setTheme: () => {},
});

const isValidTheme = (value) => value === DARK_THEME || value === LIGHT_THEME;

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return DARK_THEME;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isValidTheme(savedTheme) ? savedTheme : DARK_THEME;
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${theme}`);
    body.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === DARK_THEME ? LIGHT_THEME : DARK_THEME)),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme, DARK_THEME, LIGHT_THEME };
