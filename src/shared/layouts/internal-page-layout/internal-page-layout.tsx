import 'src/scss/styles.scss';
import { ReactNode } from 'react';
import { Footer } from 'src/components/footer/footer';
import { Navbar } from 'src/components/navbar/navbar';
import styles from './internal-page-layout.module.scss';

export const InternalPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.contentContainer}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
