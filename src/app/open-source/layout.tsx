import { ReactNode } from 'react';
import { config } from '../../config';
import { InternalPageLayout } from '../../shared/layouts/internal-page-layout/internal-page-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: config.pageTitle('Open Source'),
  description: 'Daniel Zotti\'s open source repositories',
};

export default function OpenSourceLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
