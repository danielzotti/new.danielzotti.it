import '@scss/styles.scss';
import { ReactNode } from 'react';
import { Navbar } from 'src/components/navbar/navbar';
import { config } from 'src/config';
import styles from './layout.module.scss';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle('Daniel\'s ambigram'),
  description:
    'Daniel\'s ambigram made with Illustrator, exported in SVG format and animated with JS',
  url: `${config.baseUrl}${config.urls.projects}/ambigram`
});

export default function AmbigramDemoLayout({
  children
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
