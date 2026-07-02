import { AmbigramIntro } from "./components/ambigram-intro";
import { AmbigramWrapper } from "./components/ambigram-wrapper";
import { BackButton } from "src/components/back-button/back-button";
import { config } from "src/config";
import { Locale } from "src/i18n";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function AmbigramPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const ambigram = await getTranslations({ locale, namespace: "projects.ambigram" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": ambigram("jsonLdName"),
    "operatingSystem": "Web",
    "applicationCategory": "DesignApplication",
    "browserRequirements": "Requires HTML5, CSS3, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "author": {
      "@type": "Person",
      "name": "Daniel Zotti"
    },
    "description": ambigram("jsonLdDescription")
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbigramWrapper>
        <BackButton path={config.urls.projects} text={t("title")} />
        <AmbigramIntro locale={locale} />
      </AmbigramWrapper>
    </>
  );
}
