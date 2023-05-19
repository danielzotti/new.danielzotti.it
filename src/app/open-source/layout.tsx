import { ReactNode } from 'react';
import { config } from '../../config';
import { InternalPageLayout } from '../../shared/layouts/internal-page-layout/internal-page-layout';

export const metadata = {
  title: config.pageTitle('Open Source'),
  description: 'Daniel Zotti Open source repositories',
};

export default function OpenSourceLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
