import { ReactNode } from 'react';
import { config } from '../../config';
import { InternalPageLayout } from '../../shared/layouts/internal-page-layout/internal-page-layout';

export const metadata = {
  title: config.pageTitle('Blog'),
  description: 'Articles about IT stuff and more',
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
