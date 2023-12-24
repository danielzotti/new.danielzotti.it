'use client';

import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { Button } from '../../shared/components/ui/button/button';
import styles from './xmas.module.scss';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface XmasProps {
  activateQueryParam?: string;
}

const isXmasTime = (): boolean => {
  const year = new Date().getUTCFullYear();

  const now = DateTime.now();

  const start = DateTime.local(year, 12, 8, 0, 0);
  const end = DateTime.local(year + 1, 1, 7, 0, 0);

  return now >= start && now <= end;
};

export const Xmas = ({ activateQueryParam = 'xmas' }: XmasProps) => {

  const [isActive, setIsActive] = useState<boolean>(false);
  const root = useRef<HTMLHtmlElement | null>(null);

  const toggleXmas = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const xmas = searchParams.get(activateQueryParam);

    if (xmas === null && !isXmasTime()) {
      return;
    }

    setIsActive(true);

    root.current = document.querySelector(':root');

    root.current!.style.setProperty('--cursor-default', 'url(/static/xmas/xmas-cursor-with-daniel.png), auto');
    root.current!.style.setProperty('--cursor-pointer', 'url(/static/xmas/xmas-cursor-with-daniel-pointer.png), pointer');

  }, []);

  if (!isXmasTime() && !isActive) {
    return null;
  }

  return <>
    <Button className={styles.stopBtn} onClick={toggleXmas}>
      <span className={`${styles.stopBtnLayers} fa-layers`}>
        <FontAwesomeIcon className={styles.snowflake} icon={faSnowflake} />
        {isActive && <FontAwesomeIcon className={styles.ban} icon={faBan} color={'red'} />}
      </span>
    </Button>
    {isActive && <div className={styles.snowWrapper}>
      <div className={styles.snow}></div>
    </div>}
  </>;
};
