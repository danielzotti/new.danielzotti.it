import { ReactNode } from 'react';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';

export default function OpenSourceLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
