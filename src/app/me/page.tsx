import styles from './page.module.scss';
import { InternalPageLayout } from '../../shared/layouts/internal-page-layout/internal-page-layout';

export default function MePage() {
  return (
    <InternalPageLayout>
      <div className={styles.me}>🤓</div>
    </InternalPageLayout>
  );
}
