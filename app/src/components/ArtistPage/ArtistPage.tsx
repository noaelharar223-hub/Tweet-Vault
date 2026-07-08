import { useRef } from 'react';
import { ArtistHero } from './ArtistHero/ArtistHero';
import { TweetList } from './TweetList/TweetList';
import './ArtistPage.css';

export function ArtistPage({
  onOpenTweet,
  onOpenHome,
}: {
  onOpenTweet: (origin: { x: number; y: number }) => void;
  onOpenHome: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="artist-page">
      <ArtistHero
        onScrollToList={() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        onOpenHome={onOpenHome}
      />
      <TweetList onOpenTweet={onOpenTweet} listRef={listRef} />
    </div>
  );
}
