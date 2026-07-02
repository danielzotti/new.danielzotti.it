import styles from "./ambigram.module.scss";
import { getMarkdownContentByPath } from "src/utils/markdown";
import { Markdown } from "src/components/markdown/markdown";
import { Locale } from "src/i18n";

export const AmbigramIntro = ({ locale }: { locale: Locale }) => {
  const path = `${process.cwd()}/src/app/[locale]/projects/ambigram/content.md`;

  return (
    <Markdown className={styles.intro}>
      {getMarkdownContentByPath(path, locale)}
    </Markdown>
  );
};
