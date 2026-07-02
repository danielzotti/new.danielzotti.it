import Link from "next/link";
import { Metadata } from "next";
import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { buildMetadata } from "src/utils/metadata";
import { getTranslations } from "next-intl/server";
import { Locale } from "src/i18n";
import styles from "./page.module.scss";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return buildMetadata({
    title: config.pageTitle(t("title")),
    description: t("metaDescription"),
    path: config.urls.aboutMe,
    locale: locale as "en" | "it",
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function AboutMePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const l = {
    it: {
      stageImprovisation: (
        <>
          Dal 2022 faccio improvvisazione teatrale a Trieste con{" "}
          <Link href="https://www.improvvisamente.info/" target="_blank">
            Improvvisamente Trieste APS
          </Link>
          : un&#39;associazione fantastica che mi tiene presente, reattivo e
          connesso alle persone.
        </>
      ),
      stageStandup: (
        <>
          Faccio parte dei{" "}
          <Link href="https://www.gincomici.it" target="_blank">
            Gin Comici
          </Link>{" "}
          e nelle nostre serate nei locali in FVG introduco i comici e porto
          monologhi originali.
        </>
      ),
      stageMurder: (
        <>
          Collaboro come attore con{" "}
          <Link href="https://www.indiziosi.it" target="_blank">
            Gli Indiziosi
          </Link>
          , unendo teatro e interazione con il pubblico per risolvere misteri
          tra una portata e l&#39;altra.
        </>
      ),
      stageAirBand: (
        <>
          Con il mio gruppo, i <em>Ban Halen</em>, ho vinto lo storico{" "}
          <Link
            href="https://youtu.be/vlEJ2PjwD9c?si=6U711-Pd85GigaTL&t=28"
            target="_blank"
          >
            Air Band Contest
          </Link>{" "}
          al Round Midnight / Stazione Rogers nel 2012 con mash-up epici e
          performance divertenti.
        </>
      ),
      creativeCoding: (
        <>
          Costruisco esperimenti digitali giocosi come il{" "}
          <Link
            href="https://meteoropathic-website.danielzotti.it"
            target="_blank"
          >
            Meteoropathic Website
          </Link>
          , il{" "}
          <Link
            href="https://danielzotti.github.io/fake-3d-website-next"
            target="_blank"
          >
            Fake 3D Website
          </Link>
          ,{" "}
          <Link href="https://slide-roulette.danielzotti.it" target="_blank">
            Slide Roulette
          </Link>{" "}
          e molti altri che potete trovare nei miei{" "}
          <Link href="/projects">progetti</Link> o{" "}
          <Link href="/open-source">repository open source</Link>.
        </>
      ),
      creativePodcasting: (
        <>
          Co-conduco{" "}
          <Link href="https://www.shiftatiditesta.it" target="_blank">
            Shiftati di Testa
          </Link>{" "}
          con Stefano, parlando di tecnologia, leadership, crescita personale e
          tutto ciò che ci fa dire “WOW!”
        </>
      ),
      triesteClanfe: (
        <>
          <Link
            href="https://www.spiz.it/olimpiadi-dele-clanfe"
            target="_blank"
          >
            Olimpiade dele Clanfe
          </Link>{" "}
          è una storica e stravagante gara triestina di tuffi: vince chi schizza
          di più ma anche la scenetta più divertente.
        </>
      ),
      triesteRampigada: (
        <>
          <Link href="https://www.spiz.it/rampigada-santa" target="_blank">
            Rampigada Santa
          </Link>{" "}
          è una durissima corsa di 2 km in salita a Trieste: la faccio a piedi
          (ma si può fare anche in bici), spesso distribuendo birre fredde a
          metà percorso per supporto morale ai partecipanti.
        </>
      ),
      triesteCarnival: (
        <>
          Partecipo al{" "}
          <Link href="https://www.carnevaldemuja.com/" target="_blank">
            Carnevale di Muggia
          </Link>{" "}
          con costumi satirici ispirati all&#39;attualità, e sì: ho preso parte
          anche a flashmob e vari eventi nel centro di Trieste.
        </>
      ),
      triesteInVento: (
        <>
          Nel 2017 ho vinto il concorso InVento Trieste progettando logo
          turistico della città, slogan{" "}
          <strong>&#34;We are inTRIESTEing&#34;</strong> e{" "}
          <Link
            href="https://www.youtube.com/watch?v=TNriqgg1a_Y"
            target="_blank"
          >
            video
          </Link>{" "}
          promozionale.
        </>
      ),
      eventsImprobora: (
        <>
          <Link href="https://improbora.improvvisamente.info" target="_blank">
            ImproBora
          </Link>{" "}
          è un festival di improvvisazione teatrale a Trieste che co-organizzo
          dal 2025: workshop con insegnanti internazionali, cene in location
          splendide, spettacoli incredibili e un tocco di{" "}
          <Link
            href="https://dialetticon.blogspot.com/2011/01/morbin.html"
            target="_blank"
          >
            <em>&#34;morbin&#34;</em>
          </Link>
          .
        </>
      ),
      eventsCorporate: (
        <>
          Ho progettato format coinvolgenti come <strong>Fortigames</strong>{" "}
          (torneo multisport aziendale) e <strong>Fortitudex</strong> (gioco
          aziendale interattivo stile Pokemon) per{" "}
          <Link href="https://fortitudegroup.it/" target="_blank">
            Fortitude Group
          </Link>
          .
        </>
      ),
      eventsSports: (
        <>
          Dopo oltre 20 anni di calcio a 11 agonistico con l&#39;
          <Link href="http://esperia.danielzotti.it" target="_blank">
            Esperia
          </Link>{" "}
          e 2 anni di tennis tavolo, oggi mi tengo in forma camminando per
          Trieste verso l&#39;ufficio, pensando a nuove idee (e ai gelati).
        </>
      ),
    },
    en: {
      stageImprovisation: (
        <>
          Since 2022, I have been actively practicing theatre improvisation in
          Trieste with{" "}
          <Link href="https://www.improvvisamente.info/" target="_blank">
            Improvvisamente Trieste APS
          </Link>
          : a fantastic association that keeps me present, reactive, and fully
          connected with people.
        </>
      ),
      stageStandup: (
        <>
          I am an active performer and host in{" "}
          <Link href="https://www.gincomici.it" target="_blank">
            Gin Comici
          </Link>
          , presenting comedians and delivering original monologues across FVG
          venues.
        </>
      ),
      stageMurder: (
        <>
          I collaborate as an actor with{" "}
          <Link href="https://www.indiziosi.it" target="_blank">
            Gli Indiziosi
          </Link>
          , blending theatre and immersive audience interaction to solve
          mysteries between dinner courses.
        </>
      ),
      stageAirBand: (
        <>
          Alongside my group <em>Ban Halen</em>, I won the historic{" "}
          <Link
            href="https://youtu.be/vlEJ2PjwD9c?si=6U711-Pd85GigaTL&t=28"
            target="_blank"
          >
            2012 Air Band Contest
          </Link>{" "}
          at Round Midnight / Stazione Rogers with epic mash-ups.
        </>
      ),
      creativeCoding: (
        <>
          I build playful digital experiments like the{" "}
          <Link
            href="https://meteoropathic-website.danielzotti.it"
            target="_blank"
          >
            Meteoropathic Website
          </Link>
          , the{" "}
          <Link
            href="https://danielzotti.github.io/fake-3d-website-next"
            target="_blank"
          >
            Fake 3D Website
          </Link>
          , and{" "}
          <Link href="https://slide-roulette.danielzotti.it" target="_blank">
            Slide Roulette
          </Link>
          .
        </>
      ),
      creativePodcasting: (
        <>
          I co-host{" "}
          <Link href="https://www.shiftatiditesta.it" target="_blank">
            Shiftati di Testa
          </Link>{" "}
          with Stefano, discussing tech, culture, and odd life questions.
        </>
      ),
      triesteClanfe: (
        <>
          <Link
            href="https://www.spiz.it/olimpiadi-dele-clanfe"
            target="_blank"
          >
            Olimpiade dele Clanfe
          </Link>{" "}
          is a historic and eccentric water-splashing and diving competition in
          Trieste, where the biggest splash and funniest sketch take the crown.
        </>
      ),
      triesteRampigada: (
        <>
          <Link href="https://www.spiz.it/rampigada-santa" target="_blank">
            Rampigada Santa
          </Link>{" "}
          is a grueling 2 km vertical uphill race in Trieste that I complete on
          foot, often handing out cold beers for moral support along the way.
        </>
      ),
      triesteCarnival: (
        <>
          I join{" "}
          <Link href="https://www.carnevaldemuja.com/" target="_blank">
            Muggia&#39;s traditional Carnival
          </Link>{" "}
          with satirical costumes inspired by current events, and I am also
          guilty of participating in pop-powered flashmobs in downtown Trieste.
        </>
      ),
      triesteInVento: (
        <>
          In 2017, I won the InVento Trieste competition by designing the city
          tourism logo, slogan <strong>&#34;We are inTRIESTEing&#34;</strong>,
          and promotional{" "}
          <Link
            href="https://www.youtube.com/watch?v=TNriqgg1a_Y"
            target="_blank"
          >
            video
          </Link>
          .
        </>
      ),
      eventsImprobora: (
        <>
          <Link href="https://improbora.improvvisamente.info" target="_blank">
            ImproBora
          </Link>{" "}
          is a theatre improvisation festival in Trieste that I&#39;ve
          co-organized since 2025: workshops led by international teachers,
          dinners in beautiful locations, amazing shows, with a touch of{" "}
          <Link
            href="https://dialetticon.blogspot.com/2011/01/morbin.html"
            target="_blank"
          >
            <em>&#34;morbin&#34;</em>
          </Link>
          .
        </>
      ),
      eventsCorporate: (
        <>
          I designed engaging event formats such as <strong>Fortigames</strong>{" "}
          (a multi-sport company tournament) and <strong>Fortitudex</strong> (an
          interactive Pokemon-style corporate game) for{" "}
          <Link href="https://fortitudegroup.it/" target="_blank">
            Fortitude Group
          </Link>
          .
        </>
      ),
      eventsSports: (
        <>
          After 20+ years of competitive soccer with{" "}
          <Link href="http://esperia.danielzotti.it" target="_blank">
            Esperia
          </Link>{" "}
          and a 2-year stint in table tennis, I now keep fit with walks through
          Trieste on my way to the office, brainstorming new ideas and thinking
          about life (and ice creams).
        </>
      ),
    },
  }[locale];

  const stageHighlights = [
    {
      title: t("theatreImprovisation"),
      text: l.stageImprovisation,
    },
    {
      title: t("standUpComedy"),
      text: l.stageStandup,
    },
    {
      title: t("murderMysteryDinners"),
      text: l.stageMurder,
    },
    {
      title: t("airBandChampion"),
      text: l.stageAirBand,
    },
  ];

  const creativeLabHighlights = [
    {
      title: t("musicFirstMindset"),
      text: t("musicFirstText"),
    },
    {
      title: t("videoProduction"),
      text: t("videoProductionText"),
    },
    {
      title: t("creativeCoding"),
      text: l.creativeCoding,
    },
    {
      title: t("podcasting"),
      text: l.creativePodcasting,
    },
  ];

  const triesteHighlights = [
    {
      title: t("olimpiadeDelleClanfe"),
      text: l.triesteClanfe,
    },
    {
      title: t("rampigataSanta"),
      text: l.triesteRampigada,
    },
    {
      title: t("muggiaCarNival"),
      text: l.triesteCarnival,
    },
    {
      title: t("inVento"),
      text: l.triesteInVento,
    },
  ];

  const eventsAndSportHighlights = [
    {
      title: t("giuochiSenzaSperanze"),
      text: t("giuochiSenzaSperanzaText"),
    },
    {
      title: t("improboraFestival"),
      text: l.eventsImprobora,
    },
    {
      title: t("corporateTeamBuilding"),
      text: l.eventsCorporate,
    },
    {
      title: t("sportsAndFitness"),
      text: l.eventsSports,
    },
  ];

  return (
    <InternalPageLayout>
      <div className={styles.about}>
        <header className={styles.hero}>
          <h1>{t("aboutMeTitle")}</h1>
          <p className={styles.subtitle}>
            <strong>Daniel Zotti</strong>: {t("subtitle")}
          </p>
          <p>{t("description1")}</p>
          <p>
            {t("description2Start")}
            <em>
              <strong>{t("description2Bold")}</strong>
            </em>{" "}
            {t("description2End")}
          </p>
          <p className={styles.quote}>{t("quote")}</p>
        </header>

        <section className={styles.section}>
          <h2>{t("stageHeading")}</h2>
          <p className={styles.sectionIntro}>{t("stageSectionIntro")}</p>
          <div className={styles.grid}>
            {stageHighlights.map((item) => (
              <article className={styles.card} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t("creativeLabHeading")}</h2>
          <p className={styles.sectionIntro}>{t("creativeLabIntro")}</p>
          <div className={styles.grid}>
            {creativeLabHighlights.map((item) => (
              <article className={styles.card} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t("triestineHeartHeading")}</h2>
          <p className={styles.sectionIntro}>{t("triestineHeartIntro")}</p>
          <div className={styles.grid}>
            {triesteHighlights.map((item) => (
              <article className={styles.card} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t("eventsHeading")}</h2>
          <p className={styles.sectionIntro}>{t("eventsIntro")}</p>
          <div className={styles.grid}>
            {eventsAndSportHighlights.map((item) => (
              <article className={styles.card} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </InternalPageLayout>
  );
}
