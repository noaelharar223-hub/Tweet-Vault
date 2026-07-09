import { useEffect, useRef, useState } from 'react';
import './ShareButton.css';

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function shareVia(platform: 'x' | 'whatsapp' | 'email') {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Tweet Vault');
    const targets = {
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      email: `mailto:?subject=${text}&body=${url}`,
    };
    window.open(targets[platform], '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  return (
    <div className="share-button-wrap" ref={wrapRef}>
      <button
        className="share-button"
        type="button"
        aria-label="Share"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .1 2.8l-6.2 3.6a3 3 0 1 0 0 3.2l6.2 3.6A3 3 0 1 0 15.9 15l-6.2-3.6a3 3 0 0 0 0-1.8l6.2-3.6c.31.28.68.5 1.1.63A3 3 0 0 0 18 8Z"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="share-popover" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="share-option" onClick={copyLink}>
            <span>{copied ? 'Copied!' : 'Copy link'}</span>
          </button>
          <button type="button" className="share-option" onClick={() => shareVia('x')}>
            <span>Share to X</span>
          </button>
          <button type="button" className="share-option" onClick={() => shareVia('whatsapp')}>
            <span>Share to WhatsApp</span>
          </button>
          <button type="button" className="share-option" onClick={() => shareVia('email')}>
            <span>Share via Email</span>
          </button>
        </div>
      )}
    </div>
  );
}
