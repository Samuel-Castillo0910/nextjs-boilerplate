export default function NeuralGlass({ title = "Red de nodos representando un modelo de inteligencia artificial" }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-labelledby="neural-glass-title" width="100%">
      <title id="neural-glass-title">{title}</title>
      <defs>
        <linearGradient id="ng-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ee7df" />
          <stop offset="100%" stopColor="#7c6ff2" />
        </linearGradient>
        <filter id="ng-blur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <circle cx="240" cy="180" r="150" fill="url(#ng-grad)" opacity="0.12" filter="url(#ng-blur)" />

      <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
        <line x1="120" y1="90" x2="240" y2="150" />
        <line x1="120" y1="220" x2="240" y2="150" />
        <line x1="240" y1="150" x2="360" y2="90" />
        <line x1="240" y1="150" x2="360" y2="220" />
        <line x1="120" y1="90" x2="120" y2="220" />
        <line x1="360" y1="90" x2="360" y2="220" />
        <line x1="240" y1="150" x2="240" y2="270" />
        <line x1="120" y1="220" x2="240" y2="270" />
        <line x1="360" y1="220" x2="240" y2="270" />
      </g>

      {[
        [120, 90], [360, 90], [240, 150], [120, 220], [360, 220], [240, 270]
      ].map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 2 ? 20 : 13} fill="rgba(237,239,252,0.9)" stroke="url(#ng-grad)" strokeWidth="2" />
      ))}
    </svg>
  );
}
