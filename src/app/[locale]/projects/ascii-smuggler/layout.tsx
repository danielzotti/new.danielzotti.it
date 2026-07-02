import { ReactNode } from "react";

import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { Locale } from "src/i18n";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "asciiSmuggler" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("description"),
    path: `${config.urls.projects}/ascii-smuggler`,
    locale,
  });
}

export default function AsciiSmugglerLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
