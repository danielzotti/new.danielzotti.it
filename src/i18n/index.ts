export const supportedLocales = ["en", "it"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (value?: string): value is Locale =>
  !!value && supportedLocales.includes(value as Locale);

export const getLocaleFromPathname = (pathname: string): Locale => {
  const maybeLocale = pathname.split("/")[1];
  if (isLocale(maybeLocale)) {
    return maybeLocale;
  }
  return defaultLocale;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const maybeLocale = pathname.split("/")[1];
  if (!isLocale(maybeLocale)) {
    return pathname;
  }
  const pathWithoutLocale = pathname.replace(`/${maybeLocale}`, "");
  return pathWithoutLocale || "/";
};

export const localizePath = (path: string, locale: Locale): string => {
  if (!path || path === "/") {
    return `/${locale}`;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const currentLocale = normalizedPath.split("/")[1];
  if (isLocale(currentLocale)) {
    return normalizedPath;
  }
  if (path.startsWith("/")) {
    return `/${locale}${path}`;
  }
  return `/${locale}/${path}`;
};

