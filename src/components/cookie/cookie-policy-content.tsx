import styles from "./cookie-policy-content.module.scss";
import { Markdown } from "src/components/markdown/markdown";

export const CookiePolicyContent = ({ content }: { content: string }) => {
  return (
    <div className={styles.cookiePolicyContent}>
      <Markdown className={styles.intro}>{content}</Markdown>
    </div>
  );
};
