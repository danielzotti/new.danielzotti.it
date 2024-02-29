'use client';

import styles from './page.module.scss';
import * as QRCode from 'qrcode-svg';
import { config } from 'src/config';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import logo from 'public/static/icons/icon-72x72.png';
import { BackButton } from 'src/components/back-button/back-button';

const createQrCode = (content: string) => new QRCode.default({
  content,
  color: config.colors.blue,
  background: config.colors.black,
  padding: 2,
  ecl: 'Q',
  container: 'svg-viewbox',
  predefined: false,
  join: false
}).svg();

const defaultValue = 'https://www.danielzotti.it/projects/qr-code-generator';

export default function QrCodePage() {

  const [svg, setSvg] = useState<string | undefined>(createQrCode(defaultValue));
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const input = useRef<HTMLTextAreaElement>(null);

  const generateQrCode = useCallback((content: string) => {
    if (!content) {
      setSvg(undefined);
      return;
    }
    try {
      setSvg(createQrCode(content));
    } catch (ex) {
      setErrorMessage('Oooops, there was an error!');
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <BackButton path={config.urls.projects} text={'Projects'} />
      <h1>QR Code generator</h1>
      <p>Many thanks to <a href='https://github.com/papnkukn/qrcode-svg' target='_blank'>qrcode-svg</a> by <a
        href='https://github.com/papnkukn' target='_blank'>papnkukn</a>.</p>
      <div className={styles.contentContainer}>
        <textarea className={styles.text}
          ref={input}
          defaultValue={defaultValue}
          onChange={(event) => generateQrCode(event.target.value)}
          placeholder='Write the text you want to store into the QR Code'
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {svg && <div>
          <h2>QR Code</h2>
          <div className={styles.svgContainer}>
            <Image alt='QR Code'
              className={styles.svg}
              width={250}
              height={250}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(svg || '')}`}
            />
            <Image className={styles.logo}
              src={logo}
              alt='Daniel Zotti Logo'
              width={72}
              height={72} />
          </div>
        </div>}
        {svg &&
          <div>
            <h2>SVG Code</h2>
            <div className={styles.svgCode}>
              <pre>{svg}</pre>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
