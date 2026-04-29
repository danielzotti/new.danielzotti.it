"use client";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import logo from "public/static/icons/icon-72x72.png";
import QRCode from "qrcode-svg";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { BackButton } from "src/components/back-button/back-button";
import { config } from "src/config";
import { Button } from "src/shared/components/ui/button/button";
import styles from "./page.module.scss";

const defaultQrColor = "#000"; //config.colors.black;
const defaultBgColor = "#FFF"; // config.colors.white;

const createQrCode = (content: string, color: string, background: string) =>
  new QRCode({
    content,
    color,
    background,
    padding: 2,
    ecl: "Q",
    container: "svg-viewbox",
    predefined: false,
    join: false,
  }).svg();

const defaultValue = "https://www.danielzotti.it/projects/qr-code-generator";

export default function QrCodePage() {
  const [svg, setSvg] = useState<string | undefined>(
    createQrCode(defaultValue, defaultQrColor, defaultBgColor),
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [qrColor, setQrColor] = useState(defaultQrColor);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [showLogo, setShowLogo] = useState(true);
  const [customLogoSrc, setCustomLogoSrc] = useState<string | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateQrCode = useCallback(
    (content: string, color: string, background: string) => {
      if (!content) {
        setSvg(undefined);
        return;
      }
      try {
        setSvg(createQrCode(content, color, background));
        setErrorMessage(undefined);
      } catch {
        setErrorMessage("Oooops, there was an error!");
      }
    },
    [],
  );

  const handleLogoUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomLogoSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const getLogoSourceForExport = useCallback(async () => {
    if (customLogoSrc) {
      return customLogoSrc;
    }

    try {
      const response = await fetch(logo.src);
      const blob = await response.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string) || logo.src);
        reader.onerror = () => reject(new Error("Unable to read logo blob"));
        reader.readAsDataURL(blob);
      });
    } catch {
      // Fallback: keep the runtime URL when we cannot inline it as data URL.
      return logo.src;
    }
  }, [customLogoSrc]);

  const downloadSvg = useCallback(async () => {
    if (!svg) return;

    let svgForDownload = svg;
    if (showLogo) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, "image/svg+xml");
      const root = doc.documentElement;
      const viewBox = root.getAttribute("viewBox")?.split(/\s+/).map(Number);
      const x0 = viewBox?.[0] ?? 0;
      const y0 = viewBox?.[1] ?? 0;
      const width = viewBox?.[2] ?? 256;
      const height = viewBox?.[3] ?? 256;
      const logoSize = Math.min(width, height) * 0.2;
      const logoHref = await getLogoSourceForExport();

      const imageEl = doc.createElementNS(
        "http://www.w3.org/2000/svg",
        "image",
      );
      imageEl.setAttribute("href", logoHref);
      imageEl.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        logoHref,
      );
      imageEl.setAttribute("x", String(x0 + (width - logoSize) / 2));
      imageEl.setAttribute("y", String(y0 + (height - logoSize) / 2));
      imageEl.setAttribute("width", String(logoSize));
      imageEl.setAttribute("height", String(logoSize));
      imageEl.setAttribute("preserveAspectRatio", "xMidYMid meet");

      root.appendChild(imageEl);
      svgForDownload = new XMLSerializer().serializeToString(doc);
    }

    const blob = new Blob([svgForDownload], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [svg, showLogo, getLogoSourceForExport]);

  const downloadPng = useCallback(() => {
    if (!svg) return;
    const size = 800;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const triggerDownload = (cvs: HTMLCanvasElement) => {
      cvs.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    const drawLogoAndDownload = () => {
      if (!showLogo) {
        triggerDownload(canvas);
        return;
      }
      const logoSrc = customLogoSrc || logo.src;
      const logoImg = new globalThis.Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = () => {
        // Calculate max box size (20% of canvas)
        const maxLogoSize = size * 0.2;

        // Calculate dimensions preserving aspect ratio
        const aspectRatio = logoImg.width / logoImg.height;
        let logoWidth = maxLogoSize;
        let logoHeight = maxLogoSize;

        if (aspectRatio > 1) {
          // wider than tall
          logoHeight = maxLogoSize / aspectRatio;
        } else {
          // taller than wide
          logoWidth = maxLogoSize * aspectRatio;
        }

        // Center the logo in the square area
        const logoX = (size - logoWidth) / 2;
        const logoY = (size - logoHeight) / 2;

        ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
        triggerDownload(canvas);
      };
      logoImg.onerror = () => {
        setErrorMessage("Impossibile caricare il logo per l'export PNG.");
        triggerDownload(canvas);
      };
      logoImg.src = logoSrc;
    };

    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const svgImg = new globalThis.Image();
    svgImg.onload = () => {
      ctx.drawImage(svgImg, 0, 0, size, size);
      drawLogoAndDownload();
    };
    svgImg.onerror = () => {
      setErrorMessage("Impossibile generare il PNG dal QR Code.");
    };
    svgImg.src = svgDataUrl;
  }, [svg, showLogo, customLogoSrc]);

  return (
    <div className={styles.pageContainer}>
      <BackButton path={config.urls.projects} text={"Projects"} />
      <h1>QR Code generator</h1>
      <p>
        Many thanks to{" "}
        <a href="https://github.com/papnkukn/qrcode-svg" target="_blank">
          qrcode-svg
        </a>{" "}
        by{" "}
        <a href="https://github.com/papnkukn" target="_blank">
          papnkukn
        </a>
        .
      </p>
      <div className={styles.contentContainer}>
        <textarea
          className={styles.text}
          ref={input}
          defaultValue={defaultValue}
          onChange={(event) =>
            generateQrCode(event.target.value, qrColor, bgColor)
          }
          placeholder="Write the text you want to store into the QR Code"
        />

        <div className={styles.options}>
          <div className={styles.colorOptions}>
            <label className={styles.colorLabel}>
              <span>QR Code</span>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setQrColor(newColor);
                  generateQrCode(
                    input.current?.value ?? defaultValue,
                    newColor,
                    bgColor,
                  );
                }}
              />
            </label>
            <label className={styles.colorLabel}>
              <span>Background</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
                  const newBg = e.target.value;
                  setBgColor(newBg);
                  generateQrCode(
                    input.current?.value ?? defaultValue,
                    qrColor,
                    newBg,
                  );
                }}
              />
            </label>
          </div>

          <div className={styles.logoOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showLogo}
                onChange={(e) => setShowLogo(e.target.checked)}
              />
              <span>Show logo</span>
            </label>
            {showLogo && (
              <div className={styles.logoUpload}>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {customLogoSrc ? "Change logo" : "Upload custom logo (PNG)"}
                </Button>
                {customLogoSrc && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCustomLogoSrc(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Restore default logo
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png"
                  className={styles.hiddenInput}
                  onChange={handleLogoUpload}
                />
              </div>
            )}
          </div>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {svg && (
          <div>
            <h2>QR Code</h2>
            <div className={styles.svgContainer}>
              <Image
                alt="QR Code"
                className={styles.svg}
                width={400}
                height={400}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                unoptimized
              />
              {showLogo &&
                (customLogoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.logo}
                    src={customLogoSrc}
                    alt="Logo personalizzato"
                    width={72}
                    height={72}
                  />
                ) : (
                  <Image
                    className={styles.logo}
                    src={logo}
                    alt="Daniel Zotti Logo"
                    width={72}
                    height={72}
                  />
                ))}
            </div>
            <div className={styles.downloadButtons}>
              <Button variant="outline" onClick={downloadSvg}>
                <FontAwesomeIcon icon={faDownload} /> Download SVG
              </Button>
              <Button variant="outline" onClick={downloadPng}>
                <FontAwesomeIcon icon={faDownload} /> Download PNG
              </Button>
            </div>
          </div>
        )}

        {svg && (
          <div>
            <h2>SVG Code</h2>
            <div className={styles.svgCode}>
              <pre>{svg}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
