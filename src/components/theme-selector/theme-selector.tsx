'use client';
import styles from './theme-selector.module.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../providers/theme-context-provider';

export const ThemeSelector = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button title={`Selected theme is ${theme}. Click to change it!`} onClick={() => toggleTheme()}
      className={styles.themeSelector}>
      {theme === 'dark' && <FontAwesomeIcon icon={faMoon} />}
      {theme === 'light' && <FontAwesomeIcon icon={faSun} />}
      {theme === 'os default' && <FontAwesomeIcon icon={faCircleHalfStroke} />}
      <span className={styles.theme}>{theme}</span>
    </button>
  );
};
