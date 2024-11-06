import React from "react";
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <i className="fas fa-moon"></i>
          <span> Dark Mode</span>
        </>
      ) : (
        <>
          <i className="fas fa-sun"></i>
          <span> Light Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;