'use client';

import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import styles from './womens-day.module.scss';
import mimosa from 'public/static/womens-day/mimosa.png';
import Image from 'next/image';
import Link from 'next/link';

const isWomensDay = (): boolean => {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const womensMonth = 3;
  const womensDay = 8;

  return month === womensMonth && day === womensDay;
};

export const WomensDay = () => {

  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleWomensDay = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    if (!isWomensDay()) {
      return;
    }

    setIsActive(true);

  }, []);

  if (!isWomensDay() && !isActive) {
    return null;
  }

  return <>
    {isActive && <>

      <Link className={styles.mimosa}
        href='https://en.wikipedia.org/wiki/International_Women%27s_Day'
        target='_blank'
        title="International Women's Day">
        <Image
          src={mimosa}
          alt="Daniel Zotti wishes you a merry Valentine's Day!"
          rel='preload'
          priority
          onClick={toggleWomensDay}
        />
      </Link>
    </>}
  </>;
};
