import React from 'react';
import styles from './teaser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCalendar, faTags } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDate } from 'src/hooks/useDate';

export interface TeaserProps {
  title: string;
  url: string;
  description?: string;
  tags?: Array<string>;
  date?: string;
  target?: '_self' | '_blank';
}

export const Teaser = ({ title, description, url, tags, date, target = '_self' }: TeaserProps): JSX.Element => {
  const { toDate } = useDate();
  return (
    <Link className={`dz-teaser ${styles.wrapper}`} href={url} target={target}>
      {target === '_blank' &&
        <div className={styles.newWindow}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {tags && tags.length > 0 && <p className={styles.tags}><FontAwesomeIcon icon={faTags} />&nbsp;{tags.join(', ')}</p>}
      {date && <p className={styles.date}><FontAwesomeIcon icon={faCalendar} />&nbsp;{toDate(date)}</p>}
    </Link>
  );
};
