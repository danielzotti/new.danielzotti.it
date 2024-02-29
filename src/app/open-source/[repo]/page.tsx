import Link from 'next/link';
import React, { Suspense } from 'react';
import { config } from 'src/config';
import { LoadingSvgIcon } from 'src/shared/components/ui/svg-icons/loading-svg-icon';
import { fetchGithubReposByName } from 'src/utils/api/github';
import styles from './page.module.scss';
import { useDate } from 'src/hooks/useDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BackButton } from 'src/components/back-button/back-button';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTags, faCalendar, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';
import { notFound } from 'next/navigation';
import { Markdown } from 'src/components/markdown/markdown';

export async function generateMetadata(
  { params: { repo } }: { params: { repo: string } }
): Promise<Metadata> {
  const repoName = config.github.selectedRepos.find(r => r.slug === repo)?.name;
  if (!repoName) {
    return {};
  }
  const { data: metadata } = await fetchGithubReposByName(repoName);

  return buildMetadata({
    title: config.openSourcePageTitle(metadata?.name),
    description: metadata?.description || undefined,
    url: `${config.baseUrl}/open-source/${repo}`
  });
}

export async function generateStaticParams() {
  return config.github.selectedRepos.map(({ slug }) => ({ repo: slug }));
}

export default async function RepoPage({
  params
}: {
  params: { repo: string };
}) {
  const repoName = config.github.selectedRepos.find(r => r.slug === params.repo)?.name;
  const { toDate, toDateTime } = useDate();
  if (!repoName) {
    return notFound();
  }
  const { data: repo, readme } = await fetchGithubReposByName(repoName);
  return (
    <>
      <BackButton path={config.urls.openSource} text={'Open Source'} />
      <Suspense fallback={<LoadingSvgIcon />}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>

            {!readme && <>
              <h1>{repo.name}</h1>
              <p>{repo.description}</p>
              <p>
                Last update at <strong>{toDateTime(repo.updated_at)}</strong>
              </p>
            </>}
            {!!readme &&
              <>
                <div className={styles.repoName}>{repo.name}</div>
                <div className={styles.readme}>
                  <Markdown className={styles.content}>{readme}</Markdown>
                </div>
              </>
            }
          </div>
          <div className={styles.metadata}>
            {repo.created_at && (
              <p><FontAwesomeIcon icon={faCalendar} /> {toDate(repo.created_at)}</p>
            )}
            {repo.homepage && (
              <p>
                <Link href={repo.homepage} target='_blank'>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Homepage
                </Link>
              </p>
            )}
            {repo.html_url && (
              <p>
                <Link href={repo.html_url} target='_blank'>
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </Link>
              </p>
            )}
            {!!readme && <p>{repo.description}</p>}
            {repo.topics && repo.topics.length > 0 && (
              <p className={styles.topics}><FontAwesomeIcon icon={faTags} />&nbsp;{repo.topics.join(', ')}</p>
            )}
          </div>
        </div>
        {/*<pre style={{ maxWidth: '100%', overflow: 'auto' }}>{JSON.stringify(repo, null, 2)}</pre>*/}
      </Suspense>
    </>
  );
}
