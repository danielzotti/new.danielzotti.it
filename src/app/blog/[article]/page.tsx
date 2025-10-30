import { faCalendar, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";
import { BackButton } from "src/components/back-button/back-button";
import { Markdown } from "src/components/markdown/markdown";
import { config } from "src/config";
import {
  getArticleContent,
  getArticleMetadata,
  getArticleMetadataList,
} from "src/utils/articles";
import { buildMetadata } from "src/utils/metadata";
import { toFormattedDate } from "../../../utils/date";
import styles from "./page.module.scss";

export async function generateMetadata(props: {
  params: Promise<{ article: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { article } = params;

  const metadata = getArticleMetadata(article);

  return buildMetadata({
    title: config.blogPageTitle(metadata?.title),
    description: metadata?.description,
    url: `${config.baseUrl}/blog/${article}`,
  });
}

export async function generateStaticParams() {
  return getArticleMetadataList().map(({ slug, tags }) => ({
    article: slug,
  }));
}

export default function ArticlePage(props: {
  params: Promise<{ article: string; tags: Array<string> }>;
}) {
  const params = use(props.params);

  const markdown = getArticleContent(params.article);
  const metadata = getArticleMetadata(params.article);

  if (!metadata || !markdown) {
    return notFound();
  }

  const { tags, date } = metadata;

  return (
    <>
      <BackButton path={config.urls.blog} text={"Blog"} />
      <div className={styles.contentWrapper}>
        <div className={styles.metadata}>
          {date && (
            <div className={styles.date}>
              <FontAwesomeIcon icon={faCalendar} />
              &nbsp;{toFormattedDate(date)}
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
