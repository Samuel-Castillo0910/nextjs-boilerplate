export default function ChipGlass({ title = "Chip estilizado representando cómputo de inteligencia artificial" }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-labelledby="chip-glass-title" width="100%">
      <title id="chip-glass-title">{title}</title>
      <defs>
        <linearGradient id="cg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c6ff2" />
          <stop offset="100%" stopColor="#5ee7df" />
        </linearGradient>
      </defs>
      <rect x="55" y="55" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="url(#cg-grad)" strokeWidth="2" />
      <rect x="80" y="80" width="40" height="40" rx="8" fill="url(#cg-grad)" opacity="0.7" />
      {[30, 60, 90, 120, 150].map((y) => (
        <line key={`l-${y}`} x1="20" y1={y} x2="55" y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      ))}
      {[30, 60, 90, 120, 150].map((y) => (
        <line key={`r-${y}`} x1="145" y1={y} x2="180" y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      ))}
    </svg>
  );
}
