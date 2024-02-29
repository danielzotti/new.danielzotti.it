import { ReactNode } from 'react';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';

export default function CookiePolicyLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
