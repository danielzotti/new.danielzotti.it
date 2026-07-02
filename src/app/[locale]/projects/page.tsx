import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import styles from "./page.module.scss";
import { Teaser } from "src/components/teaser/teaser";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { localizePath } from "src/i18n";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("description"),
    path: config.urls.projects,
    locale: locale as "en" | "it",
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function ProjectsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const teaserTitles = await getTranslations({ locale, namespace: "projects.teaserTitles" });
  const teasers = await getTranslations({ locale, namespace: "projects.teaserDescriptions" });

  return (
    <InternalPageLayout>
      <h1>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>
      <div className={styles.projects}>
        <Teaser
          title={teaserTitles("asciiSmuggler")}
          url={localizePath(
            `${config.urls.projects}/ascii-smuggler`,
            locale as "en" | "it",
          )}
          tags={["tools", "security", "unicode"]}
          date={"2026-06-10"}
          description={teasers("asciiSmuggler")}
        />

        <Teaser
          title={teaserTitles("tabuu")}
          description={teasers("tabuu")}
          url={"https://tabuu.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2026-02-27"}
        />
        <Teaser
          title={teaserTitles("singHit")}
          description={teasers("singHit")}
          url={"https://sing-hit.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2025-12-10"}
        />
        <Teaser
          title={teaserTitles("infinitris")}
          description={teasers("infinitris")}
          url={"https://infinitris.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2025-12-10"}
        />
        <Teaser
          title={teaserTitles("improWord")}
          description={teasers("improWord")}
          url={"https://impro-word.danielzotti.it"}
          tags={["website", "nextjs", "tool", "vibe-coding"]}
          target="_blank"
          date={"2026-03-10"}
        />
        <Teaser
          title={teaserTitles("slideRoulette")}
          description={teasers("slideRoulette")}
          url={"https://slide-roulette.danielzotti.it"}
          tags={["website", "qwik", "game"]}
          target="_blank"
          date={"2024-05-03"}
        />

        <Teaser
          title={teaserTitles("fake3d")}
          description={teasers("fake3d")}
          url={"https://danielzotti.github.io/fake-3d-website-next"}
          tags={["website", "3d", "nextjs"]}
          target="_blank"
          date={"2024-03-15"}
        />

        <Teaser
          title={teaserTitles("qrCodeGenerator")}
          url={localizePath(`${config.urls.projects}/qr-code-generator`, locale as "en" | "it")}
          tags={["tools", "svg"]}
          date={"2023-05-12"}
          description={teasers("qrCodeGenerator")}
        />

        <Teaser
          title={teaserTitles("ambigram")}
          url={localizePath(`${config.urls.projects}/ambigram`, locale as "en" | "it")}
          tags={["graphic", "svg", "animation"]}
          date={"2023-04-13"}
          description={teasers("ambigram")}
        />

        <Teaser
          title={teaserTitles("wedding")}
          description={teasers("wedding")}
          url={"http:///matrimonio.danielzotti.it"}
          tags={["website", "angular"]}
          target="_blank"
          date={"2017-09-20"}
        />

        <Teaser
          title={teaserTitles("blinking")}
          url={"http://projects.danielzotti.it/blinking"}
          description={teasers("blinking")}
          tags={["website", "parallax", "3D"]}
          target="_blank"
          date={"2014-06-20"}
        />

        <Teaser
          title={teaserTitles("techBlackboard")}
          url={"http://projects.danielzotti.it/lavagna-tecnologica"}
          description={teasers("techBlackboard")}
          tags={["website", "angularjs", "funny"]}
          target="_blank"
          date={"2010-11-01"}
        />

        <Teaser
          title={teaserTitles("days11111")}
          description={teasers("days11111")}
          url={"http://projects.danielzotti.it/undicimilacentoundici"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />

        <Teaser
          title={teaserTitles("christmasAperitif")}
          description={teasers("christmasAperitif")}
          url={"http://projects.danielzotti.it/aperitivoine3-natale"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />

        <Teaser
          title={teaserTitles("carnivalAperitif")}
          description={teasers("carnivalAperitif")}
          url={"http://projects.danielzotti.it/aperitivoine3-carnevale"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />
      </div>
    </InternalPageLayout>
  );
}
