import { ReactNode } from 'react';

import { config } from 'src/config';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle('QR Code'),
  description: 'Simple QR Code generator',
  url: `${config.baseUrl}${config.urls.projects}/qr-code-generator`
});

export default function QrCodeLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
