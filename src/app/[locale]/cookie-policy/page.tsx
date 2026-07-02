import { CookiePolicyContent } from "src/components/cookie/cookie-policy-content";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";
import { config } from "src/config";
import { Locale } from "src/i18n";
import { getMarkdownContentByPath } from "src/utils/markdown";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return buildMetadata({
    title: config.pageTitle("Cookie Policy"),
    description: "Cookie Policy of danielzotti.it website",
    path: config.urls.cookiePolicy,
    locale,
  });
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function CookiePolicyPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;
  const path = `${config.folders.contents}/cookie-policy.md`;
  const content = getMarkdownContentByPath(path, locale);
  return (
    <div>
      <CookiePolicyContent content={content} />
    </div>
  );
}
