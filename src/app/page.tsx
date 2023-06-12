import { Footer } from '../components/footer/footer';
import { HomerBanner } from '../components/home-banner/home-banner';
import cvPreviewEn from '../../public/static/images/brand/danielzotti-cv-preview-en-small.webp';
import cvPreviewIt from '../../public/static/images/brand/danielzotti-cv-preview-it-small.webp';
import { config } from '../config';
import { BlogSvgIcon } from '../shared/components/ui/svg-icons/blog-svg-icon';
import { ProjectsSvgIcon } from '../shared/components/ui/svg-icons/projects-svg-icon';
import { OpenSourceSvgIcon } from '../shared/components/ui/svg-icons/open-source-svg-icon';
import styles from './page.module.scss';
import Link from 'next/link';
import { StatementWithIcon } from '../components/statement-with-icon/statement-with-icon';
import {
  faCode,
  faBriefcase,
  faSoccerBall,
  faTableTennisPaddleBall,
  faClapperboard,
  faDrawPolygon
} from '@fortawesome/free-solid-svg-icons';
import {
  faFaceGrinHearts
} from '@fortawesome/free-regular-svg-icons';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLinkedin,
  faGitlab,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { faReact, faAngular, faVuejs, faJs, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HomeSectionTeaser } from '../components/home-section-teaser/home-section-teaser';
import Image from 'next/image';
import { HomeSocialLink } from '../components/home-social-link/home-social-link';
import { HomeNavbar } from '../components/home-navbar/home-navbar';
import { HomeThemeSelector } from '../components/home-theme-selector/home-theme-selector';

export default function Home() {

  return (
    <>
      <div className={styles.pageContainer}>
        <HomerBanner />

        <HomeNavbar />

        <div className={`dz-home__content ${styles.contentContainer}`}>

          <div className={styles.statementsContainer}>
            <h2>Who the heck is 👨‍💻 <em style={{ whiteSpace: 'nowrap' }}>Daniel Zotti</em>?!</h2>

            <StatementWithIcon icon={faCode} className={styles.statementContainer} showIcon={false}>
              I type letters and numbers on my keyboard developing web apps with <span
                className={styles.item}><FontAwesomeIcon
                  icon={faJs} style={{ color: '#F0DB4F' }} /><strong>JavaScript/Typescript</strong></span>,
              <span className={styles.item}><FontAwesomeIcon icon={faCss3Alt}
                style={{ color: '#2965f1' }} /><strong>CSS/SCSS</strong></span>,
              <span className={styles.item}><FontAwesomeIcon icon={faAngular}
                style={{ color: '#DD1B16' }} /><strong>Angular</strong></span>,
              <span className={styles.item}><FontAwesomeIcon icon={faReact}
                style={{ color: '#61DBFB' }} /><strong>React</strong></span> and <span
                className={styles.item}><FontAwesomeIcon icon={faVuejs}
                  style={{ color: '#41B883' }} /><strong>VueJs</strong></span>.
              I love <strong>RxJs</strong> and functional programming, and I&apos;m really curious about the
              latest <strong>Browser APIs</strong>.
            </StatementWithIcon>

            <StatementWithIcon icon={faBriefcase} className={styles.statementContainer}>
              <strong><Link href='https://bitrock.it' target='_blank'>Bitrock</Link></strong> gives me money 💰 to do the
              stuff I wrote above.
            </StatementWithIcon>

            <StatementWithIcon icon={faFaceGrinHearts} className={styles.statementContainer} showIcon={false}>
              In my spare time I play <span><FontAwesomeIcon icon={faSoccerBall} /><strong>soccer</strong></span> and
              <span className={styles.item}><FontAwesomeIcon
                icon={faTableTennisPaddleBall} /><strong>table tennis</strong></span>, and I do
              <span className={styles.item}><FontAwesomeIcon
                icon={faDrawPolygon} /><strong>graphic</strong></span> projects and
              <span className={styles.item}><FontAwesomeIcon
                icon={faClapperboard} /><strong>short films</strong></span> as a hobby.
            </StatementWithIcon>
          </div>

          <div className={styles.cvSection}>
            <h2>Need my 💼 CV?</h2>

            <div className={styles.cvList}>
              <Link className={`dz-home__cv ${styles.cv}`} href={config.assetsUrl.cv.english} target='_blank'>
                <Image
                  src={cvPreviewEn}
                  alt='Daniel Zotti English CV'
                  width={326}
                  height={461}
                />
                <div className={styles.cvLanguage}>English</div>
              </Link>

              <Link className={`dz-home__cv ${styles.cv}`} href={config.assetsUrl.cv.italian} target='_blank'>
                <Image
                  src={cvPreviewIt}
                  alt='Daniel Zotti Curriculum Vitae Italiano'
                  width={326}
                  height={461}
                />
                <div className={styles.cvLanguage}>Italiano</div>
              </Link>
            </div>
          </div>

          <div className={styles.stalkingSection}>
            <h2>Time for 🕵 stalking?</h2>

            <div className={styles.stalkingList}>
              <HomeSocialLink icon={faInstagram} name={config.social.instagram.name}
                url={config.social.instagram.url} />
              <HomeSocialLink icon={faLinkedin} name={config.social.linkedin.name} url={config.social.linkedin.url} />
              <HomeSocialLink icon={faFacebook} name={config.social.facebook.name} url={config.social.facebook.url} />
              <HomeSocialLink icon={faYoutube} name={config.social.youtube.name} url={config.social.youtube.url} />
              <HomeSocialLink icon={faGitlab} name={config.social.gitlab.name} url={config.social.gitlab.url} />
              <HomeSocialLink icon={faGithub} name={config.social.github.name} url={config.social.github.url} />
            </div>
          </div>


          <div className={styles.sections}>
            <h2>Want 📖 more contents?</h2>

            <nav className={`dz-home__section-list ${styles.sectionList}`}>
              <HomeSectionTeaser
                icon={<BlogSvgIcon />}
                title={'Blog'}
                path={config.urls.blog}
              />
              <HomeSectionTeaser
                icon={<ProjectsSvgIcon />}
                title={'Projects'}
                path={config.urls.projects}
              />
              <HomeSectionTeaser
                icon={<OpenSourceSvgIcon />}
                title={'Open source'}
                path={config.urls.openSource}
              />
            </nav>
          </div>

          <div className={styles.themeContainer}>
            <h2>Do you prefer dark or light mode?</h2>
            <p>Just click on your preference <small>(...but choose wisely)!</small></p>

            <HomeThemeSelector />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
