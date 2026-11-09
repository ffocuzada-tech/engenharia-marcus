/**
 * Ícones dos 4 cards de diferenciais (porte fiel do protótipo D2). Os traços
 * com className "d2" e pathLength=1 se desenham ao entrar na tela (ver
 * Diferenciais.css, selo .dif-card.revela-pre).
 */

export function IconeEquipe() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <circle className="d2" pathLength={1} cx="11" cy="10" r="4.2" />
      <path className="d2" pathLength={1} d="M3.5 24a7.5 7.5 0 0 1 15 0" />
      <circle className="d2" pathLength={1} cx="21.5" cy="11.5" r="3.2" />
      <path className="d2" pathLength={1} d="M19.6 17.6A6 6 0 0 1 27 23" />
    </svg>
  );
}

export function IconePlanejamento() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <rect className="d2" pathLength={1} x="6" y="5" width="18" height="21" rx="2.5" />
      <path className="d2" pathLength={1} d="M11 5V3.5h8V5" />
      <path className="d2" pathLength={1} d="m10 13 2 2 4-4M10 20l2 2 4-4M18.5 14h2M18.5 21h2" />
    </svg>
  );
}

export function IconeAtendimento() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <path className="d2" pathLength={1} d="M5 6h20v13H12l-7 5.5z" />
      <path className="d2" pathLength={1} d="M10 11h10M10 15h6" />
    </svg>
  );
}

export function IconePontualidade() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <circle className="d2" pathLength={1} cx="14" cy="15" r="10" />
      <path className="d2" pathLength={1} d="M14 9.5V15l3.5 2.5" />
      <path className="d2" pathLength={1} d="m20.5 24 2.5 2.5 5-5" />
    </svg>
  );
}
