import { ReactNode } from "react";

import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle("ASCII Smuggler"),
  description: "Convert ASCII text to invisible Unicode Tag Characters or decode hidden messages",
  url: `${config.baseUrl}${config.urls.projects}/ascii-smuggler`,
});

export default function AsciiSmugglerLayout({ children }: { children: ReactNode }) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
