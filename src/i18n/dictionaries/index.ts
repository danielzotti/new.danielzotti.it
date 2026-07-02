import { en } from "./en";
import { it } from "./it";
import { Locale } from "../index";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  it,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.en;
};
