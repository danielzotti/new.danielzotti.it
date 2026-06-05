"use client";

import { useEffect, useRef, useState } from "react";
import type { TransitionEventHandler } from "react";
import Image from "next/image";
import {
  getGhostbustersStorageDay,
  GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY,
  GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT,
  GHOSTBUSTERS_MANUAL_ACTIVATION_KEY,
  isGhostbustersDay,
  isGhostbustersManuallyActivatedToday,
} from "../../../utils/ghostbusters";
import styles from "./ghostbusters.module.scss";

const SLIMER_BASE_SIZE = 150; // base height in px
const CAUGHT_KEY = "ghostbusters-slimer-caught";
const CAUGHT_DATE_KEY = "ghostbusters-slimer-caught-date";

// Scale oscillates between these two extremes smoothly
const SCALE_MIN = 0.55;
const SCALE_MAX = 1.55;

type Position = { x: number; y: number };

export const Ghostbusters = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [isCaught, setIsCaught] = useState<boolean>(false);
  const [isCatching, setIsCatching] = useState<boolean>(false);
  const [isTrapMovingToButton, setIsTrapMovingToButton] =
    useState<boolean>(false);
  const [isTrapFadingOut, setIsTrapFadingOut] = useState<boolean>(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [trapPos, setTrapPos] = useState<Position | null>(null);
  const frameRef = useRef<number | null>(null);
  const catchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trapFinalizeRef = useRef<boolean>(false);
  const trapFadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCaughtRef = useRef<boolean>(false);
  const velRef = useRef({
    vx: (2 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1),
    vy: (2 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1),
  });
  // Scale sinusoid: phase (radians) and speed (rad/frame)
  const scalePhaseRef = useRef<number>(Math.random() * Math.PI * 2);
  const scaleSpeedRef = useRef<number>(0.008 + Math.random() * 0.012);
  // Random steering accumulator (frames until next big direction change)
  const steerCountdownRef = useRef<number>(60 + Math.floor(Math.random() * 80));

  const getRandomPosition = (): Position => ({
    x: Math.random() * Math.max(1, window.innerWidth - SLIMER_BASE_SIZE),
    y: Math.random() * Math.max(1, window.innerHeight - SLIMER_BASE_SIZE),
  });

  const startAnimation = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(animateSlimer);
  };

  const stopAnimation = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const playTrapSound = () => {
    try {
      const Ctor =
        globalThis.AudioContext ||
        (globalThis as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!Ctor) {
        return;
      }

      const audioContext = new Ctor();
      const now = audioContext.currentTime;
      const beeps = [
        { freq: 800, start: now, duration: 0.1 },
        { freq: 1200, start: now + 0.12, duration: 0.1 },
        { freq: 600, start: now + 0.24, duration: 0.15 },
        { freq: 1400, start: now + 0.4, duration: 0.1 },
      ];

      beeps.forEach(({ freq, start, duration }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);

        osc.start(start);
        osc.stop(start + duration);
      });
    } catch {
      // Ignore audio failures silently (browser policy / unsupported APIs)
    }
  };

  const animateSlimer = () => {
    if (isCaughtRef.current) return;

    // --- Scale oscillation (smooth sine wave between SCALE_MIN and SCALE_MAX) ---
    scalePhaseRef.current += scaleSpeedRef.current;
    // Randomly vary the speed slightly every frame for extra randomness
    if (Math.random() > 0.97) {
      scaleSpeedRef.current = 0.006 + Math.random() * 0.016;
    }
    const newScale =
      SCALE_MIN +
      ((Math.sin(scalePhaseRef.current) + 1) / 2) * (SCALE_MAX - SCALE_MIN);
    setScale(newScale);

    // Current effective size used for boundary check
    const effectiveSize = SLIMER_BASE_SIZE * newScale;

    // --- Position update ---
    setPos((prev) => {
      let newX = prev.x + velRef.current.vx;
      let newY = prev.y + velRef.current.vy;

      // Scheduled big random steering (more chaotic than the old 4% chance)
      steerCountdownRef.current -= 1;
      if (steerCountdownRef.current <= 0) {
        // Apply a strong random impulse
        velRef.current.vx += (Math.random() - 0.5) * 4;
        velRef.current.vy += (Math.random() - 0.5) * 4;
        // Clamp speed: min 1.5 max 5.5 to stay energetic but not too wild
        const clamp = (v: number) =>
          Math.sign(v) * Math.min(5.5, Math.max(1.5, Math.abs(v)));
        velRef.current.vx = clamp(velRef.current.vx);
        velRef.current.vy = clamp(velRef.current.vy);
        // Next steering in 40-120 frames
        steerCountdownRef.current = 40 + Math.floor(Math.random() * 80);
      }

      // Micro-jitter every frame (subtle wobble)
      if (Math.random() > 0.7) {
        velRef.current.vx += (Math.random() - 0.5) * 0.3;
        velRef.current.vy += (Math.random() - 0.5) * 0.3;
      }

      // Bounce off edges using the current scaled size
      if (newX < 0 || newX > window.innerWidth - effectiveSize) {
        velRef.current.vx *= -1;
        newX = Math.max(0, Math.min(newX, window.innerWidth - effectiveSize));
      }
      if (newY < 0 || newY > window.innerHeight - effectiveSize) {
        velRef.current.vy *= -1;
        newY = Math.max(0, Math.min(newY, window.innerHeight - effectiveSize));
      }

      return { x: newX, y: newY };
    });

    frameRef.current = requestAnimationFrame(animateSlimer);
  };

  const getTrapTargetPos = (): Position => ({
    // Center above the button (buttonContainer is at bottom: 45px, left: 50%)
    // Trap size is 280×182 px
    x: window.innerWidth / 2 - 140,
    y: window.innerHeight - 240,
  });

  const getReleaseStartPos = (): Position => {
    const x = window.innerWidth / 2 - 55;
    const y = window.innerHeight - 235;

    return {
      x: Math.max(0, Math.min(x, window.innerWidth - SLIMER_BASE_SIZE)),
      y: Math.max(0, Math.min(y, window.innerHeight - SLIMER_BASE_SIZE)),
    };
  };

  const catchSlimer = () => {
    if (isCaughtRef.current) {
      return;
    }

    stopAnimation();
    trapFinalizeRef.current = false;
    setIsCatching(true);
    setIsTrapFadingOut(false);
    setTrapPos({ x: pos.x - 40, y: pos.y - 40 });
    playTrapSound();

    // Phase 1 (1.3s): Slimer panic animation & capture
    catchTimeoutRef.current = setTimeout(() => {
      setIsCaught(true);
      setIsCatching(false);
      setIsTrapMovingToButton(false);
      setIsTrapFadingOut(false);

      // Phase 2 fallback: if transitionend doesn't fire, close sequence anyway.
      catchTimeoutRef.current = setTimeout(() => {
        if (!trapFinalizeRef.current) {
          trapFinalizeRef.current = true;
          setTrapPos(null);
          setIsTrapMovingToButton(false);
          setIsTrapFadingOut(false);
          localStorage.setItem(CAUGHT_KEY, "true");
          localStorage.setItem(CAUGHT_DATE_KEY, getGhostbustersStorageDay());
        }
      }, 1800);

      // 1) enable moving class, 2) move to target, 3) fade near the end
      const targetPos = getTrapTargetPos();
      requestAnimationFrame(() => {
        setIsTrapMovingToButton(true);
        requestAnimationFrame(() => {
          setTrapPos(targetPos);
        });
      });

      trapFadeTimeoutRef.current = setTimeout(() => {
        setIsTrapFadingOut(true);
      }, 1150);
    }, 1300);
  };

  const onTrapTransitionEnd: TransitionEventHandler<HTMLDivElement> = (event) => {
    if (!isTrapMovingToButton) {
      return;
    }

    if (event.propertyName !== "top") {
      return;
    }

    if (trapFinalizeRef.current) {
      return;
    }

    trapFinalizeRef.current = true;
    if (catchTimeoutRef.current) {
      clearTimeout(catchTimeoutRef.current);
      catchTimeoutRef.current = null;
    }
    if (trapFadeTimeoutRef.current) {
      clearTimeout(trapFadeTimeoutRef.current);
      trapFadeTimeoutRef.current = null;
    }
    setTrapPos(null);
    setIsTrapMovingToButton(false);
    setIsTrapFadingOut(false);
    localStorage.setItem(CAUGHT_KEY, "true");
    localStorage.setItem(CAUGHT_DATE_KEY, getGhostbustersStorageDay());
  };

  const releaseSlimer = () => {
    setIsCaught(false);
    setIsCatching(false);
    setIsTrapMovingToButton(false);
    setIsTrapFadingOut(false);
    setTrapPos(null);
    setScale(1);
    localStorage.removeItem(CAUGHT_KEY);
    localStorage.removeItem(CAUGHT_DATE_KEY);

    velRef.current = {
      vx: (2 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1),
      vy: (2 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1),
    };
    scalePhaseRef.current = Math.random() * Math.PI * 2;
    scaleSpeedRef.current = 0.008 + Math.random() * 0.012;
    steerCountdownRef.current = 60 + Math.floor(Math.random() * 80);

    const nextPosition = getReleaseStartPos();
    setPos(nextPosition);
    startAnimation();
  };

  const deactivateGhostbustersMode = () => {
    stopAnimation();
    if (catchTimeoutRef.current) {
      clearTimeout(catchTimeoutRef.current);
    }
    if (trapFadeTimeoutRef.current) {
      clearTimeout(trapFadeTimeoutRef.current);
    }
    setIsActive(false);
    setIsManualMode(false);
    setIsCaught(false);
    setIsCatching(false);
    setIsTrapMovingToButton(false);
    setIsTrapFadingOut(false);
    setTrapPos(null);
    localStorage.removeItem(GHOSTBUSTERS_MANUAL_ACTIVATION_KEY);
    localStorage.removeItem(GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY);
    localStorage.removeItem(CAUGHT_KEY);
    localStorage.removeItem(CAUGHT_DATE_KEY);
  };

  const activateGhostbustersMode = (manual = false) => {
    setIsActive(true);
    if (manual) setIsManualMode(true);
    const caughtToday = localStorage.getItem(CAUGHT_KEY);
    const caughtDate = localStorage.getItem(CAUGHT_DATE_KEY);
    const today = getGhostbustersStorageDay();
    const wasAlreadyCaught = caughtToday === "true" && caughtDate === today;

    if (wasAlreadyCaught) {
      setIsCaught(true);
      setTrapPos(null);
      setIsTrapMovingToButton(false);
      stopAnimation();
      return;
    }

    setIsCaught(false);
    setIsTrapMovingToButton(false);
    setIsTrapFadingOut(false);
    setPos(getRandomPosition());
    startAnimation();
  };

  useEffect(() => {
    const manualActivation = isGhostbustersManuallyActivatedToday(
      localStorage.getItem(GHOSTBUSTERS_MANUAL_ACTIVATION_KEY),
      localStorage.getItem(GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY),
    );

    if (isGhostbustersDay() || manualActivation) {
      activateGhostbustersMode(manualActivation && !isGhostbustersDay());
    }

    const onManualActivation = () => {
      localStorage.setItem(GHOSTBUSTERS_MANUAL_ACTIVATION_KEY, "true");
      localStorage.setItem(
        GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY,
        getGhostbustersStorageDay(),
      );
      activateGhostbustersMode(true);
    };

    globalThis.addEventListener(
      GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT,
      onManualActivation,
    );

    return () => {
      globalThis.removeEventListener(
        GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT,
        onManualActivation,
      );
      stopAnimation();
      if (catchTimeoutRef.current) {
        clearTimeout(catchTimeoutRef.current);
      }
      if (trapFadeTimeoutRef.current) {
        clearTimeout(trapFadeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isCaughtRef.current = isCaught;
  }, [isCaught]);

  if (!isGhostbustersDay() && !isActive) return null;

  return (
    <>
      {isActive && (
        <>
          {!isCaught && (
            <button
              aria-label="Cattura Slimer"
              className={`${styles.slimer} ${isCatching ? styles.catching : ""}`}
              style={{ left: `${pos.x}px`, top: `${pos.y}px`, transform: `scale(${scale})` }}
              onClick={isCatching ? undefined : catchSlimer}
            >
              <SlimerSvg />
            </button>
          )}

          {trapPos && (
            <div
              className={`${styles.trapContainer} ${isCatching ? styles.trapActive : ""} ${isTrapMovingToButton ? styles.trapMoving : ""} ${isTrapFadingOut ? styles.trapFading : ""}`}
              style={{
                left: `${trapPos.x}px`,
                top: `${trapPos.y}px`,
              }}
              onTransitionEnd={onTrapTransitionEnd}
            >
              <TrapSvg />
            </div>
          )}

          {isCaught && (
            <div className={styles.buttonContainer}>
              <button className={styles.releaseBtn} onClick={releaseSlimer}>
                👻 Libera Slimer
              </button>
            </div>
          )}

          {isManualMode && (
            <div className={styles.deactivateContainer}>
              <button
                className={styles.deactivateBtn}
                onClick={deactivateGhostbustersMode}
              >
                ✕ Disattiva Ghostbusters mode
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

const SlimerSvg = () => (
  // Original viewBox 388×531 → doubled to 110×150 px
  <Image
    src="/static/ghostbusters/slimer.svg"
    alt="Slimer"
    width={110}
    height={150}
    draggable={false}
    unoptimized
  />
);

const TrapSvg = () => (
  // Original viewBox 500×325 → doubled to 280×182 px
  <Image
    src="/static/ghostbusters/trap.svg"
    alt="Ghostbusters Trap"
    width={280}
    height={182}
    draggable={false}
    className={styles.trapImg}
    unoptimized
  />
);
