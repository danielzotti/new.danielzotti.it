import { DateTime } from "luxon";
import React, { Suspense } from "react";
import { config } from "src/config";
import { fetchGithubReposByName } from "src/utils/api/github";
import styles from "./page.module.scss";
import { Teaser } from "src/components/teaser/teaser";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle("Open Source"),
  description: "Daniel Zotti's open source repositories",
  url: `${config.baseUrl}${config.urls.openSource}`,
});

export default async function OpenSourcePage() {
  const selectedRepos = await Promise.all(
    config.github.selectedRepos.map((repo) =>
      fetchGithubReposByName(repo.name),
    ),
  );

  return (
    <>
      <h1>Open Source</h1>
      <div className={styles.repos}>
        {selectedRepos
          ?.map(({ data: repo }) => {
            const selectedRepo = config.github.selectedRepos.find(
              (r) => r.name === repo.name,
            );
            return (
              <Teaser
                title={selectedRepo?.humanName ?? repo.name}
                url={`${config.urls.openSource}/${selectedRepo?.slug}`}
                key={repo.name}
                description={repo.description ?? undefined}
                date={repo.created_at}
              />
            );
          })
          .sort(
            (a, b) =>
              DateTime.fromISO(b.props.date).toMillis() -
              DateTime.fromISO(a.props.date).toMillis(),
          )}
      </div>
    </>
  );
}
