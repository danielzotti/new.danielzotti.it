'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { config } from 'src/config';

export type ThemeValueTypes = 'light' | 'dark' | 'os default' | 'nineties';

export interface ThemeContextModel {
  theme: ThemeValueTypes;
  toggleTheme: (value?: string) => void;
}

export const ThemeContext = createContext<ThemeContextModel>({
  theme: 'os default',
  toggleTheme: () => {
  }
});

interface ThemeContextProviderProps {
  children?: JSX.Element | Array<JSX.Element>;
}

export function ThemeContextProvider(
  props: ThemeContextProviderProps
) {
  const [theme, setTheme] = useState<ThemeValueTypes>('os default');
  useEffect(() => initialThemeHandler());

  const getThemeValue = useCallback(() => {
    return localStorage.getItem(config.themeLocalStorageName);
  }, []);

  const setThemeValue = useCallback((value: ThemeValueTypes) => {
    setTheme(value);
    localStorage.setItem(config.themeLocalStorageName, value);
  }, []);

  const initialThemeHandler = () => {
    const localStorageTheme = getThemeValue() as ThemeValueTypes;
    if (!localStorageTheme) {
      setNewTheme('os default');

    } else {
      setNewTheme(localStorageTheme);
    }
  };

  const setNewTheme = (newTheme: ThemeValueTypes) => {
    setThemeValue(newTheme);
    document!.querySelector('body')!.dataset.theme = theme;
  };

  const toggleThemeHandler = (value?: ThemeValueTypes) => {
    if (value) {
      setNewTheme(value);
      return;
    }
    const currentThemeIndex = config.themes.findIndex(t => t === theme);
    const newThemeIndex = currentThemeIndex + 1 >= config.themes.length ? 0 : currentThemeIndex + 1;
    setNewTheme(config.themes.at(newThemeIndex) as ThemeValueTypes);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
