import { config } from '../../config';
import styles from './page.module.scss';
import { Teaser } from '../../components/teaser/teaser';

export default async function OpenSourcePage() {
  return (
    <>
      <h1>Open Source</h1>
      <div className={styles.repos}>
        {config.github.selectedRepos?.map((repo) => (
          <Teaser title={repo} url={`${config.urls.openSource}/${repo}`} key={repo} />))}
      </div>
    </>
  );
}
