import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PIE_DATA, PIE_TOTAL, slicePath } from '../../../data/pieData';
import './BillionsSection.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CX = 145;
const CY = 145;
const R = 132;
const INNER_R = 66;

// Each slice draws in one at a time, largest share first (PIE_DATA is already
// ordered biggest-to-smallest) — a per-slice pop from scale(0) at its own
// center, staggered so the whole sweep reads as "building up" the chart
// piece by piece rather than the chart just appearing all at once.
const SLICE_STAGGER_S = 0.18;
const SLICE_DURATION_S = 0.5;

export function BillionsSection({ onPieComplete }: { onPieComplete?: () => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [piePlaying, setPiePlaying] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const pieSectionRef = useRef<HTMLDivElement>(null);

  // Plain native IntersectionObserver rather than Framer Motion's whileInView/
  // onViewportEnter — those proved unreliable at triggering inside this app's
  // nested, transform-scaled scroll container (the same issue the original
  // vanilla-JS version of this site solved by using a raw IntersectionObserver
  // directly against the phone's own scroll element).
  useEffect(() => {
    const el = pieSectionRef.current;
    if (!el) return;
    const root = el.closest('.iphone-content');
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPiePlaying(true);
          obs.disconnect();
        }
      },
      { root, threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Notify the parent (TweetPage, gating AdlStat/PiersMorgan below) once the
  // draw-in sequence finishes — as its own effect rather than calling
  // onPieComplete directly from the transitionend handler's state updater,
  // since calling a parent's setState synchronously from inside a child's
  // state updater triggers React's "update while rendering a different
  // component" warning.
  useEffect(() => {
    if (introComplete) onPieComplete?.();
  }, [introComplete, onPieComplete]);

  let angle = 0;
  const slices = PIE_DATA.map((item, i) => {
    const a = (item.amount / PIE_TOTAL) * 360;
    const startAngle = angle;
    const endAngle = angle + a;
    angle = endAngle;
    return { item, i, path: slicePath(CX, CY, R, INNER_R, startAngle, endAngle) };
  });

  const active = activeIndex !== null ? PIE_DATA[activeIndex] : null;
  const lastSliceIndex = slices.length - 1;

  return (
    <div className="m-s3">
      <motion.div
        className="m-billions-head"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <p className="m-billions-heading">
          $3 billion in 18<span className="red"> days</span>
        </p>
        <p className="m-body" style={{ textAlign: 'center' }}>
          Seven major partnerships ended in under three weeks - a slow-motion public dismantling in real time.
        </p>
      </motion.div>

      <motion.div className="m-pie-section" ref={pieSectionRef}>
        <div className="m-pie-svg-wrap">
          <svg viewBox="0 0 290 290">
            {slices.map(({ item, i, path }) => (
              <path
                key={item.name}
                d={path}
                fill={item.color}
                stroke="#141820"
                strokeWidth={2}
                style={{
                  cursor: 'pointer',
                  transformOrigin: `${CX}px ${CY}px`,
                  transformBox: 'view-box',
                  scale: piePlaying ? (activeIndex === i ? 1.06 : 1) : 0,
                  opacity: piePlaying ? 1 : 0,
                  filter: activeIndex === i ? 'brightness(1.3)' : 'brightness(1)',
                  transition:
                    activeIndex === i
                      ? 'scale 0.2s, filter 0.2s'
                      : `scale ${SLICE_DURATION_S}s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * SLICE_STAGGER_S}s, opacity ${SLICE_DURATION_S}s ease ${i * SLICE_STAGGER_S}s, filter 0.2s`,
                }}
                onTransitionEnd={(e) => {
                  // Only the scale transition (not opacity/filter, which also
                  // fire their own transitionend) should signal completion —
                  // and only for the last (smallest) slice in the sequence.
                  if (i === lastSliceIndex && e.propertyName === 'scale') {
                    setIntroComplete(true);
                  }
                }}
                onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
              />
            ))}
          </svg>
          <div className="m-pie-center-label">
            <span className="m-pie-center-num">$3B</span>
            <span className="m-pie-center-sub">Total lost</span>
          </div>
        </div>

        <div className={`m-pie-info ${active ? 'visible' : ''}`}>
          {active && (
            <>
              <div className="m-pie-info-header">
                <span className="m-pie-info-brand">{active.name}</span>
                <span className="m-pie-info-amount">{active.display}</span>
              </div>
              <p
                className="m-pie-info-desc"
                dangerouslySetInnerHTML={{
                  __html: active.desc.replace(
                    'Forbes stripped Kanye of billionaire status the same day.',
                    '<strong>Forbes stripped Kanye of billionaire status the same day.</strong>',
                  ),
                }}
              />
            </>
          )}
        </div>
      </motion.div>

      <motion.p
        className="m-body m-pie-body-text"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Within 18 days of his tweet, six major brands—including Adidas, Gap, and Balenciaga—cut ties, wiping $1.6 billion from his verified net
        worth and over $3 billion in total deal value. Concurrently, JPMorgan Chase severed banking relations, TJX pulled Yeezy products from
        4,700 stores, and MRC scrapped a completed documentary. By October 25, Forbes downgraded his net worth from $2 billion to $400 million. A
        single tweet, live for just 18 hours, effectively erased his billionaire status in under three weeks.
      </motion.p>
    </div>
  );
}
