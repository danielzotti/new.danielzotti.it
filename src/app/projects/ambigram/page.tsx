import { AmbigramIntro } from "./components/ambigram-intro";
import { AmbigramWrapper } from "./components/ambigram-wrapper";
import { BackButton } from "src/components/back-button/back-button";
import { config } from "src/config";

export default function AmbigramPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ambigram Generator",
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
    "description": "An interactive Ambigram Generator tool that allows generating custom typographic ambigrams dynamically."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbigramWrapper>
        <BackButton path={config.urls.projects} text={"Projects"} />
        <AmbigramIntro />
      </AmbigramWrapper>
    </>
  );
}
