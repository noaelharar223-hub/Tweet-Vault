import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PhoneMockup } from './components/PhoneMockup/PhoneMockup';
import { XThreadSplash } from './components/XThreadSplash/XThreadSplash';
import { TweetPage } from './components/TweetPage/TweetPage';
import { ArtistPage } from './components/ArtistPage/ArtistPage';
import { HomePage } from './components/HomePage/HomePage';
import { ShareButton } from './components/ShareButton/ShareButton';
import { useMobileScale } from './hooks/useMobileScale';

// A fixed 3-level stack — home < artist < tweet — navigated one level at a
// time (home -> artist, artist -> tweet, and back). At most 2 of the 3 are
// ever mounted: the FRONT page (whichever is current) and the BACK page
// (the one directly beneath it in this order), so the exact same "front
// animates scale, back cross-fades underneath" mechanism used for
// tweet/artist below is reused unchanged for artist/home one level down —
// same springs, same clip-to-hero trick, same everything.
const PAGE_ORDER = ['home', 'artist', 'tweet'] as const;
type Page = (typeof PAGE_ORDER)[number];

// Only the FRONT page ever animates scale. The page beneath it never scales
// in either direction — it's simply revealed underneath as the front page
// shrinks away (front -> back), or covered up as the front page grows back
// over it, maximizing out of the exact card that was clicked (back ->
// front). It does, however, cross-fade in/out opposite the front page's
// scale — without that, the back page's own top section (wordmark, giant
// title, photo) sits fully opaque behind the shrinking front card for the
// entire animation and visibly double-exposes with it instead of reading as
// one clean minimize/maximize.
const ZOOM_SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 1 } as const;
const FADE_TRANSITION = { duration: 0.38, ease: [0.22, 1, 0.36, 1] } as const;
// Exit-only transitions, both quicker than ZOOM_SPRING's ~270ms settle (and
// than each other's un-clamped tail) — AnimatePresence waits for the slower
// of the two before unmounting, so if either one lingers, the whole exit
// gets a dead, invisible "hold" at the end where nothing is visibly moving
// but the tweet card also hasn't been removed yet. A plain, fast tween on
// scale for the exit (instead of reusing the spring, whose long settling
// tail is only worth it while growing INTO view) plus a fast opacity fade
// keeps the whole minimize snappy and the two roughly in step.
const EXIT_SCALE_TRANSITION = { duration: 0.22, ease: [0.4, 0, 1, 1] } as const;
const EXIT_FADE_TRANSITION = { duration: 0.18, ease: [0.4, 0, 1, 1] } as const;
// The back page's reveal-fade, kept in step with EXIT_SCALE_TRANSITION above
// (same duration) so it finishes becoming fully opaque right as the front
// card finishes shrinking away, instead of lagging behind it and leaving a
// beat where neither page reads as fully "in".
const BACK_REVEAL_TRANSITION = { duration: 0.22, ease: [0.22, 1, 0.36, 1] } as const;

// Both the tweet page (hero + pie chart + ADL stat + Piers Morgan + footer,
// ~2300px tall) and the artist page (hero + full deleted-tweets list,
// ~2900px tall) are long scrolling documents — but only their own "hero"
// section (roughly one phone-screen's worth) should ever be visible while
// either is animating as the FRONT page. Without clipping to that height,
// shrinking/growing the *entire* page as one block would flatten all that
// below-the-fold content into view at once, compressing the whole scrollable
// page into the animating rectangle instead of looking like a single
// phone-screen's worth of content zooming — clipping is applied only during
// the animated (enter/exit) states, since a settled/active page must stay
// fully scrollable. Keyed by page since each page's hero is a different
// height. The home page's list is short enough that its whole content
// already fits in roughly one screen, so its "hero height" is just its full
// natural height — 0 would clip it away entirely instead of leaving it
// unclipped-in-effect.
const HERO_HEIGHT: Record<Page, number> = { home: 940, artist: 880, tweet: 852 };

// Framer Motion can silently fail to animate a CSS property at all if its
// value type is inconsistent across variants on the same element (e.g.
// mixing a numeric `852` with the string `'auto'` for `height`) — so `height`
// isn't set via variants at all; it's applied directly as a plain style
// override alongside the variant-driven `scale`, kept in sync with which
// variant is active via the `animatingHeight` state below instead.
const frontVariants = {
  enterFromCard: { scale: 0.4, opacity: 0.4 },
  settled: { scale: 1, opacity: 1 },
  // Both scale and opacity use quick tweens (not ZOOM_SPRING) on exit — see
  // EXIT_SCALE_TRANSITION/EXIT_FADE_TRANSITION above — so the card shrinks
  // and vanishes together and briskly, with no lingering low-opacity "hold"
  // before AnimatePresence unmounts it.
  exitMinimize: {
    scale: 0.4,
    opacity: 0,
    transition: { scale: EXIT_SCALE_TRANSITION, opacity: EXIT_FADE_TRANSITION },
  },
};

// Cross-fades opposite the front page's scale — fully transparent while the
// front page is settled/covering it, fully opaque once the front page has
// shrunk away (or before it's grown to cover it again). Kept as a plain fade
// (no scale/movement of its own) per the "back page never has motion of its
// own" rule above.
const backVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const DEFAULT_ORIGIN = '50% 50%'; // screen center — used for the header tap, which has no single "card"

function App() {
  const [page, setPage] = useState<Page>('tweet');
  // The page directly beneath the current one in the fixed home/artist/tweet
  // stack — the one rendered as the static crossfading BACK layer. `null`
  // for home, which has nothing beneath it.
  const backPage = PAGE_ORDER[PAGE_ORDER.indexOf(page) - 1] as Page | undefined;

  // Whether the FRONT page-slot should currently be clipped to just its own
  // hero's height (true while the enter/exit scale animation is actually
  // running) or left free to scroll normally at its full content height
  // (true once settled as the active page). Plain style, not a Motion
  // variant, since animating `height` across a numeric value and 'auto' in
  // the same variant set silently fails to apply at all. Un-clipping is
  // done on a plain timer matched to ZOOM_SPRING's settle time, not
  // Motion's onAnimationComplete callback — that fires immediately (not
  // after the real animation) whenever `animate="settled"` is redeclared
  // with a value that's already been reached, which happens on every
  // render while this element is mounted, incorrectly resetting the clip
  // before the exit's shrink even gets a chance to play.
  const [isZooming, setIsZooming] = useState(false);
  const isZoomingRef = useRef(false);
  const ZOOM_SETTLE_MS = 480; // generous upper bound for ZOOM_SPRING to visually settle
  const [splashHidden, setSplashHidden] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const frontSlotRef = useRef<HTMLDivElement>(null);
  // The very first mount (initial page load, tweet page appearing under the
  // splash screen) should NOT play the "maximize from a card" entrance —
  // that only makes sense when actually navigating back from another page.
  // AnimatePresence with no `initial={false}` would otherwise animate this
  // first mount too.
  const isFirstMountRef = useRef(true);
  useEffect(() => {
    isFirstMountRef.current = false;
  }, []);
  // The pending transform-origin for the front page-slot — the only element
  // that ever animates. Written synchronously in navigateTo (before the
  // scroll reset below, since that changes the scaler's rect this is
  // measured against), then applied directly to the DOM: live, if the front
  // page-slot already exists (front -> back, where it's about to exit), or
  // via the mount-time callback ref (back -> front, where it doesn't exist
  // yet and is about to be created fresh at the card's position).
  const pendingOriginRef = useRef(DEFAULT_ORIGIN);
  const { scalerRef, activePageRef, height } = useMobileScale(page);
  // Read inside the memoized ref callback below without making `page` one of
  // its dependencies — depending on `page` directly would change the
  // callback's identity on every navigation, which makes React detach and
  // reattach the ref mid-animation (right when the front page-slot is
  // exiting), the exact "cut" bug this ref was memoized to avoid in the
  // first place.
  const pageRef = useRef(page);
  pageRef.current = page;

  // Keep the ref in sync with state (for the ref callback above, which can't
  // depend on `isZooming` directly without recreating on every zoom-state
  // change — recreating this ref mid-animation reintroduces the "detach
  // resets Motion's tracking" bug fixed earlier), and imperatively re-apply
  // height/overflow to the actual DOM node whenever isZooming changes,
  // bypassing Motion's `style` prop entirely (see setFrontSlotRef comment).
  useEffect(() => {
    isZoomingRef.current = isZooming;
    const el = frontSlotRef.current;
    if (el) {
      el.style.height = isZooming ? `${HERO_HEIGHT[pageRef.current]}px` : '';
      el.style.overflow = isZooming ? 'hidden' : '';
    }
  }, [isZooming]);

  // A stable callback ref per page (not a fresh arrow function each render,
  // and not one callback shared across pages) — an inline `ref={(el) =>
  // {...}}` is a new function every render, which makes React detach and
  // reattach the ref on every re-render even when the DOM node hasn't
  // changed; that reattachment mid-animation was resetting Motion's internal
  // tracking of the element, causing a visible "cut" partway through the
  // zoom. A memoized ref only fires on genuine mount/unmount, so the
  // animation is never interrupted by it.
  //
  // Each page needs its OWN callback instance (not one shared across all
  // three) because AnimatePresence keeps the OUTGOING page mounted for the
  // duration of its exit animation while the INCOMING page has already
  // mounted fresh — there's a window where both are simultaneously in the
  // tree. With one shared callback, the incoming page's mount would
  // overwrite frontSlotRef.current, and then the outgoing page's unmount
  // (arriving later, calling that same shared function with `null`) would
  // clobber that still-live reference back to null. Each closure below
  // captures its OWN element in `myEl` and only nulls out the shared refs if
  // they still point at that exact node — so one page's unmount can never
  // stomp on a different page's still-mounted element.
  const makeFrontSlotRef = useCallback(
    (forPage: Page) => {
      let myEl: HTMLDivElement | null = null;
      return (el: HTMLDivElement | null) => {
        if (el) {
          myEl = el;
          frontSlotRef.current = el;
          el.style.transformOrigin = pendingOriginRef.current;
          // Framer Motion's `style` prop intercepts and manages certain CSS
          // properties as part of its own internal animation state (the
          // same issue previously hit with a `motion.path`'s
          // `scale`/`opacity`) — plain `height`/`overflow` values passed via
          // `style` on a `motion.div` were silently never actually applied
          // to the DOM. Setting them directly here, outside Motion's style
          // pipeline, guarantees they land.
          el.style.height = isZoomingRef.current ? `${HERO_HEIGHT[forPage]}px` : '';
          el.style.overflow = isZoomingRef.current ? 'hidden' : '';
          activePageRef.current = el;
        } else if (frontSlotRef.current === myEl) {
          frontSlotRef.current = null;
          activePageRef.current = null;
        }
      };
    },
    [activePageRef],
  );
  const homeFrontRef = useMemo(() => makeFrontSlotRef('home'), [makeFrontSlotRef]);
  const artistFrontRef = useMemo(() => makeFrontSlotRef('artist'), [makeFrontSlotRef]);
  const tweetFrontRef = useMemo(() => makeFrontSlotRef('tweet'), [makeFrontSlotRef]);

  function openBreakdown() {
    setSplashHidden(true);
    setPlayIntro(true);
  }

  function navigateTo(next: Page, origin?: { x: number; y: number }) {
    // Anchor the front page's scale to where the clicked card was actually
    // VISIBLE on screen — not its position within the previous page's
    // scrollable document. Each page has a completely unrelated internal
    // layout/height, so a raw document-relative pixel offset from one page's
    // scroll position doesn't correspond to any meaningful point on another
    // page once scroll resets to 0 and a differently-sized page renders
    // fresh — that mismatch is exactly why the zoom used to appear to start
    // from far below/above the card instead of the card itself. Using the
    // click's on-screen (viewport) position as a percentage of the visible
    // phone-screen viewport is scroll-agnostic and lands in the same visual
    // neighborhood on whichever page is rendered, because the viewport
    // itself doesn't move.
    let newOrigin: string;
    if (origin && contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const xPct = ((origin.x - contentRect.left) / contentRect.width) * 100;
      const yPct = ((origin.y - contentRect.top) / contentRect.height) * 100;
      newOrigin = `${xPct}% ${yPct}%`;
    } else {
      newOrigin = DEFAULT_ORIGIN;
    }
    pendingOriginRef.current = newOrigin;
    if (frontSlotRef.current) frontSlotRef.current.style.transformOrigin = newOrigin;

    // All pages share one scroll container (#iphone-content) — without this,
    // whatever scroll position the previous page was at (e.g. scrolled deep
    // into a list) carries over and the incoming page mounts already
    // scrolled down instead of at its own top. Reset AFTER computing the
    // origin above, since that math is scroll-invariant but still reads
    // current scroll/rect state before this changes it.
    if (contentRef.current) contentRef.current.scrollTop = 0;

    setIsZooming(true);
    setPage(next);
    // `next` always ends up rendered in the front slot (every page animates
    // scale when it's the current one — see the AnimatePresence block below)
    // and needs to settle into its full, scrollable, unclipped layout once
    // its enter animation finishes, regardless of whether this navigation
    // moved forward or backward through the home/artist/tweet stack.
    window.setTimeout(() => setIsZooming(false), ZOOM_SETTLE_MS);
  }

  return (
    <PhoneMockup>
      <XThreadSplash hidden={splashHidden} onOpenBreakdown={openBreakdown} />

      {/* Rendered once, outside the animated/scrolling page stack, so it
          stays fixed at the exact same screen position (see ShareButton.css)
          across every page and every navigation — never re-mounts, never
          scrolls away. Hidden on the tweet page — sharing makes sense for
          the celebrity list and artist profile, not the tweet breakdown
          itself, which has its own dedicated back button in that same
          corner's opposite side. */}
      {page !== 'tweet' && <ShareButton />}

      <div className="iphone-content" ref={contentRef}>
        <div className="mobile-scaler" ref={scalerRef} style={height ? { height } : undefined}>
          {/* The page one level beneath the current one sits static
              underneath, no scale/motion of its own — it's simply revealed
              or covered by the current (front) page's own scale animation on
              top of it. It does cross-fade in/out (see backVariants) so its
              own top section doesn't sit fully opaque behind the
              shrinking/growing front card. */}
          {backPage === 'home' && (
            <motion.div
              key="home-back"
              className="page-slot page-slot-back"
              style={{ zIndex: 0 }}
              initial="hidden"
              animate="visible"
              variants={backVariants}
              transition={BACK_REVEAL_TRANSITION}
            >
              <HomePage onOpenArtist={(origin) => navigateTo('artist', origin)} />
            </motion.div>
          )}
          {backPage === 'artist' && (
            <motion.div
              key="artist-back"
              className="page-slot page-slot-back"
              style={{ zIndex: 0 }}
              initial="hidden"
              animate="visible"
              variants={backVariants}
              transition={BACK_REVEAL_TRANSITION}
            >
              <ArtistPage onOpenTweet={(origin) => navigateTo('tweet', origin)} onOpenHome={() => navigateTo('home')} />
            </motion.div>
          )}
          <AnimatePresence>
            {page === 'home' && (
              <motion.div
                key="home"
                ref={homeFrontRef}
                className="page-slot"
                initial={isFirstMountRef.current ? false : 'enterFromCard'}
                animate="settled"
                exit="exitMinimize"
                variants={frontVariants}
                transition={{ scale: ZOOM_SPRING, opacity: FADE_TRANSITION }}
                style={{ zIndex: 1 }}
              >
                <HomePage onOpenArtist={(origin) => navigateTo('artist', origin)} />
              </motion.div>
            )}
            {page === 'artist' && (
              <motion.div
                key="artist"
                ref={artistFrontRef}
                className="page-slot"
                initial={isFirstMountRef.current ? false : 'enterFromCard'}
                animate="settled"
                exit="exitMinimize"
                variants={frontVariants}
                transition={{ scale: ZOOM_SPRING, opacity: FADE_TRANSITION }}
                style={{ zIndex: 1 }}
              >
                <ArtistPage onOpenTweet={(origin) => navigateTo('tweet', origin)} onOpenHome={() => navigateTo('home')} />
              </motion.div>
            )}
            {page === 'tweet' && (
              <motion.div
                key="tweet"
                ref={tweetFrontRef}
                className="page-slot"
                initial={isFirstMountRef.current ? false : 'enterFromCard'}
                animate="settled"
                exit="exitMinimize"
                variants={frontVariants}
                transition={{ scale: ZOOM_SPRING, opacity: FADE_TRANSITION }}
                style={{ zIndex: 1 }}
              >
                <TweetPage playIntro={playIntro} onOpenArtist={() => navigateTo('artist')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PhoneMockup>
  );
}

export default App;
