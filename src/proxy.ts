import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "src/i18n";
import type { NextRequest } from "next/server";

const intlProxy = createMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: "always",
});

export function proxy(request: NextRequest) {
  return intlProxy(request);
}

export const config = {
  matcher: ["/", "/(en|it)/:path*", "/((?!_next|_vercel|.*\\..*|api).*)"],
};
