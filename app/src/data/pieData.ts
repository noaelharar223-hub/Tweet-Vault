export interface PieSlice {
  name: string;
  amount: number;
  display: string;
  color: string;
  date: string;
  desc: string;
}

export const PIE_DATA: PieSlice[] = [
  {
    name: 'Adidas',
    amount: 1500,
    display: '~$1.5B',
    color: '#fa181b',
    date: 'Oct 25, 2022',
    desc: 'On October 25, Adidas issued a formal statement ending the Yeezy partnership. It was the most lucrative celebrity-brand deal in history, generating ~$1.5B in annual revenue. Forbes stripped Kanye of billionaire status the same day.',
  },
  {
    name: 'Gap',
    amount: 970,
    display: '~$970M',
    color: '#b01215',
    date: 'Sep 15, 2022',
    desc: 'Gap ended the Yeezy Gap deal early — a 10-year partnership signed in 2020 reportedly worth up to $1B. Gap removed all Yeezy product from stores and its website. The deal had been seen as a creative lifeline for the struggling retailer.',
  },
  {
    name: 'Balenciaga',
    amount: 200,
    display: '~$200M (est.)',
    color: '#7a0e10',
    date: 'Oct 21, 2022',
    desc: "Balenciaga severed its creative partnership with Kanye. The two had collaborated extensively on runway and streetwear. Demna Gvasalia had been one of Kanye's closest creative collaborators. Estimated deal value is approximate.",
  },
  {
    name: 'CAA',
    amount: 100,
    display: '~$100M (est.)',
    color: '#553a3a',
    date: 'Oct 22, 2022',
    desc: 'Creative Artists Agency dropped Kanye, cutting off his booking pipeline for tours, brand deals, and film projects. CAA had represented him since early in his career. Without major agency representation, future revenue deals become significantly harder to close.',
  },
  {
    name: 'Foot Locker',
    amount: 100,
    display: '~$100M (est.)',
    color: '#3a3030',
    date: 'Oct 25, 2022',
    desc: 'Foot Locker pulled Yeezy product from its shelves following the Adidas announcement. As a major retail partner for Yeezy sneakers, the loss extended the financial impact beyond the Adidas deal. Value is an estimate based on reported Yeezy retail volumes.',
  },
  {
    name: 'Other',
    amount: 130,
    display: '~$130M (est.)',
    color: '#252020',
    date: 'Oct–Nov 2022',
    desc: 'Includes: JPMorgan Chase severing his business banking; TJX (TJ Maxx, Marshalls) pulling Yeezy globally; MRC scrapping a completed Kanye documentary; Vogue / Condé Nast ending editorial partnerships; and his personal attorney withdrawing at maximum legal exposure.',
  },
];

export const PIE_TOTAL = PIE_DATA.reduce((s, d) => s + d.amount, 0);

export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function slicePath(cx: number, cy: number, r: number, innerR: number, startAngle: number, endAngle: number) {
  const s1 = polarToCartesian(cx, cy, r, startAngle);
  const e1 = polarToCartesian(cx, cy, r, endAngle);
  const s2 = polarToCartesian(cx, cy, innerR, endAngle);
  const e2 = polarToCartesian(cx, cy, innerR, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${r} ${r} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ');
}
