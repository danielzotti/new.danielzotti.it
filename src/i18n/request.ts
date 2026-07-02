import { getRequestConfig } from "next-intl/server";
import enMessages from "../../public/messages/en.json";
import itMessages from "../../public/messages/it.json";
const messages = {
  en: enMessages,
  it: itMessages,
};
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale: locale || "en",
    messages: messages[(locale as "en" | "it") || "en"],
  };
});
