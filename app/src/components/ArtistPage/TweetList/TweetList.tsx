import { useEffect, useMemo, useRef, useState } from 'react';
import { ARTIST_TWEETS } from '../../../data/artistTweets';
import '../../shared/CornerBrackets.css';
import './TweetList.css';

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const TweetList = ({
  onOpenTweet,
  listRef,
}: {
  onOpenTweet: (origin: { x: number; y: number }) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [appliedFrom, setAppliedFrom] = useState<number | null>(null);
  const [appliedTo, setAppliedTo] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popoverOpen) return;
    const close = () => setPopoverOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [popoverOpen]);

  const items = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let filtered = ARTIST_TWEETS.filter((t) => !q || t.quote.toLowerCase().includes(q) || t.date.toLowerCase().includes(q));
    if (appliedFrom !== null) filtered = filtered.filter((t) => t.ts >= appliedFrom);
    if (appliedTo !== null) filtered = filtered.filter((t) => t.ts <= appliedTo);
    return filtered.slice().sort((a, b) => b.ts - a.ts);
  }, [searchQuery, appliedFrom, appliedTo]);

  const sortLabel =
    appliedFrom !== null || appliedTo !== null
      ? appliedFrom !== null && appliedTo !== null
        ? `${formatDate(appliedFrom)} – ${formatDate(appliedTo)}`
        : appliedFrom !== null
          ? `From ${formatDate(appliedFrom)}`
          : `Until ${formatDate(appliedTo!)}`
      : 'Filter by date';

  function applyFilter() {
    setAppliedFrom(dateFrom ? new Date(dateFrom).getTime() : null);
    setAppliedTo(dateTo ? new Date(dateTo).getTime() : null);
    setPopoverOpen(false);
  }

  function clearFilter() {
    setDateFrom('');
    setDateTo('');
    setAppliedFrom(null);
    setAppliedTo(null);
    setPopoverOpen(false);
  }

  return (
    <div className="artist-list-section" ref={listRef}>
      <span className="artist-count">20 deleted tweets</span>

      <div className="artist-search-bar">
        <input
          className="artist-search-input"
          type="text"
          placeholder="Search by keywords"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="artist-sort-wrap" ref={wrapRef}>
          <button
            className="artist-sort"
            type="button"
            aria-haspopup="true"
            aria-expanded={popoverOpen}
            aria-label="Filter by date range"
            onClick={(e) => {
              e.stopPropagation();
              setPopoverOpen((v) => !v);
            }}
          >
            <span>{sortLabel}</span>
          </button>
          {popoverOpen && (
            <div className="artist-date-popover" onClick={(e) => e.stopPropagation()}>
              <div className="artist-date-field">
                <label htmlFor="artist-date-from">From</label>
                <input type="date" id="artist-date-from" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div className="artist-date-field">
                <label htmlFor="artist-date-to">To</label>
                <input type="date" id="artist-date-to" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="artist-date-actions">
                <button type="button" onClick={clearFilter}>
                  Clear
                </button>
                <button type="button" className="artist-date-apply" onClick={applyFilter}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="artist-tweet-list">
        {items.map((t, i) => (
          <button
            key={`${t.date}-${i}`}
            className={`artist-tweet-card corner-brackets${t.linked ? ' linked' : ''}`}
            type="button"
            {...(t.linked
              ? {
                  'aria-label': 'Open the October 8 tweet',
                  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    onOpenTweet({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  },
                }
              : {})}
          >
            <span className="artist-tweet-date">{t.date}</span>
            <span className="artist-tweet-quote">{t.quote}</span>
          </button>
        ))}
      </div>
      {items.length === 0 && <p className="artist-no-results">No tweets match your search.</p>}
    </div>
  );
};
