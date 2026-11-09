/**
 * Ilustrações em traço dos 4 cards de serviços (porte fiel do protótipo D2).
 * JSX estático, sem entrada do usuário.
 */

export function IlustracaoInstalacao() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true">
      <rect x="88" y="12" width="64" height="88" rx="6" />
      <path d="M98 30h44M98 82h44" />
      <rect x="100" y="42" width="8" height="24" rx="2" />
      <rect x="116" y="42" width="8" height="24" rx="2" />
      <rect x="132" y="42" width="8" height="24" rx="2" />
      <path className="a" d="M120 100v18H40v-14" />
      <rect x="30" y="86" width="20" height="18" rx="3" />
      <path className="a" d="M152 40h52v16" />
      <circle cx="204" cy="68" r="11" />
      <path className="a pulsa" d="M204 86v6M190 82l-4 4M218 82l4 4" />
      <path className="f" d="m123 16-6 10h5l-2 8 7-11h-5z" />
    </svg>
  );
}

export function IlustracaoProjeto() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true">
      <path d="M30 24h180M30 20v8M210 20v8" />
      <text x="112" y="16">
        8,70
      </text>
      <rect x="30" y="36" width="180" height="94" rx="2" />
      <path d="M30 80h60M110 80h100M120 36v26M120 80v50" />
      <path d="M90 80a20 20 0 0 1 20-20" />
      <circle cx="75" cy="58" r="6" />
      <circle cx="165" cy="58" r="6" />
      <circle cx="75" cy="106" r="6" />
      <circle cx="165" cy="106" r="6" />
      <path
        className="a pulsa"
        d="M44 124C70 120 70 70 75 64M44 124c50 0 110-20 121-12M44 124c40-6 110-40 121-60"
        strokeDasharray="5 5"
      />
      <rect className="fb" x="38" y="118" width="12" height="9" rx="1.5" />
    </svg>
  );
}

export function IlustracaoInspecao() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true">
      <defs>
        <radialGradient id="serv-calor">
          <stop offset="0" stopColor="#FFB21E" stopOpacity=".95" />
          <stop offset=".55" stopColor="#FF7A1A" stopOpacity=".45" />
          <stop offset="1" stopColor="#FF7A1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="34" y="16" width="72" height="104" rx="6" />
      <rect x="46" y="38" width="9" height="26" rx="2" />
      <rect x="62" y="38" width="9" height="26" rx="2" />
      <rect x="78" y="38" width="9" height="26" rx="2" />
      <rect x="46" y="76" width="9" height="26" rx="2" />
      <rect x="62" y="76" width="9" height="26" rx="2" />
      <rect x="78" y="76" width="9" height="26" rx="2" />
      <circle className="calor pulsa" cx="66" cy="89" r="22" />
      <g className="mov">
        <circle cx="160" cy="70" r="32" />
        <path d="m183 93 22 22" />
        <path className="a" d="M148 70h8l4-10 6 20 4-10h8" />
      </g>
      <text x="140" y="126">
        68,4 °C
      </text>
    </svg>
  );
}

export function IlustracaoManutencao() {
  return (
    <svg viewBox="0 0 240 140" aria-hidden="true">
      <rect x="30" y="22" width="104" height="100" rx="8" />
      <path d="M30 44h104M54 14v16M110 14v16" />
      <path d="M44 62h12M66 62h12M88 62h12M110 62h12M44 82h12M66 82h12M88 82h12M110 82h12M44 102h12M66 102h12" />
      <path className="a" d="m86 98 6 6 10-12M42 58l6 6 10-12" />
      <g className="mov">
        <path d="M196 34a18 18 0 0 0-21 24l-24 24a6.5 6.5 0 0 0 9 9l24-24a18 18 0 0 0 24-21l-11 11-9-2-2-9z" />
      </g>
    </svg>
  );
}
