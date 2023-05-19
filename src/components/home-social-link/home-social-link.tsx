import Link from 'next/link';
import styles from './home-social-link.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface HomeSocialLinkProps {
  icon: IconProp;
  name: string;
  url: string;
}

export const HomeSocialLink = ({
  icon,
  name,
  url
}: HomeSocialLinkProps) => {
  return (
    <Link href={url} target='_blank' className={styles.social}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <div className={styles.name}>{name}</div>
    </Link>
  );
};
