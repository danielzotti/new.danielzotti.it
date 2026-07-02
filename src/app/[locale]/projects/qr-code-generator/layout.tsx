import { ReactNode } from "react";

import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { Locale } from "src/i18n";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return buildMetadata({
    title: config.pageTitle("QR Code"),
    description: "Simple QR Code generator",
    path: `${config.urls.projects}/qr-code-generator`,
    locale,
  });
}

export default function QrCodeLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
