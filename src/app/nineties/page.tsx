import styles from './page.module.scss';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';
import { config } from 'src/config';
import { Metadata } from 'next';
import { NinetiesActivator } from './nineties-activator';

export const metadata: Metadata = {
  title: config.pageTitle('90s'),
  description:
    'It\'s time to go back in time!',
  robots: {
    index: false
  }
};

export default function NinetiesPage() {

  return (
    <InternalPageLayout>
      <NinetiesActivator />
      <div className={styles.nineties}>🕺🏻</div>
      <div className={styles.ninetiesText}>
        <h3>You&apos;ve just found the <strong><em>90s</em></strong> page!</h3>
      </div>
    </InternalPageLayout>
  );
}
