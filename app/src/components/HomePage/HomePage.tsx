import { useState } from 'react';
import { CELEBRITIES } from '../../data/celebrities';
import '../shared/CornerBrackets.css';
import './HomePage.css';

export function HomePage({ onOpenArtist }: { onOpenArtist: (origin: { x: number; y: number }) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.trim().toLowerCase();
  const items = CELEBRITIES.filter((c) => !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

  return (
    <div className="home-page">
      <svg className="home-logo" viewBox="0 0 146 11.0001" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tweet Vault.">
        <path d="M13.2958 0.153004V2.49244H8.03933V10.9981H5.25648V2.49244H0V0.153004H13.2958Z" fill="white" />
        <path
          d="M33.6443 0.153004H36.659L32.392 10.9981H28.5424L25.3576 2.83329L22.1573 10.9981H18.3232L14.0561 0.153004H17.0554L20.2557 8.67413L23.6415 0.153004H27.0582L30.4595 8.68962L33.6443 0.153004Z"
          fill="white"
        />
        <path
          d="M48.7511 2.3685H40.0934V4.5685H48.7511V6.58258H40.0934V8.78258H48.7511V10.9981H37.3105V0.153004H48.7511V2.3685Z"
          fill="white"
        />
        <path
          d="M61.2069 2.3685H52.5491V4.5685H61.2069V6.58258H52.5491V8.78258H61.2069V10.9981H49.7663V0.153004H61.2069V2.3685Z"
          fill="white"
        />
        <path d="M75.2727 0.153004V2.49244H70.0162V10.9981H67.2333V2.49244H61.9769V0.153004H75.2727Z" fill="white" />
        <path d="M93.9273 5.66214e-05H97.0502L91.4845 10.8451H87.6813L82.1156 5.66214e-05H85.2386L89.5829 8.78456L93.9273 5.66214e-05Z" fill="white" />
        <path
          d="M104.965 10.8451L103.805 8.53668H97.3275L96.168 10.8451H93.1069L98.688 5.66214e-05H102.445L108.041 10.8451H104.965ZM98.3634 6.46062H102.77L100.574 2.06062L98.3634 6.46062Z"
          fill="white"
        />
        <path
          d="M121.27 5.4071C121.27 9.17189 119.214 11.0001 114.467 11.0001C109.706 11.0001 107.665 9.18738 107.665 5.4071V5.66214e-05H110.448V5.4071C110.448 6.92541 110.865 8.66062 114.467 8.66062C118.07 8.66062 118.487 6.90992 118.487 5.4071V5.66214e-05H121.27V5.4071Z"
          fill="white"
        />
        <path d="M125.213 8.50569H133.562V10.8451H122.431V5.66214e-05H125.213V8.50569Z" fill="white" />
        <path d="M143.996 5.66214e-05V2.33949H138.74V10.8451H135.957V2.33949H130.701V5.66214e-05H143.996Z" fill="white" />
        <path d="M143.356 8.76907H146V10.8451H143.356V8.76907Z" fill="white" />
      </svg>

      <div className="home-search-bar">
        <input
          className="home-search-input"
          type="text"
          placeholder="Search by keywords / name"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="home-sort">
          <span>Sort by Date</span>
        </div>
      </div>

      <div className="home-celeb-list">
        {items.map((c, i) => (
          <button
            key={`${c.name}-${c.category}-${i}`}
            className={`home-celeb-card corner-brackets${c.linked ? ' linked' : ''}`}
            type="button"
            {...(c.linked
              ? {
                  'aria-label': `Open the ${c.name} page`,
                  onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    onOpenArtist({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  },
                }
              : {})}
          >
            <div className="home-celeb-photo">
              <img src={c.photo} alt="" style={c.objectPosition ? { objectPosition: c.objectPosition } : undefined} />
            </div>
            <div className="home-celeb-info">
              <div className="home-celeb-heading">
                <span className="home-celeb-name">{c.name}</span>
                <span className="home-celeb-category">{c.category}</span>
              </div>
              <span className="home-celeb-count">{c.tweetCount} deleted tweets</span>
            </div>
          </button>
        ))}
        {items.length === 0 && <p className="home-no-results">No results match your search.</p>}
      </div>
    </div>
  );
}
