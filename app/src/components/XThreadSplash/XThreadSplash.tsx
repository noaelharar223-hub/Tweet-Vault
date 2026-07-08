import './XThreadSplash.css';

export function XThreadSplash({ hidden, onOpenBreakdown }: { hidden: boolean; onOpenBreakdown: () => void }) {
  return (
    <div id="x-thread-screen" className={hidden ? 'x-hidden' : ''}>
      <div className="x-status-bar">
        <span className="x-time">9:41</span>
        <div className="x-status-icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white" opacity="0.4" />
            <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="white" opacity="0.4" />
            <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="white" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.3px' }}>4G</span>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" />
            <rect x="1.5" y="1.5" width="19" height="9" rx="2.5" fill="white" />
            <path d="M22.5 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      <div className="x-nav-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="x-nav-title">Post</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="12" r="1.5" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
          <circle cx="19" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      <div className="x-scroll">
        <div className="x-post-main">
          <div className="x-post-left">
            <div className="x-avatar x-avatar-main">
              <img
                src="/kanye.webp"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(1)' }}
              />
            </div>
            <div className="x-thread-line" />
          </div>
          <div className="x-post-right">
            <div className="x-post-header">
              <div>
                <span className="x-name">Anonymous</span>
                <span className="x-handle">@anon_user</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="x-post-body">Anyone have the Kanye deleted tweet? Can't find the original anywhere</div>
            <div className="x-post-meta">
              9:41 PM · Oct 9, 2022 · <strong>14.2K</strong> Views
            </div>
            <div className="x-post-actions">
              <span className="x-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.501 3.858 7.501 7.99 0 4.134-3.345 8.01-7.501 8.01h-1.026a2 2 0 00-1.414.586l-2.097 2.097c-.44.44-1.19.128-1.19-.49v-2.475a2 2 0 00-2-2A5.998 5.998 0 011.75 10z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                  />
                </svg>{' '}
                47
              </span>
              <span className="x-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5a4 4 0 01-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5a4 4 0 014 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </svg>
              </span>
              <span className="x-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </svg>{' '}
                12
              </span>
              <span className="x-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" fill="white" fillOpacity="0.5" />
                </svg>{' '}
                14.2K
              </span>
              <span className="x-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="x-divider" />
        <div className="x-replies-label">
          Relevant{' '}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
            <path d="M6 9l6 6 6-6" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="x-reply">
          <div className="x-post-left">
            <div className="x-avatar">
              <img
                src="/wlm-shirt.jpg"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(1)' }}
              />
            </div>
            <div className="x-thread-line" />
          </div>
          <div className="x-post-right">
            <div className="x-post-header">
              <div>
                <span className="x-name">archivist</span>
                <span className="x-handle">@thread_archive · 2h</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="x-reply-body">
              found it, someone made a full breakdown{' '}
              <span className="x-link" id="x-thread-link" onClick={onOpenBreakdown}>
                TweetVault.com/breakdown
              </span>
            </div>
            <div className="x-link-card" id="x-link-card" onClick={onOpenBreakdown}>
              <div className="x-link-card-img">
                <svg width="360" height="233" viewBox="0 0 360 233" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="360" height="233" fill="#141820" />
                  <path d="M102.863 76V83.322H86.3123V109.943H77.5503V83.322H61V76H102.863Z" fill="white" />
                  <path
                    d="M166.931 76H176.423L162.988 109.943H150.867L140.84 84.3888L130.763 109.943H118.691L105.257 76H114.7L124.776 102.67L135.436 76H146.194L156.903 102.718L166.931 76Z"
                    fill="white"
                  />
                  <path
                    d="M214.495 82.9341H187.236V89.8197H214.495V96.1234H187.236V103.009H214.495V109.943H178.474V76H214.495V82.9341Z"
                    fill="white"
                  />
                  <path
                    d="M253.713 82.9341H226.454V89.8197H253.713V96.1234H226.454V103.009H253.713V109.943H217.692V76H253.713V82.9341Z"
                    fill="white"
                  />
                  <path d="M298 76V83.322H281.45V109.943H272.688V83.322H256.137V76H298Z" fill="white" />
                  <path d="M98.1895 122.572H108.022L90.4985 156.515H78.5239L61 122.572H70.8328L84.5112 150.066L98.1895 122.572Z" fill="white" />
                  <path
                    d="M132.942 156.515L129.291 149.29H108.896L105.245 156.515H95.6066L113.179 122.572H125.008L142.629 156.515H132.942ZM112.157 142.792H126.03L119.118 129.021L112.157 142.792Z"
                    fill="white"
                  />
                  <path
                    d="M184.279 139.495C184.279 151.278 177.805 157 162.861 157C147.869 157 141.443 151.327 141.443 139.495V122.572H150.205V139.495C150.205 144.247 151.519 149.678 162.861 149.678C174.203 149.678 175.517 144.199 175.517 139.495V122.572H184.279V139.495Z"
                    fill="white"
                  />
                  <path d="M196.696 149.193H222.982V156.515H187.934V122.572H196.696V149.193Z" fill="white" />
                  <path d="M255.835 122.572V129.894H239.285V156.515H230.523V129.894H213.973V122.572H255.835Z" fill="white" />
                  <path d="M253.82 150.017H262.143V156.515H253.82V150.017Z" fill="white" />
                </svg>
              </div>
              <div className="x-link-card-text">
                <div className="x-link-card-domain">TweetVault.com</div>
                <div className="x-link-card-title">The Kanye DEFCON Tweet — Full Breakdown</div>
              </div>
            </div>
            <div className="x-post-actions" style={{ marginTop: 10 }}>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.501 3.858 7.501 7.99 0 4.134-3.345 8.01-7.501 8.01h-1.026a2 2 0 00-1.414.586l-2.097 2.097c-.44.44-1.19.128-1.19-.49v-2.475a2 2 0 00-2-2A5.998 5.998 0 011.75 10z"
                    stroke="white"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />
                </svg>{' '}
                1
              </span>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5a4 4 0 01-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5a4 4 0 014 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
              </span>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
              </span>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" fill="white" fillOpacity="0.4" />
                </svg>{' '}
                141
              </span>
            </div>
          </div>
        </div>

        <div className="x-reply">
          <div className="x-post-left">
            <div className="x-avatar">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#1d9bf0,#0d4f8c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                K
              </div>
            </div>
          </div>
          <div className="x-post-right">
            <div className="x-post-header">
              <div>
                <span className="x-name">kanyearchive</span>
                <span className="x-handle">@yehistory · 4h</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="x-reply-body">twitter removed it after 18 hours but screenshots are everywhere. the DEFCON one right?</div>
            <div className="x-post-actions" style={{ marginTop: 10 }}>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.501 3.858 7.501 7.99 0 4.134-3.345 8.01-7.501 8.01h-1.026a2 2 0 00-1.414.586l-2.097 2.097c-.44.44-1.19.128-1.19-.49v-2.475a2 2 0 00-2-2A5.998 5.998 0 011.75 10z"
                    stroke="white"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />
                </svg>{' '}
                3
              </span>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5a4 4 0 01-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5a4 4 0 014 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
              </span>
              <span className="x-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>{' '}
                28
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="x-bottom-nav">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703 1.033-1.434 1.033H7.36c-.727 0-1.324-.427-1.43-1.018L4.31 8.573l7.69-4.154 7.69 4.154-1.87 11.13z" />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5 4.694 0 8.5 3.806 8.5 8.5 0 1.986-.682 3.815-1.814 5.262l4.276 4.276-1.414 1.414-4.276-4.276C13.815 19.818 11.986 20.5 10.25 20.5c-4.694 0-8.5-3.806-8.5-8.5z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.25" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V15.5c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5V5.5zm2.5-.5c-.276 0-.5.224-.5.5V15.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5V5.5c0-.276-.224-.5-.5-.5h-15z"
            fill="white"
            fillOpacity="0.5"
          />
          <path d="M12 10.368l7.73-4.438.992 1.728L12 13.13 3.278 7.658l.992-1.728L12 10.368z" fill="white" fillOpacity="0.5" />
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
