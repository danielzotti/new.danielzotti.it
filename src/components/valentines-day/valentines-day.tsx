'use client';

import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import styles from './valentines-day.module.scss';
import danielValentinesDay from '../../../public/static/valentines-day/valentines-day.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const isValentinesDay = (): boolean => {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const valentinesMonth = 2;
  const valentinesDay = 14;

  return month === valentinesMonth && day === valentinesDay;
};

export const ValentinesDay = () => {

  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleValentinesDay = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    if (!isValentinesDay()) {
      return;
    }

    setIsActive(true);

  }, []);

  if (!isValentinesDay() && !isActive) {
    return null;
  }

  return <>
    {isActive && <>
      <FontAwesomeIcon icon={faHeart} className={styles.heartRight} />
      <FontAwesomeIcon icon={faHeart} className={styles.heartLeft} />
      <Image
        src={danielValentinesDay}
        alt="Daniel Zotti wishes you a merry Valentine's Day!"
        rel='preload'
        priority
        className={styles.daniel}
        onClick={toggleValentinesDay}
      />
    </>}
  </>;
};
