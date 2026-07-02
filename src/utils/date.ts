import type { Locale } from "src/i18n";

const localeToBcp47: Record<Locale, string> = {
  en: "en-GB",
  it: "it-IT",
};

export const toFormattedDate = (date: Date | string, locale: Locale = "en") => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString(localeToBcp47[locale], {
    day: "2-digit",
    month: "short", // '2-digit',
    year: "numeric",
  });
};

export const toFormattedDateTime = (
  date: Date | string,
  locale: Locale = "en",
) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString(localeToBcp47[locale], {
    day: "2-digit",
    month: "short", // '2-digit',
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
