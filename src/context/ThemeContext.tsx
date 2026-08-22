import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark_masculine' | 'rose_feminine';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  isRose: boolean;
  hasMustache: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('nexflow_theme');
      if (saved === 'dark_masculine' || saved === 'rose_feminine') {
        return saved;
      }
    } catch (e) {}
    return 'dark_masculine';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('nexflow_theme', newTheme);
    } catch (e) {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark_masculine' ? 'rose_feminine' : 'dark_masculine');
  };

  const isDark = theme === 'dark_masculine';
  const isRose = theme === 'rose_feminine';
  const hasMustache = isDark;

  useEffect(() => {
    if (isRose) {
      document.body.style.backgroundColor = '#FFF6FB';
      document.body.style.color = '#4A4358';
    } else {
      document.body.style.backgroundColor = '#0B0D1A';
      document.body.style.color = '#F4F5FA';
    }
  }, [isRose]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        isRose,
        hasMustache,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
