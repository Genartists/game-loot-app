import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const isDark = useSelector((state) => state.theme.isDark);

  const theme = {
    isDark,
    colors: {
      // Background colors
      background: isDark ? "#1a1a1a" : "#ffffff",
      surface: isDark ? "#2a2a2a" : "#f8f9fa",
      card: isDark ? "#3a3a3a" : "#ffffff",

      // Text colors
      text: isDark ? "#ffffff" : "#000000",
      textSecondary: isDark ? "#cccccc" : "#666666",
      textTertiary: isDark ? "#999999" : "#999999",

      // Accent colors
      primary: "#007AFF",
      secondary: "#00ff88",
      warning: "#ff9500",
      error: "#ff3b30",

      // Border colors
      border: isDark ? "#3a3a3a" : "#e1e5e9",
      borderLight: isDark ? "#4a4a4a" : "#f0f0f0",

      // Status bar
      statusBar: isDark ? "#1a1a1a" : "#ffffff",
      statusBarContent: isDark ? "light-content" : "dark-content",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
