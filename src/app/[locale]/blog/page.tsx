import { getArticleMetadataList } from "src/utils/articles";
import styles from "./page.module.scss";
import { Teaser } from "src/components/teaser/teaser";
import { config } from "src/config";
import { Metadata } from "next";
import { localizePath } from "src/i18n";
import { buildMetadata } from "src/utils/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("description"),
    path: config.urls.blog,
    locale: locale as "en" | "it",
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const articleMetadataList = getArticleMetadataList(locale as "en" | "it").sort((a, b) =>
    a.date > b.date ? -1 : 1,
  );
  return (
    <>
      <h1>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>
      <div className={styles.articles}>
        {articleMetadataList.map(({ slug, title, description, date, tags }) => (
          <Teaser
            key={slug}
            title={title}
            url={localizePath(`${config.urls.blog}/${slug}`, locale as "en" | "it")}
            tags={tags}
            date={date}
            description={description}
          />
        ))}
      </div>
    </>
  );
}
