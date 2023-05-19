import { ReactNode } from 'react';
import { config } from '../../config';
import { InternalPageLayout } from '../../shared/layouts/internal-page-layout/internal-page-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: config.pageTitle('Cookie Policy'),
  description: 'Cookie Policy of danielzotti.it website',
};

export default function CookiePolicyLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
