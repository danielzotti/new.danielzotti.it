'use client';

import { useState } from 'react';
import packageJson from '../../../package.json';
import styles from './app-version.module.scss';

export const AppVersion = () => {
  const [isVersionVisible, setIsVersionVisible] = useState<boolean>(true);

  const handleVersionClick = () => {
    setIsVersionVisible(false);
  };

  return (
    <>
      {isVersionVisible && (
        <span className={styles.version} onClick={handleVersionClick}>
          v{packageJson.version}
        </span>
      )}
    </>
  );
};
