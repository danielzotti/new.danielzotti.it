'use client';
import path from 'path';
import {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import styles from './ambigram.module.scss';

interface AmbigramProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
  startOffset?: number;
}

export const Ambigram = ({
  scrollContainerRef,
  startOffset = 0
}: AmbigramProps) => {
  const svg = useRef<SVGSVGElement>(null);
  const danielGroup = useRef<SVGGElement>(null);
  const letterD = useRef<SVGPathElement>(null);
  const letterA = useRef<SVGPathElement>(null);
  const letterNI = useRef<SVGPathElement>(null);
  const letterE = useRef<SVGPathElement>(null);
  const letterL = useRef<SVGPathElement>(null);
  const dot1 = useRef<SVGPathElement>(null);
  const dot2 = useRef<SVGPathElement>(null);

  const [isFilled, setIsFilled] = useState<boolean>(false);
  // const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  // const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [letters] = useState<Array<RefObject<SVGPathElement>>>([
    letterD,
    letterA,
    letterNI,
    letterE,
    letterL,
    dot1,
    dot2
  ]);

  const getScrollPercentage = useCallback(() => {
    if (!scrollContainerRef.current) {
      return 0;
    }
    const container = scrollContainerRef.current;
    return (
      (container.scrollTop - startOffset) /
      (container.scrollHeight - container.clientHeight - startOffset)
    );
  }, [scrollContainerRef, startOffset]);

  const drawPath = useCallback(
    (letter: RefObject<SVGPathElement>, percentageEnd = 0.5) => {
      if (!letter.current) {
        return;
      }
      const scrollPercentage = getScrollPercentage();

      const path = letter.current;
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength} ${pathLength}`;

      if (scrollPercentage < 0) {
        path.style.strokeDashoffset = `${pathLength}`;
        return;
      }

      const drawLength = pathLength * (scrollPercentage / percentageEnd);
      path.style.strokeDashoffset = `${
        pathLength - drawLength > 0 ? pathLength - drawLength : 0
      }`;
    },
    [getScrollPercentage]
  );

  const rotateSvg = useCallback(
    (svgGroup: RefObject<SVGGElement>, offsetPercentage = 0.5) => {
      if (!svgGroup.current) {
        return;
      }
      const group = svgGroup.current;
      const scrollPercentage = getScrollPercentage();

      const rotationPercentage =
        (scrollPercentage - offsetPercentage) / (1 - offsetPercentage);

      if (scrollPercentage > offsetPercentage && rotationPercentage < 1) {
        group.setAttribute(
          'transform',
          `scale(0.9) rotate(${180 * rotationPercentage})`
        );
      } else {
        group.setAttribute('transform', 'scale(0.9) rotate(0)');
      }
    },
    [getScrollPercentage]
  );

  const fillPath = useCallback(
    (offsetPercentage = 0.5) => {
      const scrollPercentage = getScrollPercentage();
      if (scrollPercentage > offsetPercentage) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    },
    [getScrollPercentage]
  );

  useEffect(() => {
    letters.forEach((l) => drawPath(l, 1));

    scrollContainerRef.current?.addEventListener('scroll', () => {
      if (!svg.current) {
        return;
      }
      svg.current.style.display = 'block';
      letters.forEach((l) => drawPath(l, 0.4));
      fillPath(0.5);
      rotateSvg(danielGroup, 0.6);
    });
  }, [
    scrollContainerRef,
    drawPath,
    rotateSvg,
    fillPath,
    letters,
    getScrollPercentage
  ]);

  return (
    <svg
      id='daniel-ambigram-svg'
      ref={svg}
      className={styles.ambigramContainer}
      xmlns='http://www.w3.org/2000/svg'
      width='426.24'
      height='115.74'
      viewBox='0 0 426.24 115.74'
      display='none'
    >
      <g
        id='daniel'
        className={`${styles.ambigramGroup} ${isFilled ? styles.filled : ''}`}
        ref={danielGroup}
      >
        <path
          id='l'
          className={styles.letter}
          ref={letterL}
          d='m426.24,94.66v18.93h-56.14c-6.8,0-17.37-1.29-22.64-5.2-5.26-3.92-7.89-7.99-10.97-16.54-1.7-4.72-2.3-10.98-2.34-17.85-.01-.29-.01-.57-.01-.85V26.34h.01c0-5.12,3.99-9.03,8.37-11.5,5.76-3.26,13.45-3.64,20.22-3.64h26v66.25h-17.11V26.34h-19.28v45.77c0,6.59.53,12.32,2.52,16.01,3.37,6.25,11.32,6.54,17.85,6.54h53.52Z'
        />
        <path
          id='e'
          className={styles.letter}
          ref={letterE}
          d='m274.93,84.22c4.45,4.18,8.02,5.21,20.35,5.21,7.87,0,1.23,0,21.75,0l.09-12.16c-18.61,0-14.9-.02-19.21-.02-4.63,0-6.95-.84-8.92-2.69-1.98-1.85-2.97-4.32-2.97-7.4v-1.13c2.93,0,4.71.04,7.18.04,2.15,0,4.47-.06,7.12-.06,7.63,0,13.75-1.86,18.36-5.58,4.61-3.72,6.91-8.66,6.91-14.82,0-5.82-2.06-10.44-6.17-13.87-4.11-3.43-9.59-5.14-16.43-5.14-4.4,0-5.38,0-10.91.43-3.95.31-8.82,1.75-10.49,2.52-1.51.7-5.98,3.8-8.11,6.33-1.53,1.81-4.68,5.17-4.68,11.22v16.89c0,8.75,1.7,16.05,6.15,20.23Zm10.97-37.28c0-4.62,6.12-8.37,10.74-8.37h5.01c4.62,0,8.37,3.75,8.37,8.37s-3.75,8.37-8.37,8.37h-15.75v-8.37Z'
        />
        <path
          id='dot2'
          className={styles.letter}
          ref={dot2}
          d='m260.23,9.89c0,2.87-.98,5.24-2.93,7.12-1.95,1.88-4.27,2.82-6.96,2.82s-5.06-.98-7.01-2.93c-1.95-1.95-2.93-4.29-2.93-7.01s.98-5.01,2.93-6.96c1.95-1.95,4.29-2.93,7.01-2.93s5.01.98,6.96,2.93c1.95,1.95,2.93,4.27,2.93,6.96Z'
        />
        <path
          id='ni'
          className={styles.letter}
          ref={letterNI}
          d='m166.08,89.46l-.07-63.18h19.83v6.71c5.6-4.22,11.35-6.45,17.24-6.69.34-.02.69-.02,1.03-.02,6.21,0,10.91,1.97,14.12,5.9,2.98,3.66,4.57,8.97,4.78,15.93v16.32c0,.4.01.79.03,1.16.11,2.33.54,4.08,1.31,5.22.89,1.32,2.38,1.98,4.48,1.98,3.8,0,7.61-1.36,11.45-4.09v-28.06h0v-14.36h19.88v63.19h-19.88v-6.71c-5.6,4.22-11.35,6.45-17.24,6.68-.34.02-.69.02-1.03.02-6.21,0-10.91-1.96-14.12-5.9-2.98-3.66-4.57-8.97-4.78-15.93v-16.31c0-.4-.01-.79-.03-1.16-.11-2.33-.54-4.08-1.31-5.22-.89-1.33-2.38-1.99-4.48-1.99-3.8,0-7.61,1.37-11.45,4.1v28.06h0v14.36h-19.76Z'
        />
        <path
          id='dot1'
          className={styles.letter}
          ref={dot1}
          d='m185.91,105.8c0,2.87-.98,5.24-2.93,7.12-1.95,1.88-4.27,2.82-6.96,2.82s-5.06-.98-7.01-2.93c-1.95-1.95-2.93-4.29-2.93-7.01s.98-5.01,2.93-6.96c1.95-1.95,4.29-2.93,7.01-2.93s5.01.98,6.96,2.93c1.95,1.95,2.93,4.27,2.93,6.96Z'
        />
        <path
          id='a'
          className={styles.letter}
          ref={letterA}
          d='m151.31,31.81c-4.45-4.18-8.02-5.21-20.35-5.21-7.87,0-1.23,0-21.75,0l-.09,12.16c18.61,0,14.9.02,19.21.02,4.63,0,6.95.84,8.92,2.69,1.98,1.85,2.97,4.32,2.97,7.4v1.13c-2.93,0-4.71-.04-7.18-.04-2.15,0-4.47.06-7.12.06-7.63,0-13.75,1.86-18.36,5.58-4.61,3.72-6.91,8.66-6.91,14.82,0,5.82,2.06,10.44,6.17,13.87,4.11,3.43,9.59,5.14,16.43,5.14,4.4,0,5.38,0,10.91-.43,3.95-.31,8.82-1.75,10.49-2.52,1.51-.7,5.98-3.8,8.11-6.33,1.53-1.81,4.68-5.17,4.68-11.22v-16.89c0-8.75-1.7-16.05-6.15-20.23Zm-10.97,37.28c0,4.62-6.12,8.37-10.74,8.37h-5.01c-4.62,0-8.37-3.75-8.37-8.37s3.75-8.37,8.37-8.37h15.75v8.37Z'
        />
        <path
          id='d'
          className={styles.letter}
          ref={letterD}
          d='m92.1,42.76v46.8h0c0,5.12-3.99,9.03-8.37,11.5-5.76,3.26-13.45,3.65-20.22,3.65h-26V38.45h17.11v51.11h19.28v-45.77c0-6.59-.53-12.31-2.52-16-3.37-6.26-11.32-6.55-17.85-6.55H0V2.32h56.14c6.8,0,17.37,1.28,22.64,5.2,5.26,3.92,7.89,7.99,10.97,16.54,1.7,4.71,2.3,10.98,2.34,17.85,0,.28,0,.56,0,.85Z'
        />
      </g>
    </svg>
  );
};
