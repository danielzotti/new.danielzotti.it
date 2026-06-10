"use client";

import { faCheck, faCopy, faExclamationTriangle, faLock, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BackButton } from "src/components/back-button/back-button";
import { config } from "src/config";
import { Button } from "src/shared/components/ui/button/button";
import styles from "./page.module.scss";

// Encoding helper - converts ASCII characters to invisible Unicode Tag characters
const encodeSecret = (secret: string): string => {
  let result = "";
  for (const char of secret) {
    const code = char.charCodeAt(0);
    result += String.fromCodePoint(code + 0xE0000);
  }
  return result;
};

// Translates the invisible characters into their visible counterparts, leaving regular characters alone
const translateHiddenChars = (text: string): string => {
  let result = "";
  const codePoints = Array.from(text);
  for (const char of codePoints) {
    const cp = char.codePointAt(0);
    if (cp && cp >= 0xE0000 && cp <= 0xE007F) {
      result += String.fromCodePoint(cp - 0xE0000);
    } else {
      result += char;
    }
  }
  return result;
};

// Check if string contains any hidden characters in the range
const hasHidden = (text: string): boolean => {
  const codePoints = Array.from(text);
  return codePoints.some(char => {
    const cp = char.codePointAt(0);
    return cp && cp >= 0xE0000 && cp <= 0xE007F;
  });
};


export default function AsciiSmugglerPage() {
  const [mode, setMode] = useState<"decode" | "encode">("decode");

  // Decode mode states
  const [decodeInput, setDecodeInput] = useState("");
  const [decodedResult, setDecodedResult] = useState("");
  const [hasHiddenChars, setHasHiddenChars] = useState(true);

  // Encode mode states
  const [encodeNormalText, setEncodeNormalText] = useState("Visible text!");
  const [encodeSecretText, setEncodeSecretText] = useState("This is invisible");
  const [copied, setCopied] = useState(false);

  // Automatic decode logic on change
  useEffect(() => {
    if (mode === "decode") {
      setDecodedResult(translateHiddenChars(decodeInput));
      setHasHiddenChars(hasHidden(decodeInput));
    }
  }, [decodeInput, mode]);

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
      <BackButton path={config.urls.projects} text={"Projects"} />
      <h1>ASCII Smuggler</h1>

      {/* Mode Switcher */}
      <div className={styles.toggleContainer}>
        <Button
          variant={mode === "decode" ? "primary" : "clean"}
          onClick={() => setMode("decode")}
          className={styles.toggleButton}
        >
          <FontAwesomeIcon icon={faUnlock} /> Decode Mode
        </Button>
        <Button
          variant={mode === "encode" ? "primary" : "clean"}
          onClick={() => setMode("encode")}
          className={styles.toggleButton}
        >
          <FontAwesomeIcon icon={faLock} /> Encode Mode
        </Button>
      </div>

      <div className={styles.contentContainer}>
        {mode === "decode" ? (
          /* DECODE MODE */
          <>
            <div className={styles.textareaWrapper}>
              <label htmlFor="decode-input">Text to Decode</label>
              <textarea
                id="decode-input"
                className={styles.text}
                value={decodeInput}
                onChange={(e) => setDecodeInput(e.target.value)}
                placeholder="Paste the text here to search for hidden payloads..."
              />
            </div>

            {hasHiddenChars && (
              <div className={styles.alert}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>Hidden Unicode Tag Characters discovered.</span>
              </div>
            )}

            <div className={styles.textareaWrapper}>
              <label htmlFor="decode-output">Decoded Result</label>
              <textarea
                id="decode-output"
                className={`${styles.text} ${styles.readOnlyText}`}
                value={decodedResult}
                readOnly
                placeholder="Decoded text with hidden tags shown..."
              />
            </div>

            <div className={styles.actions}>
              <Button onClick={handleClearDecode} variant="outline">
                <FontAwesomeIcon icon={faTrash} /> Clear Input
              </Button>
            </div>
          </>
        ) : (
          /* ENCODE MODE */
          <>
            <div className={styles.textareaWrapper}>
              <label htmlFor="encode-normal">Normal Carrier Text (Visible text)</label>
              <textarea
                id="encode-normal"
                className={styles.text}
                value={encodeNormalText}
                onChange={(e) => setEncodeNormalText(e.target.value)}
                placeholder="e.g. How are you?"
              />
            </div>

            <div className={styles.textareaWrapper}>
              <label htmlFor="encode-secret">Secret Text to Smuggle (Will be hidden at the end)</label>
              <textarea
                id="encode-secret"
                className={styles.text}
                value={encodeSecretText}
                onChange={(e) => setEncodeSecretText(e.target.value)}
                placeholder="Enter secret message to hide here..."
              />
            </div>

            <div className={styles.actions}>
              <Button onClick={handleCopyConcat} variant="primary">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} /> {copied ? "Copied concatenated text!" : "Copy Concatenated Text"}
              </Button>
              <Button onClick={handleClearEncode} variant="outline">
                <FontAwesomeIcon icon={faTrash} /> Clear Fields
              </Button>
            </div>

            {encodeSecretText && (
              <div className={styles.previewBox}>
                <strong>Concatenated Preview (Hidden text is embedded and invisible):</strong>
                <div className={styles.previewText}>{getConcatenatedText()}</div>
              </div>
            )}
          </>
        )}

        <div className={styles.infoSection}>
          <h3>What is ASCII Smuggling?</h3>
          <p>
            ASCII Smuggling is a technique that hides text within Unicode characters that do not render visually in standard fonts. Specifically, it uses characters from the <strong>Unicode Tags Block (U+E0000–U+E007F)</strong>, which map 1:1 to the standard ASCII character set.
          </p>
          <h3>Why is it a security issue?</h3>
          <ul>
            <li>
              <strong>Indirect Prompt Injection:</strong> An attacker can embed hidden instructions on a webpage or within a document. When a Large Language Model (LLM) parses the page, the model's tokenizer decodes these characters and processes the hidden instructions, while a human reading the same page sees only the benign text.
            </li>
            <li>
              <strong>Data Exfiltration:</strong> Sensitive information could be encoded as invisible characters and smuggled out of a secure environment past data loss prevention (DLP) systems.
            </li>
          </ul>
          <h3>How to defend against it?</h3>
          <p>
            Sanitize all inputs processed by LLMs or rendering engines. Ensure that characters within the Unicode Tags block (U+E0000 to U+E007F) are stripped out or neutralized before processing.
          </p>
        </div>
      </div>
    </div>
  );
}
