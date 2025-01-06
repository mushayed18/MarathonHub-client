import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeInfo = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
