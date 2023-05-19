import { ReactNode } from 'react';
import { InternalPageLayout } from '../../../shared/layouts/internal-page-layout/internal-page-layout';
import { config } from '../../../config';

export const metadata = {
  title: config.pageTitle('QR Code'),
  description: 'Simple QR Code generator'
};

export default function QrCodeLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
