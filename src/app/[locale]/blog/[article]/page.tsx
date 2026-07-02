import { faCalendar, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "src/components/back-button/back-button";
import { Markdown } from "src/components/markdown/markdown";
import { config } from "src/config";
import { localizePath } from "src/i18n";
import {
  getArticleContent,
  getArticleMetadata,
  getArticleMetadataList,
} from "src/utils/articles";
import { buildMetadata } from "src/utils/metadata";
import { toFormattedDate } from "src/utils/date";
import { getTranslations } from "next-intl/server";
import styles from "./page.module.scss";

export async function generateMetadata(props: {
  params: Promise<{ article: string; locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { article, locale } = params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const metadata = getArticleMetadata(article, locale as "en" | "it");

  return buildMetadata({
    title: config.pageTitle(metadata?.title || t("title")),
    description: metadata?.description || t("description"),
    path: `/blog/${article}`,
    locale: locale as "en" | "it",
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getArticleMetadataList().flatMap(({ slug }) => [
    { article: slug, locale: "en" },
    { article: slug, locale: "it" },
  ]);
}

export default async function ArticlePage(props: {
  params: Promise<{ article: string; locale: string; tags: Array<string> }>;
}) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  const backText = t("title");

  const markdown = getArticleContent(params.article, params.locale as "en" | "it");
  const metadata = getArticleMetadata(params.article, params.locale as "en" | "it");

  if (!metadata || !markdown) {
    return notFound();
  }

  const { tags, date } = metadata;

   const blogJsonLd = {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": metadata.title,
     "description": metadata.description,
     "datePublished": metadata.date,
     "url": `${config.baseUrl}${localizePath(`/blog/${params.article}`, params.locale as "en" | "it")}`,
    "author": {
      "@type": "Person",
      "name": "Daniel Zotti",
      "url": config.baseUrl
    },
    "publisher": {
      "@type": "Person",
      "name": "Daniel Zotti",
      "url": config.baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BackButton path={config.urls.blog} text={backText} />
      <div className={styles.contentWrapper}>
        <div className={styles.metadata}>
           {date && (
             <div className={styles.date}>
               <FontAwesomeIcon icon={faCalendar} />
               &nbsp;{toFormattedDate(date, params.locale as "en" | "it")}
             </div>
           )}
          {tags?.length > 0 && (
            <div className={styles.tags}>
              <FontAwesomeIcon icon={faTags} />
              &nbsp;{tags.map((t) => t.trim()).join(", ")}
            </div>
          )}
        </div>

        <Markdown className={styles.content}>{markdown}</Markdown>
      </div>
    </>
  );
}
