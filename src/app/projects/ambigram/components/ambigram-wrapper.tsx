'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from '../page.module.scss';
import { Ambigram } from './ambigram';
import { Footer } from 'src/components/footer/footer';

interface AmbigramWrapperProps {
  children: ReactNode;
}

export const AmbigramWrapper = ({ children }: AmbigramWrapperProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const [startOffset, setStartOffset] = useState(0);

  useEffect(() => {
    const adjustRatio = 0.75;
    setStartOffset((scrollContentRef.current?.offsetTop || 0) * adjustRatio);

    window.addEventListener('resize', () => {
      setStartOffset((scrollContentRef.current?.offsetTop || 0) * adjustRatio);
    });

  }, []);

  return (
    <div className={styles.pageContainer} ref={scrollContainerRef}>
      <div className={styles.textContainer}>
        <div className={styles.text}>{children}</div>
      </div>
      <div className={styles.ambigramContainer} ref={scrollContentRef}>
        <Ambigram
          scrollContainerRef={scrollContainerRef}
          startOffset={startOffset}
        />
      </div>
      <Footer />
    </div>
  );
};
