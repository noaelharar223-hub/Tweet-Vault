import { useLayoutEffect, useRef, useState } from 'react';

/** Reads the real applied scale from an element's computed transform matrix
 * rather than hardcoding it — the mobile media query drops the scale to 1
 * (no phone-in-phone shell) on real phones / narrow viewports. */
function getScale(el: HTMLElement | null): number {
  if (!el) return 1;
  const t = getComputedStyle(el).transform;
  if (!t || t === 'none') return 1;
  const m = t.match(/^matrix\(([^,]+),/);
  return m ? parseFloat(m[1]) : 1;
}

/** Ports the original vanilla-JS fixScalerHeight/syncPageStackHeight logic:
 * since `transform: scale()` doesn't affect layout, the scroll container
 * sees the full unscaled height. This measures the *active page* directly
 * (rather than the scaler's own scrollHeight, which no longer reflects
 * content since pages are position:absolute and don't contribute to it) and
 * sets the scaler's layout height to match the page's true visual height, so
 * the outer scroll container's scrollable range stays correct. Re-runs
 * whenever the active page's rendered size changes (React state, resize). */
export function useMobileScale(activePageKey: string) {
  const scalerRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const scaler = scalerRef.current;
    if (!scaler) return;

    function measure() {
      const page = activePageRef.current;
      if (!scaler || !page) return;
      const scale = getScale(scaler);
      setHeight(page.scrollHeight * scale);
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (activePageRef.current) ro.observe(activePageRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageKey]);

  return { scalerRef, activePageRef, height };
}
