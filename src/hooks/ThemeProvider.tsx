
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system'
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || defaultTheme
  );
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Update HTML data-theme attribute when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Save theme to localStorage
    localStorage.setItem('theme', theme);

    // Remove any existing theme class
    root.classList.remove('light', 'dark');
    
    // Apply theme class
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
    } else {
      root.classList.add(theme);
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);
  
  // Watch for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
