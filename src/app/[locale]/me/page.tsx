import styles from "./page.module.scss";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { config } from "src/config";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "me" });
  return {
    ...buildMetadata({
      title: config.pageTitle(t("title")),
      description: t("description"),
      path: "/me",
      locale: locale as "en" | "it",
    }),
    robots: {
      index: false,
    },
  };
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function MePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "me" });

  return (
    <InternalPageLayout>
      <h1>{t("heading")}</h1>
      <div className={styles.me}>🤓</div>
      <div className={styles.meText}>
        <h3>
          {t("found")}
          <strong>
            <em>{t("page_part")}</em>
          </strong>{" "}
          {t("page_suffix")}
        </h3>
        <p>{t("easter_egg")}</p>
        <p>{t("detective")}</p>
      </div>
    </InternalPageLayout>
  );
}
