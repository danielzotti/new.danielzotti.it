"use client";

import {
  faCheck,
  faCopy,
  faExclamationTriangle,
  faLock,
  faTrash,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "src/shared/components/ui/button/button";
import { useTranslations } from "next-intl";
import styles from "../page.module.scss";

// Encoding helper - converts ASCII characters to invisible Unicode Tag characters
const encodeSecret = (secret: string): string => {
  let result = "";
  for (const char of secret) {
    const code = char.charCodeAt(0);
    result += String.fromCodePoint(code + 0xe0000);
  }
  return result;
};

// Translates the invisible characters into their visible counterparts, leaving regular characters alone
const translateHiddenChars = (text: string): string => {
  let result = "";
  const codePoints = Array.from(text);
  for (const char of codePoints) {
    const cp = char.codePointAt(0);
    if (cp && cp >= 0xe0000 && cp <= 0xe007f) {
      result += String.fromCodePoint(cp - 0xe0000);
    } else {
      result += char;
    }
  }
  return result;
};

// Check if string contains any hidden characters in the range
const hasHidden = (text: string): boolean => {
  const codePoints = Array.from(text);
  return codePoints.some((char) => {
    const cp = char.codePointAt(0);
    return cp && cp >= 0xe0000 && cp <= 0xe007f;
  });
};

export default function AsciiSmugglerClient() {
  const t = useTranslations("asciiSmuggler");

  const [mode, setMode] = useState<"decode" | "encode">("decode");
  const [decodeInput, setDecodeInput] = useState("");
  const [encodeNormalText, setEncodeNormalText] = useState("Visible text!");
  const [encodeSecretText, setEncodeSecretText] = useState("This is invisible");
  const [copied, setCopied] = useState(false);

  const decodedResult =
    mode === "decode" ? translateHiddenChars(decodeInput) : "";
  const hasHiddenChars = mode === "decode" ? hasHidden(decodeInput) : false;

  const handleClearDecode = () => {
    setDecodeInput("");
  };

  const handleClearEncode = () => {
    setEncodeNormalText("");
    setEncodeSecretText("");
    setCopied(false);
  };

  const getConcatenatedText = () => {
    if (!encodeSecretText) return encodeNormalText;
    return encodeNormalText + encodeSecret(encodeSecretText);
  };

  const handleCopyConcat = async () => {
    const fullText = getConcatenatedText();
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>{t("title")}</h1>

      <div className={styles.toggleContainer}>
        <Button
          variant={mode === "decode" ? "primary" : "clean"}
          onClick={() => setMode("decode")}
          className={styles.toggleButton}
        >
          <FontAwesomeIcon icon={faUnlock} /> {t("decodeMode")}
        </Button>
        <Button
          variant={mode === "encode" ? "primary" : "clean"}
          onClick={() => setMode("encode")}
          className={styles.toggleButton}
        >
          <FontAwesomeIcon icon={faLock} /> {t("encodeMode")}
        </Button>
      </div>

      <div className={styles.contentContainer}>
        {mode === "decode" ? (
          <>
            <div className={styles.textareaWrapper}>
              <label htmlFor="decode-input">{t("textToDecode")}</label>
              <textarea
                id="decode-input"
                className={styles.text}
                value={decodeInput}
                onChange={(e) => setDecodeInput(e.target.value)}
                placeholder={t("decodePlaceholder")}
              />
            </div>

            {hasHiddenChars && (
              <div className={styles.alert}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>{t("hiddenFound")}</span>
              </div>
            )}

            <div className={styles.textareaWrapper}>
              <label htmlFor="decode-output">{t("decodedResult")}</label>
              <textarea
                id="decode-output"
                className={`${styles.text} ${styles.readOnlyText}`}
                value={decodedResult}
                readOnly
                placeholder={t("decodedPlaceholder")}
              />
            </div>

            <div className={styles.actions}>
              <Button onClick={handleClearDecode} variant="outline">
                <FontAwesomeIcon icon={faTrash} /> {t("clearInput")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.textareaWrapper}>
              <label htmlFor="encode-normal">{t("carrierText")}</label>
              <textarea
                id="encode-normal"
                className={styles.text}
                value={encodeNormalText}
                onChange={(e) => setEncodeNormalText(e.target.value)}
                placeholder={t("carrierPlaceholder")}
              />
            </div>

            <div className={styles.textareaWrapper}>
              <label htmlFor="encode-secret">{t("secretText")}</label>
              <textarea
                id="encode-secret"
                className={styles.text}
                value={encodeSecretText}
                onChange={(e) => setEncodeSecretText(e.target.value)}
                placeholder={t("secretPlaceholder")}
              />
            </div>

            <div className={styles.actions}>
              <Button onClick={handleCopyConcat} variant="primary">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />{" "}
                {copied ? t("copied") : t("copy")}
              </Button>
              <Button onClick={handleClearEncode} variant="outline">
                <FontAwesomeIcon icon={faTrash} /> {t("clearFields")}
              </Button>
            </div>

            {encodeSecretText && (
              <div className={styles.previewBox}>
                <strong>{t("preview")}</strong>
                <div className={styles.previewText}>
                  {getConcatenatedText()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
