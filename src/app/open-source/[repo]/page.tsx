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
import React, { Suspense } from "react";
import { BackButton } from "src/components/back-button/back-button";
import { Markdown } from "src/components/markdown/markdown";
import { config } from "src/config";
import { LoadingSvgIcon } from "src/shared/components/ui/svg-icons/loading-svg-icon";
import { fetchGithubReposByName } from "src/utils/api/github";
import { buildMetadata } from "src/utils/metadata";
import { toFormattedDate, toFormattedDateTime } from "../../../utils/date";
import styles from "./page.module.scss";

export async function generateMetadata(props: {
  params: Promise<{ repo: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { repo } = params;

  const repoName = config.github.selectedRepos.find(
    (r) => r.slug === repo,
  )?.name;
  if (!repoName) {
    return {};
  }
  const { data: metadata } = await fetchGithubReposByName(repoName);

  return buildMetadata({
    title: config.openSourcePageTitle(metadata?.name),
    description: metadata?.description || undefined,
    url: `${config.baseUrl}/open-source/${repo}`,
  });
}

export async function generateStaticParams() {
  return config.github.selectedRepos.map(({ slug }) => ({ repo: slug }));
}

export default async function RepoPage(props: {
  params: Promise<{ repo: string }>;
}) {
  const params = await props.params;
  const repoName = config.github.selectedRepos.find(
    (r) => r.slug === params.repo,
  )?.name;

  if (!repoName) {
    return notFound();
  }
  const { data: repo, readme } = await fetchGithubReposByName(repoName);
  return (
    <>
      <BackButton path={config.urls.openSource} text={"Open Source"} />
      <Suspense fallback={<LoadingSvgIcon />}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {!readme && (
              <>
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
                <p>
                  Last update at{" "}
                  <strong>{toFormattedDateTime(repo.updated_at)}</strong>
                </p>
              </>
            )}
            {!!readme && (
              <>
                <div className={styles.repoName}>{repo.name}</div>
                <div className={styles.readme}>
                  <Markdown className={styles.content}>{readme}</Markdown>
                </div>
              </>
            )}
          </div>
          <div className={styles.metadata}>
            {repo.created_at && (
              <p>
                <FontAwesomeIcon icon={faCalendar} />{" "}
                {toFormattedDate(repo.created_at)}
              </p>
            )}
            {repo.homepage && (
              <p>
                <Link href={repo.homepage} target="_blank">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Homepage
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
            {!!readme && <p>{repo.description}</p>}
            {repo.topics && repo.topics.length > 0 && (
              <p className={styles.topics}>
                <FontAwesomeIcon icon={faTags} />
                &nbsp;{repo.topics.join(", ")}
              </p>
            )}
          </div>
        </div>
        {/*<pre style={{ maxWidth: '100%', overflow: 'auto' }}>{JSON.stringify(repo, null, 2)}</pre>*/}
      </Suspense>
    </>
  );
}
