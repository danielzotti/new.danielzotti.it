"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./cookie-manager.module.scss";
import { getCookie, setCookie } from "src/utils/cookie";
import { config } from "src/config";
import { Button } from "src/shared/components/ui/button/button";
import { useTranslations } from "next-intl";

interface CookieManagerProps {
  policy: ReactNode;
}

export const CookieManager = ({ policy }: CookieManagerProps) => {
  const t = useTranslations("cookieManager");
  const [hasRepliedToCookie, setHasRepliedToCookie] = useState<
    boolean | undefined
  >(undefined);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasRepliedToCookie(!!getCookie(config.cookieAccept));
  }, []);

  const handleLearnMore = useCallback(() => {
    setIsCookiePolicyOpen(true);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.overflow = "hidden";
    }
  }, []);

  const handleCloseLearnMore = useCallback(() => {
    setIsCookiePolicyOpen(false);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.overflow = "unset";
    }
  }, []);

  const handleReply = useCallback((hasAccepted: "true" | "false") => {
    setCookie(config.cookieAccept, hasAccepted);
    setCookie(config.cookieDate, new Date().toString());
    setHasRepliedToCookie(true);
    setIsCookiePolicyOpen(false);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.overflow = "unset";
    }
  }, []);

  const handleReject = useCallback(() => {
    handleReply("false");
  }, [handleReply]);

  const handleAccept = useCallback(() => {
    handleReply("true");
  }, [handleReply]);

  const text = t.rich("text", {
    policyLink: (chunks) => (
      <button
        className={styles.policyLink}
        onClick={handleLearnMore}
        type="button"
      >
        {chunks}
      </button>
    ),
  });

  if (hasRepliedToCookie === undefined || hasRepliedToCookie) {
    return <></>;
  }

  return (
    <div className={styles.pageContainer}>
      {isCookiePolicyOpen && (
        <div className={styles.cookiePolicyContainer}>
          <div className={styles.cookiePolicyContentContainer}>
            <div className={styles.closeButton}>
              <Button variant="secondary" onClick={handleCloseLearnMore}>
                {t("close")}
              </Button>
            </div>
            <div className={styles.cookiePolicyContent}>{policy}</div>
            <div className={styles.buttonContainer}>
              <Button variant="secondary" onClick={handleReject}>
                {t("reject")}
              </Button>
              <Button onClick={handleAccept}>{t("accept")}</Button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.bannerContainer}>
        <div className="container">
          <p>{text}</p>
          <div className={styles.buttonContainer}>
            <Button variant="outline" onClick={handleReject}>
              {t("reject")}
            </Button>
            <Button onClick={handleAccept}>{t("accept")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
