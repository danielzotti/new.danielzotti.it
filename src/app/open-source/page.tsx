import { config } from 'src/config';
import styles from './page.module.scss';
import { Teaser } from 'src/components/teaser/teaser';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle('Open Source'),
  description: 'Daniel Zotti\'s open source repositories',
  url: `${config.baseUrl}${config.urls.openSource}`
});


export default async function OpenSourcePage() {
  return (
    <>
      <h1>Open Source</h1>
      <div className={styles.repos}>
        {config.github.selectedRepos?.map((repo) => (
          <Teaser title={repo.name} url={`${config.urls.openSource}/${repo.slug}`} key={repo.slug} />))}
      </div>
    </>
  );
}
