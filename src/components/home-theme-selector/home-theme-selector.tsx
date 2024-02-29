'use client';

import styles from './home-theme-selector.module.scss';
import { useContext } from 'react';
import { ThemeContext } from 'src/providers/theme-context-provider';
import yoda from 'public/static/images/icons/yoda.svg';
import darthVader from 'public/static/images/icons/darth-vader.svg';
import Image from 'next/image';

export const HomeThemeSelector = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={`dz-home-theme-selector ${styles.buttonsContainer}`}>
        <button className={styles.button} onClick={() => toggleTheme('dark')}>
          <Image src={darthVader} alt='Icon of Darth Vader representing the dark theme' />
        </button>
        <button className={styles.button} onClick={() => toggleTheme('light')}>
          <Image src={yoda} alt='Icon of Yoda representing the light theme' />
        </button>
      </div>
      <p>...or let the OS <button  className={styles.osDefault}
        onClick={() => toggleTheme('os default')}>decide</button> for you!
      </p>
    </>
  );
};
