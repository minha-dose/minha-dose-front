import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

const lightTheme = {
  background: '#F8F9FB',
  primary: '#4FC3F7',
  navBar: '#0D47A1',
  card: '#1565C0',
  text: '#222',
  icon: '#fff',
};

const darkTheme = {
  background: '#181A20',
  primary: '#4FC3F7',
  navBar: '#0D47A1',
  card: '#263859',
  text: '#fff',
  icon: '#fff',
};

type ThemeType = typeof lightTheme;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export type Theme = ThemeType;
export { lightTheme, darkTheme };