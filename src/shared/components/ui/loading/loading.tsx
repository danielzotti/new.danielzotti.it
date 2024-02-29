import { LoadingSvgIcon } from 'src/shared/components/ui/svg-icons/loading-svg-icon';
import styles from './loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSvgIcon />
    </div>
  );
};
