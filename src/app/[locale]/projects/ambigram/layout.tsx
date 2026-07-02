import "@scss/styles.scss";
import { ReactNode } from "react";
import { Navbar } from "src/components/navbar/navbar";
import { config } from "src/config";
import styles from "./layout.module.scss";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { Locale } from "src/i18n";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects.ambigram" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("description"),
    path: `${config.urls.projects}/ambigram`,
    locale,
    image: {
      url: `${config.baseUrl}/static/images/ambigram/daniel-ambigram.png`,
      width: 1200,
      height: 630,
      alt: t("imageAlt"),
    },
  });
}

export default function AmbigramDemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
