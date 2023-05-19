import '@scss/styles.scss';
import { ReactNode } from 'react';
import { Footer } from '../../../components/footer/footer';
import { Navbar } from '../../../components/navbar/navbar';
import { config } from '../../../config';
import styles from './layout.module.scss';

export const metadata = {
  title: config.pageTitle('Daniel\'s ambigram'),
  description:
    'Daniel\'s ambigram made with Illustrator, exported in SVG format and animated with JS',
};

export default function AmbigramDemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
