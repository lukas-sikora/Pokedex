import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Gradienty dla jasnego i ciemnego motywu
  const gradients = {
    light: 'linear-gradient(135deg, #a8dadc, #f1faee, #457b9d)',
    dark: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
  };

  // Pobierz zapisany motyw z localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Zapisz wybrany motyw w localStorage i ustaw klasę w HTML
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Przełączanie motywu
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, gradients }}>
      {children}
    </ThemeContext.Provider>
  );
};
