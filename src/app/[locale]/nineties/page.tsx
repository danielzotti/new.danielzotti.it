import styles from "./page.module.scss";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { config } from "src/config";
import { Metadata } from "next";
import { NinetiesActivator } from "./nineties-activator";
import { buildMetadata } from "src/utils/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "nineties" });
  return {
    ...buildMetadata({
      title: config.pageTitle(t("title")),
      description: t("description"),
      path: "/nineties",
      locale: locale as "en" | "it",
    }),
    robots: {
      index: false,
    },
  };
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return config.locales.supported.map((locale) => ({
    locale,
  }));
}

export default async function NinetiesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "nineties" });

  return (
    <InternalPageLayout>
      <NinetiesActivator />
      <h1>90&apos;s</h1>
      <div className={styles.nineties}>🕺🏻</div>
       <div className={styles.ninetiesText}>
         <h3>
           {t("found")}
           <strong>
             <em>{t("page_part")}</em>
           </strong>{" "}
           {t("page_suffix")}
         </h3>
       </div>
    </InternalPageLayout>
  );
}
