"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get saved theme or default to system
    const savedTheme = localStorage.getItem("memorial-theme") as Theme;
    const initialTheme = savedTheme || "system";
    setThemeState(initialTheme);

    // Resolve the actual theme
    const resolveTheme = (themeToResolve: Theme): ResolvedTheme => {
      if (themeToResolve === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return themeToResolve;
    };

    const resolved = resolveTheme(initialTheme);
    setResolvedTheme(resolved);

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", resolved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const newResolved = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(newResolved);
        document.documentElement.setAttribute("data-theme", newResolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (!mounted) return; // Prevent setting theme before mount

    setThemeState(newTheme);
    localStorage.setItem("memorial-theme", newTheme);

    const resolved =
      newTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : newTheme;

    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  };

  const toggleTheme = () => {
    if (!mounted) return; // Prevent toggling before mount

    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Always provide the context, but include mounted state
  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, toggleTheme, mounted }}
    >
      <div suppressHydrationWarning={!mounted}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
