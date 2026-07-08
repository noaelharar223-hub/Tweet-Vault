import { useEffect, useRef, useState } from 'react';
import { motion, type PanInfo } from 'motion/react';
import { HERO_MOMENTS } from '../../../data/heroMoments';
import './Hero.css';

const SIZES = { active: 118, near: 77, far: 53 };
const GAP = 8;
const DRAG_COMMIT_PX = 30;

// The staggered entrance (header/label/body/meta fading in, cards popping
// in one by one) is a one-time "welcome" choreography meant to play only the
// very first time the hero appears. <Hero> unmounts every time the user
// navigates to the artist page (it's inside <TweetPage>, swapped out by
// AnimatePresence) and remounts fresh on zoom back in — without this module
// -level guard, its useEffect would replay the whole intro on every remount,
// which reads as a jarring "glitch" landing right as the zoom-in settles.
let heroIntroHasPlayed = false;

function widthFor(i: number, current: number) {
  const d = Math.abs(i - current);
  if (d === 0) return SIZES.active;
  if (d === 1) return SIZES.near;
  return SIZES.far;
}

function heightFor(i: number, current: number) {
  if (i === current) return 161;
  return Math.abs(i - current) === 1 ? 105 : 72;
}

function metaHTML(m: (typeof HERO_MOMENTS)[number]) {
  if (m.metaLeft !== undefined) return `<span>${m.metaLeft}</span><span>${m.metaRight}</span>`;
  return `<span>${m.meta}</span>`;
}

export function Hero({ playIntro, onOpenArtist }: { playIntro: boolean; onOpenArtist: () => void }) {
  const [current, setCurrent] = useState(2); // "The tweet" is the default selected moment
  const [switching, setSwitching] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(2);
  // Skip straight to the final state if the intro already played once this
  // session — remounts (e.g. returning from the artist page) should show the
  // hero fully-formed immediately, not replay the welcome animation.
  const [introStep, setIntroStep] = useState(heroIntroHasPlayed ? 4 : 0);
  const [enteredFrames, setEnteredFrames] = useState<Set<number>>(
    heroIntroHasPlayed ? new Set(HERO_MOMENTS.map((_, i) => i)) : new Set(),
  );
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(393);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCarouselWidth(el.clientWidth));
    ro.observe(el);
    setCarouselWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // ── One-time entrance choreography — runs once when the splash is dismissed ──
  // Header, label/date, body, and meta each simply fade in one after another
  // at a constant linear pace (no typing, no motion, no easing curve).
  useEffect(() => {
    if (!playIntro || heroIntroHasPlayed) return;
    heroIntroHasPlayed = true;
    const FADE_STEP_MS = 220;
    const raf = requestAnimationFrame(() => setIntroStep(1));
    const timers: number[] = [
      window.setTimeout(() => setIntroStep(2), FADE_STEP_MS * 1),
      window.setTimeout(() => setIntroStep(3), FADE_STEP_MS * 2),
      window.setTimeout(() => setIntroStep(4), FADE_STEP_MS * 3),
    ];

    const CARD_STAGGER = 90;
    const ENTER_START = 420;
    HERO_MOMENTS.forEach((_, i) => {
      const delay = ENTER_START + i * CARD_STAGGER;
      timers.push(window.setTimeout(() => {
        setEnteredFrames((prev) => new Set(prev).add(i));
      }, delay));
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [playIntro]);

  function goTo(index: number) {
    const next = ((index % HERO_MOMENTS.length) + HERO_MOMENTS.length) % HERO_MOMENTS.length;
    if (next === current) return;
    setCurrent(next);
    setSwitching(true);
    window.setTimeout(() => {
      setDisplayIndex(next);
      setSwitching(false);
    }, 200);
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    const dx = info.offset.x;
    setDragOffset(0);
    if (Math.abs(dx) > DRAG_COMMIT_PX) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
  }

  const centerX = carouselWidth / 2;
  const activeW = widthFor(current, current);
  const activeLeft = centerX - activeW / 2 + dragOffset;

  // Compute each frame's left edge, working outward from the active/center frame.
  const leftEdge: Record<number, number> = { [current]: activeLeft };
  let x = activeLeft + activeW + GAP;
  for (let i = current + 1; i < HERO_MOMENTS.length; i++) {
    leftEdge[i] = x;
    x += widthFor(i, current) + GAP;
  }
  x = activeLeft - GAP;
  for (let i = current - 1; i >= 0; i--) {
    const w = widthFor(i, current);
    x -= w;
    leftEdge[i] = x;
    x -= GAP;
  }

  const moment = HERO_MOMENTS[displayIndex];

  return (
    <div className="m-s1">
      <div className="m-hero-header-wrap">
        <div className={`m-hero-header ${introStep >= 1 ? 'intro-in' : ''}`}>
          <button className="m-hero-header-hit" aria-label="Back to artist page" type="button" onClick={onOpenArtist} />
          <div className="m-hero-back" aria-hidden="true">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M16 6H1M1 6L6 1M1 6l5 5" stroke="#e10f12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="m-hero-title">Kanye West (Ye)</span>
        </div>
      </div>

      <div className={`m-hero-content ${switching ? 'switching' : ''}`}>
        <div className={`m-hero-label-row m-fade-in ${introStep >= 2 ? 'intro-in' : ''}`}>
          <p className="m-hero-label">{moment.label}</p>
          <p className="m-hero-date">{moment.date}</p>
        </div>
        <p className={`m-hero-body m-fade-in ${introStep >= 3 ? 'intro-in' : ''}`}>{moment.body}</p>
        <div
          className={`m-hero-meta m-fade-in ${introStep >= 4 ? 'intro-in' : ''}`}
          dangerouslySetInnerHTML={{ __html: metaHTML(moment) }}
        />
      </div>

      <div className="m-hero-nav">
        <button className={`m-hero-nav-btn prev ${introStep >= 4 ? 'intro-in' : ''}`} aria-label="Previous moment" type="button" onClick={() => goTo(current - 1)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#0e1016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={`m-hero-nav-btn next ${introStep >= 4 ? 'intro-in' : ''}`} aria-label="Next moment" type="button" onClick={() => goTo(current + 1)}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#0e1016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <motion.div
        className="m-carousel"
        ref={carouselRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDrag={(_e, info) => setDragOffset(info.offset.x)}
        onDragEnd={handleDragEnd}
      >
        {HERO_MOMENTS.map((m, i) => {
          const w = widthFor(i, current);
          const h = heightFor(i, current);
          const entered = enteredFrames.has(i);
          return (
            <motion.button
              key={i}
              className={`m-carousel-frame ${i === current ? 'active' : ''}`}
              type="button"
              aria-label={m.alt}
              onClick={() => goTo(i)}
              initial={false}
              animate={{
                x: leftEdge[i] ?? 0,
                width: w,
                height: h,
                opacity: playIntro ? (entered ? 1 : 0) : 1,
                scale: playIntro && !entered ? 0.85 : 1,
              }}
              transition={{
                x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: entered ? 0.9 : 0.32, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: entered ? 0.9 : 0.32, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ position: 'absolute', bottom: 0 }}
            >
              <img src={m.image} alt="" draggable={false} />
              <span className="tint" />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
