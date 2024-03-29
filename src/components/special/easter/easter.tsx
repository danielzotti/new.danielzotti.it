'use client';

import styles from './easter.module.scss';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const easterDates = [
  '2024-03-31',
  '2025-04-20',
  '2026-04-05',
  '2027-03-28',
  '2028-04-16',
  '2029-04-01',
  '2030-04-21'
];

const isEaster = (): boolean => {
  const todayDate = DateTime.now().toFormat('yyyy-MM-dd');
  return easterDates.includes(todayDate);
};

export const Easter = () => {

  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleEaster = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    if (!isEaster()) {
      return;
    }

    setIsActive(true);

  }, []);

  if (!isEaster() && !isActive) {
    return null;
  }

  return <>
    {isActive && <div className={styles.wrapper}>
      <div className={styles.egg} onClick={toggleEaster}>
        <div className={styles.text}>Happy Easter!</div>
      </div>
      <div className={styles.shadow}></div>
    </div>}
  </>;
};
