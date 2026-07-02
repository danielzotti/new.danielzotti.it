import { Footer } from "src/components/footer/footer";
import { HomerBanner } from "src/components/home-banner/home-banner";
import cvPreviewEn from "public/static/images/brand/danielzotti-cv-preview-en-small.webp";
import cvPreviewIt from "public/static/images/brand/danielzotti-cv-preview-it-small.webp";
import { config } from "src/config";
import { BlogSvgIcon } from "src/shared/components/ui/svg-icons/blog-svg-icon";
import { ProjectsSvgIcon } from "src/shared/components/ui/svg-icons/projects-svg-icon";
import { OpenSourceSvgIcon } from "src/shared/components/ui/svg-icons/open-source-svg-icon";
import styles from "./page.module.scss";
import Link from "next/link";
import { StatementWithIcon } from "src/components/statement-with-icon/statement-with-icon";
import {
  faCode,
  faBriefcase,
  faSoccerBall,
  faTableTennisPaddleBall,
  faClapperboard,
  faDrawPolygon,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinHearts } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faLinkedin,
  faGitlab,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faReact,
  faAngular,
  faVuejs,
  faJs,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeSectionTeaser } from "src/components/home-section-teaser/home-section-teaser";
import Image from "next/image";
import { HomeSocialLink } from "src/components/home-social-link/home-social-link";
import { HomeNavbar } from "src/components/home-navbar/home-navbar";
import { HomeThemeSelector } from "src/components/home-theme-selector/home-theme-selector";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { getTranslations } from "next-intl/server";
import { localizePath } from "src/i18n";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "homePage" });
  return buildMetadata({
    title: config.title,
    description: t("metaDescription"),
    path: "/",
    locale: locale as "en" | "it",
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "homePage" });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daniel Zotti",
    url: config.baseUrl,
    image: config.websiteImage.url,
    jobTitle:
      "Creative Web Developer, Professor and Computer Engineer by day. Improviser and Stand-up Comedian by night",
    worksFor: {
      "@type": "Organization",
      name: "Bitrock",
      url: "https://bitrock.it",
    },
    sameAs: [
      config.social.instagram.url,
      config.social.linkedin.url,
      config.social.facebook.url,
      config.social.youtube.url,
      config.social.gitlab.url,
      config.social.github.url,
      config.social.twitter.url,
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daniel Zotti | Creative Web developer",
    url: config.baseUrl,
    author: {
      "@type": "Person",
      name: "Daniel Zotti",
    },
    description: config.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className={styles.pageContainer}>
        <HomeNavbar />

        <HomerBanner />

        <div
          className={`dz-home__content ${styles.contentContainer} page-content-container`}
        >
          <div className={styles.statementsContainer}>
            <h2>
              {t("whoAmI")}
              <em style={{ whiteSpace: "nowrap" }}>{t("whoAmIName")}</em>
              {t("whoAmIQuestion")}
            </h2>

            <StatementWithIcon
              icon={faCode}
              className={styles.statementContainer}
              showIcon={false}
            >
              {t("webDev")}{" "}
              <span className={styles.item}>
                <FontAwesomeIcon icon={faJs} style={{ color: "#F0DB4F" }} />
                <strong>{t("javascript")}</strong>
              </span>
              ,
              <span className={styles.item}>
                <FontAwesomeIcon
                  icon={faCss3Alt}
                  style={{ color: "#2965f1" }}
                />
                <strong>{t("css")}</strong>
              </span>
              ,
              <span className={styles.item}>
                <FontAwesomeIcon
                  icon={faAngular}
                  style={{ color: "#DD1B16" }}
                />
                <strong>{t("angular")}</strong>
              </span>
              ,
              <span className={styles.item}>
                <FontAwesomeIcon icon={faReact} style={{ color: "#61DBFB" }} />
                <strong>{t("react")}</strong>
              </span>{" "}
              {t("and")}{" "}
              <span className={styles.item}>
                <FontAwesomeIcon icon={faVuejs} style={{ color: "#41B883" }} />
                <strong>{t("vue")}</strong>
              </span>
              . {t("rxjs")}
            </StatementWithIcon>

            <StatementWithIcon
              icon={faBriefcase}
              className={styles.statementContainer}
            >
              <strong>
                <Link href="https://bitrock.it" target="_blank">
                  {t("bitrock")}
                </Link>
              </strong>{" "}
              {t("bittrockText")}
            </StatementWithIcon>

            <StatementWithIcon
              icon={faFaceGrinHearts}
              className={styles.statementContainer}
              showIcon={false}
            >
              {t("spareTime")}{" "}
              <em>
                <strong>{t("aLot")}</strong>
              </em>
              &nbsp;&nbsp;🤯 {t("spareTimeEnd")}
              <Link href={localizePath("/about-me", locale as "en" | "it")}>
                {t("dedicatedPage")}
              </Link>
              .
            </StatementWithIcon>
          </div>

          <div className={styles.cvSection}>
            <h2>{t("cvTitle")}</h2>

            <div className={styles.cvList}>
              <Link
                className={`dz-home__cv ${styles.cv}`}
                href={config.assetsUrl.cv.english}
                target="_blank"
              >
                <Image
                  src={cvPreviewEn}
                  alt="Daniel Zotti English CV"
                  width={326}
                  height={461}
                />
                <div className={styles.cvLanguage}>{t("cvEnLabel")}</div>
              </Link>

              <Link
                className={`dz-home__cv ${styles.cv}`}
                href={config.assetsUrl.cv.italian}
                target="_blank"
              >
                <Image
                  src={cvPreviewIt}
                  alt="Daniel Zotti Curriculum Vitae Italiano"
                  width={326}
                  height={461}
                />
                <div className={styles.cvLanguage}>{t("cvItLabel")}</div>
              </Link>
            </div>
          </div>

          <div className={styles.stalkingSection}>
            <h2>{t("socialTitle")}</h2>

            <div className={styles.stalkingList}>
              <HomeSocialLink
                icon={faInstagram}
                name={config.social.instagram.name}
                url={config.social.instagram.url}
              />
              <HomeSocialLink
                icon={faLinkedin}
                name={config.social.linkedin.name}
                url={config.social.linkedin.url}
              />
              <HomeSocialLink
                icon={faFacebook}
                name={config.social.facebook.name}
                url={config.social.facebook.url}
              />
              <HomeSocialLink
                icon={faYoutube}
                name={config.social.youtube.name}
                url={config.social.youtube.url}
              />
              <HomeSocialLink
                icon={faGitlab}
                name={config.social.gitlab.name}
                url={config.social.gitlab.url}
              />
              <HomeSocialLink
                icon={faGithub}
                name={config.social.github.name}
                url={config.social.github.url}
              />
            </div>
          </div>

          <div className={styles.sections}>
            <h2>{t("sectionsTitle")}</h2>

            <div className={`dz-home__section-list ${styles.sectionList}`}>
              <HomeSectionTeaser
                icon={<BlogSvgIcon />}
                title={t("blog")}
                path={config.urls.blog}
              />
              <HomeSectionTeaser
                icon={<ProjectsSvgIcon />}
                title={t("projects")}
                path={config.urls.projects}
              />
              <HomeSectionTeaser
                icon={<OpenSourceSvgIcon />}
                title={t("openSource")}
                path={config.urls.openSource}
              />
            </div>
          </div>

          <div className={styles.themeContainer}>
            <h2>{t("themeTitle")}</h2>
            <p>
              {t("themeText")} <small>{t("themeSmall")}</small>
            </p>

            <HomeThemeSelector />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
