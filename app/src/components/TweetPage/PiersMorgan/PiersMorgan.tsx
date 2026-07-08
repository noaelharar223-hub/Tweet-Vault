import { useEffect, useRef, useState } from 'react';
import './PiersMorgan.css';

export function PiersMorgan({ gate = true }: { gate?: boolean }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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
    <div
      className="m-s4"
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      <p className="m-body">
        Kanye appeared on Piers Morgan's show on October 19th - before Adidas had even announced its decision. Morgan asked repeatedly whether he
        was sorry. Kanye said "Absolutely not" three times before, under sustained pressure, producing a partial statement: "I will say I'm sorry
        for the people that I hurt with the confusion that I caused."
      </p>
      <p className="m-body" style={{ fontWeight: 700 }}>
        He did not say the tweet was wrong. He apologised for the confusion - not the content.
      </p>
    </div>
  );
}
