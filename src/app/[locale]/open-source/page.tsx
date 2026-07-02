import { DateTime } from "luxon";
import React from "react";
import { config } from "src/config";
import { getOpenSourceRepoCards } from "src/utils/open-source";
import styles from "./page.module.scss";
import { Teaser } from "src/components/teaser/teaser";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { localizePath } from "src/i18n";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "openSource" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("description"),
    path: config.urls.openSource,
    locale: locale as "en" | "it",
  });
}

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function OpenSourcePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "openSource" });
  const selectedRepos = getOpenSourceRepoCards();
  const sortedRepos = [...selectedRepos].sort(
    (a, b) =>
      DateTime.fromISO(b.created_at ?? "").toMillis() -
      DateTime.fromISO(a.created_at ?? "").toMillis(),
  );

  return (
    <>
      <h1>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>
      <div className={styles.repos}>
        {sortedRepos.map((repo) => (
          <Teaser
            title={repo.humanName}
            url={localizePath(
              `${config.urls.openSource}/${repo.slug}`,
              locale as "en" | "it",
            )}
            key={repo.name}
            description={repo.description ?? undefined}
            date={repo.created_at ?? undefined}
          />
        ))}
      </div>
    </>
  );
}
