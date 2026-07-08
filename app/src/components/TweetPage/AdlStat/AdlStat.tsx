import { useEffect, useRef, useState } from 'react';
import './AdlStat.css';

export function AdlStat({ gate = true }: { gate?: boolean }) {
  // Track "has scrolled into view" separately from "is gate open" — once
  // both are true, fade in; if the gate opens after the scroll trigger
  // already fired (waiting on the pie chart above to finish), it still
  // fades in as soon as the gate clears instead of needing another scroll.
  // Plain native IntersectionObserver + CSS transition (not Framer Motion's
  // whileInView/animate props) since those proved unreliable inside this
  // app's nested, transform-scaled scroll container.
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const revealed = inView && gate;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest('.iphone-content');
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root, threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p
      className="m-adl"
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      The ADL documented <span className="red">30 real world antisemitic incidents</span> directly tied to Kanye's rants in 2022.
    </p>
  );
}
