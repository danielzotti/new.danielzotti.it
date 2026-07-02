import { config } from "src/config";
import QrCodePageClient from "./components/qr-code-page-client";

export const dynamic = "force-static";

export function generateStaticParams() {
  return config.locales.supported.map((locale) => ({ locale }));
}

export default function QrCodePage() {
  return <QrCodePageClient />;
}
