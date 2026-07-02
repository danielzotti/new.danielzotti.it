import { getTranslations } from "next-intl/server";
import { BackButton } from "src/components/back-button/back-button";
import { config } from "src/config";
import { Markdown } from "src/components/markdown/markdown";
import { Locale } from "src/i18n";
import { getMarkdownContentByPath } from "src/utils/markdown";
import AsciiSmugglerClient from "./components/ascii-smuggler-client";
import styles from "./page.module.scss";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function AsciiSmugglerPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "asciiSmuggler" });
  const markdownPath = `${process.cwd()}/src/app/[locale]/projects/ascii-smuggler/content.md`;
  const markdown = getMarkdownContentByPath(markdownPath, locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t("title"),
    operatingSystem: "Web",
    applicationCategory: "SecurityApplication",
    browserRequirements: "Requires HTML5, CSS3, JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Person",
      name: "Daniel Zotti",
    },
    description: t("jsonLdDescription"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackButton path={config.urls.projects} text={t("back")} />
      <AsciiSmugglerClient />
      <br />
      <Markdown className={styles.infoSection}>{markdown}</Markdown>
    </>
  );
}
