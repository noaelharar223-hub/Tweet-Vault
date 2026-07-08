import type { ReactNode } from 'react';

export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div id="mockup-overlay">
      <div className="iphone-shell">
        <div className="iphone-vol-mute" />
        <div className="iphone-vol-up" />
        <div className="iphone-vol-down" />
        <div className="iphone-screen-bezel" />
        <div className="iphone-screen">
          <div className="iphone-island" />
          {children}
        </div>
      </div>
    </div>
  );
}
