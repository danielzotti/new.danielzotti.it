import packageJson from 'package.json';
import styles from './app-version.module.scss';
import { config } from 'src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const AppVersion = () => {
  return (
    <a href={config.github.repo} target='_blank' className={styles.version} title='View it on GitHub'>
      <FontAwesomeIcon icon={faGithub} /> v{packageJson.version}
    </a>
  );
};
