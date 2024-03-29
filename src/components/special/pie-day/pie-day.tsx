'use client';

import styles from './pie-day.module.scss';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import pieNumber from 'public/static/pie-day/pie-day-number.svg';
import pieText from 'public/static/pie-day/pie-day-text.svg';
import Image from 'next/image';

const isPieDay = (): boolean => {
  const month = DateTime.now().month;
  const day = DateTime.now().day;

  const pieMonth = 3;
  const pieDay = 14;

  return month === pieMonth && day === pieDay;
};

export const PieDay = () => {

  const [isActive, setIsActive] = useState<boolean>(false);
  const [face, setFace] = useState<'heads' | 'tails' | ''>('');

  const togglePieDay = () => {
    setIsActive((active) => !active);
  };

  const flip = () => {
    if (Math.random() > 0.5) {
      setFace('');
      setTimeout(() => {
        setFace('heads');
      }, 100);
    } else {
      setFace('');
      setTimeout(() => {
        setFace('tails');
      }, 100);
    }
  };

  useEffect(() => {
    if (!isPieDay()) {
      return;
    }
    setIsActive(true);
    flip();
  }, []);

  if (!isPieDay() && !isActive) {
    return null;
  }

  return <>
    {isActive && <>
      <button className={styles.close} title='Hide pie coin!' onClick={togglePieDay}>&times;</button>
      <div className={`${styles.coin} ${face}`} onClick={flip}>
        <div className={styles.coinHeads}>
          <Image src={pieNumber} alt='3.14 coin' />
        </div>
        <div className={styles.coinTails}>
          <Image src={pieText} alt='Pie coin' />
        </div>
      </div>
    </>}
  </>;
};
