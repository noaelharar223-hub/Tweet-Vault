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
        <svg viewBox="0 0 32 32" fill="none" width="20" height="20" aria-hidden="true">
          <path
            d="M13.0801 11.5195H9.59961C9.21565 11.5196 8.95996 11.7762 8.95996 12.1602V23.6797C8.95996 24.0637 9.21565 24.3203 9.59961 24.3203H22.3994C22.7834 24.3203 23.04 24.0637 23.04 23.6797V12.1602C23.04 11.7762 22.7834 11.5195 22.3994 11.5195H18.9199V10.2402H22.3994C23.4874 10.2402 24.3193 11.0722 24.3193 12.1602V23.6797C24.3193 24.7677 23.4874 25.5996 22.3994 25.5996H9.59961C8.51165 25.5996 7.67969 24.7677 7.67969 23.6797V12.1602C7.67969 11.0722 8.51165 10.2403 9.59961 10.2402H13.0801V11.5195ZM20.2881 7.87207L19.3916 8.76758L16.6396 6.01562V17.9199H15.3594V6.01562L12.6074 8.76758L11.7119 7.87207L16 3.58398L20.2881 7.87207Z"
            fill="white"
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
