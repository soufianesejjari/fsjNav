import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Chargement de l'état du mode sombre depuis le stockage local au démarrage
    const loadDarkModeFromStorage = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(storedDarkMode === 'true');
        }
      } catch (error) {
        console.error('Erreur lors du chargement du mode sombre depuis le stockage local', error);
      }
    };

    loadDarkModeFromStorage();
  }, []);

  useEffect(() => {
    // Sauvegarde de l'état du mode sombre dans le stockage local à chaque changement
    const saveDarkModeToStorage = async () => {
      try {
        await AsyncStorage.setItem('darkMode', isDarkMode.toString());
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du mode sombre dans le stockage local', error);
      }
    };

    saveDarkModeToStorage();
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
