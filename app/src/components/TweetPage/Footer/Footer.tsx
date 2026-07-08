import './Footer.css';

export function Footer() {
  return (
    <div className="m-footer">
      <p className="m-footer-title">Sources</p>
      <ul className="m-footer-sources">
        <li>
          <span className="lbl">Tweet & removal</span> — Twitter/X archive; Guardian, BBC
        </li>
        <li>
          <span className="lbl">WLM shirt</span> — Vogue, GQ, Dazed, Oct 3 2022
        </li>
        <li>
          <span className="lbl">Business fallout</span> — Forbes Oct 25 2022; Adidas & Gap statements
        </li>
        <li>
          <span className="lbl">ADL report</span> — ADL 2022 Audit of Antisemitic Incidents
        </li>
      </ul>
    </div>
  );
}
