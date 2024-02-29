import styles from './back-button.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BackButtonProps {
  path: string;
  text?: string;
}

export const BackButton = ({ path, text = 'Go back' }: BackButtonProps) => {
  return <div className={styles.back}>
    <Link href={path}> <FontAwesomeIcon icon={faArrowLeft} /> {text}</Link>
  </div>;
};
