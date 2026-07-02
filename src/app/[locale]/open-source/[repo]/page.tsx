import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { BackButton } from "src/components/back-button/back-button";
import { Markdown } from "src/components/markdown/markdown";
import { config } from "src/config";
import { buildMetadata } from "src/utils/metadata";
import { toFormattedDate, toFormattedDateTime } from "src/utils/date";
import { getTranslations } from "next-intl/server";
import { getOpenSourceRepoCard } from "src/utils/open-source";
import styles from "./page.module.scss";

export const dynamic = "force-static";

export async function generateMetadata(props: {
  params: Promise<{ repo: string; locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { repo, locale } = params;
  const t = await getTranslations({ locale, namespace: "openSource" });

  const repoData = getOpenSourceRepoCard(repo);
  if (!repoData) {
    return {};
  }

  return buildMetadata({
    title: config.pageTitle(repoData.name || t("title")),
    description: repoData.description || undefined,
    path: `/open-source/${repo}`,
    locale: locale as "en" | "it",
  });
}

export async function generateStaticParams() {
  return config.github.selectedRepos.flatMap(({ slug }) => [
    { repo: slug, locale: "en" },
    { repo: slug, locale: "it" },
  ]);
}

export default async function RepoPage(props: {
  params: Promise<{ repo: string; locale: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: "openSourceRepo" });
  const tOpenSource = await getTranslations({ locale: params.locale, namespace: "openSource" });

  const repo = getOpenSourceRepoCard(params.repo);

  if (!repo) {
    return notFound();
  }
  return (
    <>
      <BackButton path={config.urls.openSource} text={tOpenSource("title")} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {!repo.readme && (
            <>
              <h1>{repo.name}</h1>
              <p>{repo.description}</p>
              {repo.updated_at && (
                <p>
                  {t("updatedAt")}{" "}
                  <strong>
                    {toFormattedDateTime(
                      repo.updated_at,
                      params.locale as "en" | "it",
                    )}
                  </strong>
                </p>
              )}
            </>
          )}
          {!!repo.readme && (
            <>
              <div className={styles.repoName}>{repo.name}</div>
              <div className={styles.readme}>
                <Markdown className={styles.content}>{repo.readme}</Markdown>
              </div>
            </>
          )}
        </div>
        <div className={styles.metadata}>
          {repo.created_at && (
            <p>
              <FontAwesomeIcon icon={faCalendar} />{" "}
              {toFormattedDate(repo.created_at, params.locale as "en" | "it")}
            </p>
          )}
          {repo.homepage && (
            <p>
              <Link href={repo.homepage} target="_blank">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> {t("homepage")}
              </Link>
            </p>
          )}
          {repo.html_url && (
            <p>
              <Link href={repo.html_url} target="_blank">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </Link>
            </p>
          )}
          {!!repo.readme && <p>{repo.description}</p>}
          {repo.topics && repo.topics.length > 0 && (
            <p className={styles.topics}>
              <FontAwesomeIcon icon={faTags} />
              &nbsp;{repo.topics.join(", ")}
            </p>
          )}
        </div>
      </div>
      {/*<pre style={{ maxWidth: '100%', overflow: 'auto' }}>{JSON.stringify(repo, null, 2)}</pre>*/}
    </>
  );
}
