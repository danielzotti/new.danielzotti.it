import styles from './page.module.scss';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';
import { config } from 'src/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: config.pageTitle('It\'s me, Daniel!'),
  description:
    'Daniel\'s pointless page',
  robots: {
    index: false
  }
};

export default function MePage() {


  return (
    <InternalPageLayout>
      <div className={styles.me}>🤓</div>
      <div className={styles.meText}>
        <h3>You&apos;ve just found the <strong><em>ME</em></strong> page!</h3>
        <p>It&apos;s a pointless
          page, but you can be happy because you&apos;ve found one of the many Easter eggs I&apos;ve left all
          over the website!</p>
        <p>
          If you fell like reach me out to tell me that you are a good detective 🕵️‍♂️, I&apos;ll be happy to hear it!
        </p>
      </div>
    </InternalPageLayout>
  );
}
