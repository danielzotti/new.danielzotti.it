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
type BeamPhase = "idle" | "active" | "hit" | "miss";

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
  const [beamPhase, setBeamPhase] = useState<BeamPhase>("idle");
  const [beamTarget, setBeamTarget] = useState<Position | null>(null);
  const frameRef = useRef<number | null>(null);
  const catchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trapFinalizeRef = useRef<boolean>(false);
  const trapFadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCaughtRef = useRef<boolean>(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const beamTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const posRef = useRef<Position>({ x: 0, y: 0 });
  const scaleRef = useRef<number>(1);
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

      const ctx = new Ctor();
      const now = ctx.currentTime;

      // Helper: white noise buffer source
      const createNoise = (duration: number) => {
        const bufLen = Math.ceil(ctx.sampleRate * duration);
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        return src;
      };

      const osc = (
        type: OscillatorType,
        freqStart: number,
        freqEnd: number,
        gainStart: number,
        gainEnd: number,
        start: number,
        duration: number,
      ) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.setValueAtTime(freqStart, start);
        if (freqEnd !== freqStart)
          o.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
        g.gain.setValueAtTime(gainStart, start);
        g.gain.exponentialRampToValueAtTime(Math.max(gainEnd, 0.0001), start + duration);
        o.start(start);
        o.stop(start + duration + 0.01);
      };

      // ── 1. Proton beam charge-up: rising sawtooth sweep ──────────────────
      (() => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sawtooth";
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.setValueAtTime(80, now);
        o.frequency.exponentialRampToValueAtTime(1400, now + 0.5);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.22, now + 0.1);
        g.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        o.start(now);
        o.stop(now + 0.55);
      })();

      // ── 2. Proton zap: bandpass-filtered noise ────────────────────────────
      (() => {
        const noise = createNoise(0.75);
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(700, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.95);
        filter.Q.value = 1.2;
        const g = ctx.createGain();
        noise.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0, now + 0.2);
        g.gain.linearRampToValueAtTime(0.3, now + 0.35);
        g.gain.linearRampToValueAtTime(0.0001, now + 0.95);
        noise.start(now + 0.2);
        noise.stop(now + 0.95);
      })();

      // ── 3. Rapid zap clicks (electric sparks) ────────────────────────────
      for (let i = 0; i < 7; i++) {
        osc("square", 1200 - i * 60, 300, 0.14, 0.0001, now + 0.25 + i * 0.085, 0.07);
      }

      // ── 4. Trap SLAM: low boom + metallic clank ───────────────────────────
      const slamT = now + 0.88;
      osc("sine",   150, 28,   0.65, 0.0001, slamT,        0.4);  // deep boom
      osc("square", 3200, 400, 0.22, 0.0001, slamT,        0.1);  // metallic clank
      osc("sine",   60,   20,  0.35, 0.0001, slamT + 0.05, 0.35); // sub thud

      // ── 5. "Gotcha!" ascending arpeggio (G4–B4–D5–G5) ───────────────────
      [392, 494, 587, 784].forEach((freq, i) => {
        osc("square", freq, freq, 0.13, 0.0001, now + 1.05 + i * 0.09, 0.08);
      });
    } catch {
      // Ignore audio failures silently (browser policy / unsupported APIs)
    }
  };

  const playBackgroundMusic = async (reset = true): Promise<boolean> => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio("/static/ghostbusters/ghostbusters.mp3");
      bgMusicRef.current.loop = true;
      bgMusicRef.current.preload = "auto";
    }

    if (reset) {
      bgMusicRef.current.currentTime = 0;
    }

    try {
      await bgMusicRef.current.play();
      return true;
    } catch (error) {
      // Some browsers may still block autoplay outside user gestures.
      console.warn("Ghostbusters music could not start", error);
      return false;
    }
  };

  const stopBackgroundMusic = () => {
    if (!bgMusicRef.current) {
      return;
    }

    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
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
    scaleRef.current = newScale;

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

      posRef.current = { x: newX, y: newY };
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

  const clearBeam = () => {
    if (beamTimeoutRef.current) {
      clearTimeout(beamTimeoutRef.current);
      beamTimeoutRef.current = null;
    }
    setBeamPhase("idle");
    setBeamTarget(null);
  };

  const catchSlimer = () => {
    if (isCaughtRef.current) {
      return;
    }

    stopBackgroundMusic();
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

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCaughtRef.current || isCatching) return;
    if (beamPhase !== "idle") return;

    const clickX = e.clientX;
    const clickY = e.clientY;

    setBeamTarget({ x: clickX, y: clickY });
    setBeamPhase("active");

    // Hit detection: Slimer center + half-sizes scaled
    const currentPos = posRef.current;
    const currentScale = scaleRef.current;
    const slimerW = 110; // rendered width
    const slimerH = 150; // rendered height
    const centerX = currentPos.x + slimerW / 2;
    const centerY = currentPos.y + slimerH / 2;
    const halfW = (slimerW / 2) * currentScale;
    const halfH = (slimerH / 2) * currentScale;

    const hit =
      clickX >= centerX - halfW &&
      clickX <= centerX + halfW &&
      clickY >= centerY - halfH &&
      clickY <= centerY + halfH;

    if (hit) {
      stopAnimation(); // Ferma Slimer immediatamente
      // After brief "active" phase → flash → catch
      beamTimeoutRef.current = setTimeout(() => {
        setBeamPhase("hit");
        beamTimeoutRef.current = setTimeout(() => {
          setBeamPhase("idle");
          setBeamTarget(null);
          catchSlimer();
        }, 480);
      }, 150);
    } else {
      // Miss → fade beam
      beamTimeoutRef.current = setTimeout(() => {
        setBeamPhase("miss");
        beamTimeoutRef.current = setTimeout(() => {
          setBeamPhase("idle");
          setBeamTarget(null);
        }, 600);
      }, 80);
    }
  };

  const onTrapTransitionEnd: TransitionEventHandler<HTMLDivElement> = (
    event,
  ) => {
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
    clearBeam();
    stopBackgroundMusic();
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
      // Manual activation comes from a click/tap, so we try to play during that gesture.
      void playBackgroundMusic();
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
      if (beamTimeoutRef.current) {
        clearTimeout(beamTimeoutRef.current);
      }
      stopBackgroundMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isCaughtRef.current = isCaught;
  }, [isCaught]);

  useEffect(() => {
    if (isActive && !isCaught) {
      void playBackgroundMusic(false);
      return;
    }

    stopBackgroundMusic();
  }, [isActive, isCaught]);

  if (!isGhostbustersDay() && !isActive) return null;

  return (
    <>
      {isActive && (
        <>
          {!isCaught && !isCatching && (
            <div
              role="button"
              tabIndex={0}
              aria-label="Spara il raggio protone su Slimer"
              className={styles.clickOverlay}
              onClick={handleScreenClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // Keyboard: aim at Slimer center
                  const cx = posRef.current.x + 55;
                  const cy = posRef.current.y + 75;
                  handleScreenClick({
                    clientX: cx,
                    clientY: cy,
                  } as React.MouseEvent<HTMLDivElement>);
                }
              }}
            />
          )}

          {!isCaught && (
            <button
              aria-label="Cattura Slimer"
              className={`${styles.slimer} ${isCatching ? styles.catching : ""}`}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: `scale(${scale})`,
              }}
            >
              <SlimerSvg />
            </button>
          )}

          {beamTarget && beamPhase !== "idle" && (
            <ProtonBeam target={beamTarget} phase={beamPhase} />
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
                👻 Release Slimer
              </button>
            </div>
          )}

          {isManualMode && (
            <div className={styles.deactivateContainer}>
              <button
                className={styles.deactivateBtn}
                onClick={deactivateGhostbustersMode}
              >
                ✕ Disable Ghostbusters mode
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

/** Genera un percorso SVG ondulato dal punto (x1,y1) al punto (x2,y2).
 *  amplitude: ampiezza in px dell'onda perpendolare al raggio
 *  waveCount: numero di ondulazioni complete lungo il raggio
 *  phaseOffset: sfasamento iniziale (radianti) per creare strisce separate
 */
function makeWavyPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  amplitude: number,
  waveCount: number,
  phaseOffset = 0,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const ux = dx / len;
  const uy = dy / len;
  // Vettore perpendicolare (ruotato di 90°)
  const px = -uy;
  const py = ux;

  const steps = Math.max(50, Math.floor(len / 5));
  let d = `M ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    // Dissolvenza alle estremità per raccordo pulito
    const taper = Math.sin(t * Math.PI);
    const wave =
      Math.sin(t * waveCount * Math.PI * 2 + phaseOffset) * amplitude * taper;
    const bx = x1 + dx * t + px * wave;
    const by = y1 + dy * t + py * wave;
    d += ` L ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  return d;
}

const ProtonBeam = ({
  target,
  phase,
}: {
  target: Position;
  phase: Exclude<BeamPhase, "idle">;
}) => {
  const sw = globalThis.window?.innerWidth ?? 1920;
  const sh = globalThis.window?.innerHeight ?? 1080;
  const x1 = sw / 2;
  const y1 = sh;
  const x2 = target.x;
  const y2 = target.y;

  // Percorsi ondulati con sfasamento diverso per ogni layer
  const pathOuter = makeWavyPath(x1, y1, x2, y2, 14, 5, 0);
  const pathMid   = makeWavyPath(x1, y1, x2, y2, 11, 5, 0);
  const pathBlue  = makeWavyPath(x1, y1, x2, y2, 9,  6, Math.PI * 0.65);
  const pathCore  = makeWavyPath(x1, y1, x2, y2, 7,  5, 0);
  const pathWhite = makeWavyPath(x1, y1, x2, y2, 5,  5, 0);

  let phaseClass = styles.beamMiss;
  if (phase === "active") phaseClass = styles.beamActive;
  else if (phase === "hit") phaseClass = styles.beamHit;

  return (
    <svg
      className={`${styles.beamSvg} ${phaseClass}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="gb-beam-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="gb-beam-glow-strong"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="gb-beam-glow-blue"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Flash bianco a schermo intero sull'hit */}
      {phase === "hit" && (
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          className={styles.hitFlashRect}
        />
      )}

      {/* Alone esterno rosso-arancio */}
      <path
        d={pathOuter}
        stroke="rgba(255,50,0,0.22)"
        strokeWidth="55"
        fill="none"
        strokeLinecap="round"
        filter="url(#gb-beam-glow-strong)"
      />

      {/* Layer intermedio arancione */}
      <path
        d={pathMid}
        stroke="rgba(255,130,20,0.65)"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        filter="url(#gb-beam-glow)"
      />

      {/* Striscia blu elettrica (sfasata) */}
      <path
        d={pathBlue}
        stroke="rgba(60,140,255,0.85)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="35 22"
        filter="url(#gb-beam-glow-blue)"
        className={styles.beamBlueFlow}
      />

      {/* Core giallo-arancio con dashes animate */}
      <path
        d={pathCore}
        stroke="rgba(255,215,60,0.9)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="55 18"
        className={styles.beamCoreFlow}
      />

      {/* Nucleo bianco incandescente */}
      <path
        d={pathWhite}
        stroke="rgba(255,255,210,0.95)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="80 25"
        className={styles.beamWhiteFlow}
      />

      {/* Flash muzzle all'origine (basso centro) */}
      <circle
        cx={x1}
        cy={y1}
        r="22"
        fill="rgba(255,160,40,0.85)"
        filter="url(#gb-beam-glow)"
        className={styles.beamMuzzle}
      />

      {/* Punto di impatto */}
      <circle
        cx={x2}
        cy={y2}
        r="18"
        fill="rgba(255,100,0,0.75)"
        filter="url(#gb-beam-glow)"
        className={styles.beamImpact}
      />
    </svg>
  );
};

