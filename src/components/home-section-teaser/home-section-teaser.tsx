import Link from 'next/link';
import { ReactNode } from 'react';
import { IconNames } from '../../models/icons.models';
import styles from './home-section-teaser.module.scss';

export interface TeaserProps {
  icon?: ReactNode;
  title: string;
  path: string;
  target?: '_self' | '_blank';
}

export const HomeSectionTeaser = ({
  icon,
  title,
  path,
  target = '_self'
}: TeaserProps) => {
  return (
    <Link href={path} target={target} className={styles.teaserContainer}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};
