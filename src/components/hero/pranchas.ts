/**
 * Geradores de SVG das pranchas técnicas da hero (planta, unifilar, quadro de
 * cargas, detalhe do quadro, memorial de cálculo). Porte fiel do protótipo D2
 * (referencias/d2/prototipo-d2.html) — mesmos valores técnicos, já revisados.
 * Saída é string estática, sem entrada do usuário: segura para
 * dangerouslySetInnerHTML.
 */

function moldura(): string {
  return '<rect x="26" y="26" width="1362" height="948" class="m3 d" pathLength="1" style="--d:0s"/>';
}

function carimbo(tipo: string, titulo: string, esc: string, folha: string, anima?: boolean): string {
  const x = 1010;
  const y = 812;
  const d = anima ? ' class="m3 d" pathLength="1" style="--d:.5s"' : ' class="m3"';
  return (
    `<g><rect x="${x}" y="${y}" width="352" height="136"${d}/>` +
    `<g class="gb" style="--d:1.2s"><line x1="${x}" y1="${y + 46}" x2="${x + 352}" y2="${y + 46}" class="m1"/>` +
    `<line x1="${x}" y1="${y + 96}" x2="${x + 352}" y2="${y + 96}" class="m1"/>` +
    `<line x1="${x + 230}" y1="${y + 96}" x2="${x + 230}" y2="${y + 136}" class="m1"/>` +
    `<text x="${x + 16}" y="${y + 31}" class="tb">${tipo}</text>` +
    `<text x="${x + 16}" y="${y + 78}">${titulo}</text>` +
    `<text x="${x + 16}" y="${y + 123}" class="ts">${esc}</text>` +
    `<text x="${x + 246}" y="${y + 123}" class="ts">${folha}</text></g></g>`
  );
}

function L(x1: number, y1: number, x2: number, y2: number, c?: string, extra?: string): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c ? ` class="${c}"` : ""}${extra || ""}/>`;
}

function T(x: number, y: number, t: string | number, c?: string): string {
  return `<text x="${x}" y="${y}"${c ? ` class="${c}"` : ""}>${t}</text>`;
}

function fmt(n: number | string): string {
  return typeof n === "number" ? n.toLocaleString("pt-BR") : n;
}

type Carga = [string, string, number | string, number | string, string, string, number | string];

const CARGAS: Carga[] = [
  ["C1", "Ilum. social", 600, 127, "4,7", "1,5", 10],
  ["C2", "Ilum. íntima", 400, 127, "3,1", "1,5", 10],
  ["C3", "Tomadas sala", 1200, 127, "9,4", "2,5", 16],
  ["C4", "Tomadas quartos", 1000, 127, "7,9", "2,5", 16],
  ["C5", "Tomadas cozinha", 2000, 127, "15,7", "2,5", 20],
  ["C6", "Área de serviço", 1500, 127, "11,8", "2,5", 20],
  ["C7", "Chuveiro", 7500, 220, "34,1", "6", 40],
  ["C8", "Ar-cond. suíte", 1400, 220, "6,4", "2,5", 16],
  ["C9", "Ar-cond. sala", 2200, 220, "10,0", "2,5", 16],
  ["C10", "Forno elétrico", 3000, 220, "13,6", "4", 25],
  ["C11", "Micro-ondas", 1500, 127, "11,8", "2,5", 20],
  ["C12", "Reserva", "—", "—", "—", "—", "—"],
];

export function folhaPlanta(): string {
  let s = moldura();
  s += '<rect x="90" y="110" width="870" height="770" class="pa d" pathLength="1" style="--d:.15s"/>';
  const par: [number, number, number, number][] = [
    [90, 470, 300, 470],
    [370, 470, 470, 470],
    [520, 470, 700, 470],
    [770, 470, 960, 470],
    [420, 110, 420, 470],
    [600, 110, 600, 470],
    [620, 470, 620, 700],
    [620, 770, 620, 880],
  ];
  par.forEach((p, k) => {
    s += L(p[0], p[1], p[2], p[3], "pa d", ` pathLength="1" style="--d:${(0.45 + k * 0.05).toFixed(2)}s"`);
  });
  s += '<g class="gb" style="--d:1.05s">';
  [
    [300, 70],
    [470, 50],
    [700, 70],
  ].forEach((p) => {
    const hx = p[0];
    const w = p[1];
    s += L(hx, 470, hx, 470 - w, "") + `<path d="M${hx} ${470 - w} A${w} ${w} 0 0 1 ${hx + w} 470" class="m1"/>`;
  });
  [
    [180, 320],
    [650, 820],
  ].forEach((w) => {
    s +=
      `<rect x="${w[0]}" y="103" width="${w[1] - w[0]}" height="14" class="m1" style="fill:#FCFDFF"/>` +
      L(w[0], 110, w[1], 110, "m1");
  });
  s += '<rect x="953" y="560" width="14" height="170" class="m1" style="fill:#FCFDFF"/>' + L(960, 560, 960, 730, "m1");
  s += '<rect x="200" y="873" width="220" height="14" class="m1" style="fill:#FCFDFF"/>' + L(200, 880, 420, 880, "m1");
  [
    [255, 290],
    [510, 290],
    [780, 290],
    [355, 675],
    [790, 675],
  ].forEach((c) => {
    s +=
      `<circle cx="${c[0]}" cy="${c[1]}" r="17"/><path d="M${c[0] - 12} ${c[1] - 12}l24 24M${c[0] + 12} ${
        c[1] - 12
      }l-24 24" class="m1"/>`;
  });
  [
    [112, 300],
    [398, 200],
    [640, 330],
    [938, 200],
    [112, 640],
    [300, 858],
    [598, 560],
    [640, 820],
    [938, 790],
    [800, 492],
  ].forEach((t) => {
    s += `<polygon points="${t[0] - 10},${t[1] + 8} ${t[0] + 10},${t[1] + 8} ${t[0]},${t[1] - 10}"/>`;
  });
  [
    [330, 440],
    [495, 440],
    [735, 440],
    [600, 500],
  ].forEach((p) => {
    s += T(p[0], p[1], "S", "tb");
  });
  s += '<rect x="104" y="800" width="58" height="34" style="fill:#FCE7C2"/>' + T(133, 823, "QD", "ts mid");
  s += "</g>";
  s += '<g class="gb" style="--d:1.35s">';
  [
    "M133 800 C 150 740, 300 700, 340 682",
    "M120 800 C 108 600, 200 380, 246 302",
    "M162 822 C 400 830, 600 760, 776 684",
    "M162 808 C 420 700, 470 420, 502 304",
    "M162 800 C 500 650, 700 420, 770 302",
  ].forEach((d) => {
    s += `<path d="${d}" class="am tr"/>`;
  });
  const rotulosCircuito: [number, number, string][] = [
    [230, 730, "C1"],
    [150, 520, "C2"],
    [470, 790, "C3"],
    [400, 560, "C4"],
    [600, 560, "C5"],
  ];
  rotulosCircuito.forEach(([x, y, rotulo]) => {
    s += T(x, y, rotulo, "ts tA");
  });
  s += "</g>";
  s += '<g class="gb" style="--d:1.55s">';
  const salas: [string, number, number, string][] = [
    ["QUARTO 1", 255, 232, "11,8 m²"],
    ["BANHO", 510, 232, "6,3 m²"],
    ["QUARTO 2", 780, 232, "12,6 m²"],
    ["SALA", 355, 618, "24,5 m²"],
    ["COZINHA", 790, 618, "14,4 m²"],
  ];
  salas.forEach(([nome, x, y, area]) => {
    s += T(x, y, nome, "tb mid") + T(x, y + 108, area, "ts mid");
  });
  s += L(90, 70, 960, 70, "m1") + L(90, 58, 90, 82, "m1") + L(960, 58, 960, 82, "m1") + T(525, 60, "8,70", "ts mid");
  s +=
    L(52, 110, 52, 880, "m1") +
    L(40, 110, 64, 110, "m1") +
    L(40, 880, 64, 880, "m1") +
    '<text x="44" y="495" class="ts mid" transform="rotate(-90 44 495)">7,70</text>';
  s += '<rect x="1010" y="110" width="352" height="660" class="m3"/>' + T(1032, 152, "LEGENDA", "tb");
  const legenda: [string, string][] = [
    ["luz", "Ponto de luz no teto"],
    ["tom", "Tomada 2P+T · 10 A"],
    ["int", "Interruptor simples"],
    ["cir", "Circuito em eletroduto"],
    ["qd", "Quadro de distribuição"],
  ];
  legenda.forEach((l, k) => {
    const y = 214 + k * 66;
    const x = 1052;
    if (l[0] === "luz")
      s += `<circle cx="${x}" cy="${y - 6}" r="13"/><path d="M${x - 9} ${y - 15}l18 18M${x + 9} ${
        y - 15
      }l-18 18" class="m1"/>`;
    if (l[0] === "tom") s += `<polygon points="${x - 10},${y + 2} ${x + 10},${y + 2} ${x},${y - 16}"/>`;
    if (l[0] === "int") s += T(x - 7, y, "S", "tb");
    if (l[0] === "cir") s += L(x - 18, y - 6, x + 18, y - 6, "am tr");
    if (l[0] === "qd") s += `<rect x="${x - 16}" y="${y - 18}" width="32" height="20" style="fill:#FCE7C2"/>`;
    s += T(1086, y, l[1], "ts");
  });
  s +=
    T(1032, 586, "NOTAS", "tb") +
    T(1032, 622, "1. Cotas em metros.", "ts") +
    T(1032, 652, "2. Seções conforme o", "ts") +
    T(1050, 676, "quadro de cargas.", "ts") +
    T(1032, 706, "3. Tomadas a 0,30 m.", "ts");
  s += "</g>";
  s += carimbo("PROJETO ELÉTRICO", "PLANTA BAIXA · PONTOS", "ESC. 1:50", "FOLHA 01/05", true);
  return s;
}

function disj(x: number, y: number): string {
  return `<rect x="${x}" y="${y - 12}" width="40" height="24"/>` + L(x + 6, y + 9, x + 34, y - 9, "m1");
}

export function folhaUnifilar(): string {
  let s = moldura();
  s += T(80, 98, "DIAGRAMA UNIFILAR · QD-1", "tg");
  s +=
    L(80, 500, 110, 500) +
    '<circle cx="150" cy="500" r="40"/>' +
    T(150, 507, "kWh", "ts mid") +
    L(190, 500, 240, 500);
  s += disj(240, 500) + T(260, 548, "DG 50 A", "ts mid") + L(280, 500, 340, 500);
  s +=
    '<rect x="340" y="474" width="96" height="52"/>' +
    T(388, 507, "DR", "tb mid") +
    T(388, 556, "63 A · 30 mA", "ts mid") +
    L(436, 500, 540, 500);
  s += L(540, 150, 540, 880, "", ' style="stroke-width:9"');
  CARGAS.forEach((c, k) => {
    const y = 172 + k * 54;
    s += L(540, y, 610, y) + disj(610, y) + L(650, y, 700, y) + `<circle cx="706" cy="${y}" r="5"/>`;
    s += T(726, y + 7, c[0], "tb") + T(800, y + 7, c[1], "ts");
    if (c[6] !== "—") s += T(990, y + 7, `${c[6]} A · ${c[5]} mm²`, `ts${c[0] === "C7" ? " tA" : ""}`);
  });
  s += L(540, 860, 470, 860) + '<rect x="418" y="845" width="52" height="30"/>' + T(444, 866, "DPS", "ts mid");
  s += L(444, 875, 444, 905) + L(422, 905, 466, 905) + L(430, 916, 458, 916) + L(438, 927, 450, 927);
  s +=
    T(80, 900, "N", "tb") +
    T(80, 940, "PE", "tb") +
    L(120, 893, 380, 893, "m1") +
    L(120, 933, 380, 933, "m1 tr");
  s += carimbo("PROJETO ELÉTRICO", "DIAGRAMA UNIFILAR", "SEM ESCALA", "FOLHA 02/05");
  return s;
}

export function folhaCargas(): string {
  let s = moldura();
  s +=
    T(80, 98, "QUADRO DE CARGAS · QD-1", "tg") +
    T(80, 136, "Residência unifamiliar · 127/220 V · 140 m²", "ts");
  const cx = [80, 190, 520, 690, 840, 990, 1150, 1334];
  const cab = ["CIRC.", "DESCRIÇÃO", "POT. (W)", "TENSÃO (V)", "CORR. (A)", "SEÇÃO (mm²)", "DISJ. (A)"];
  const y0 = 170;
  const h = 40;
  s += `<rect x="80" y="${y0}" width="1254" height="50" style="fill:#E6EEF9;stroke:none"/>`;
  s += `<rect x="80" y="${y0 + 50 + 6 * h}" width="1254" height="${h}" style="fill:#FDF0D8;stroke:none"/>`;
  cab.forEach((c, k) => {
    s += T(k < 2 ? cx[k] + 14 : cx[k + 1] - 14, y0 + 32, c, `ts${k < 2 ? "" : " fim"}`);
  });
  CARGAS.forEach((c, r) => {
    const y = y0 + 50 + r * h + 27;
    s += T(cx[0] + 14, y, c[0], "tb") + T(cx[1] + 14, y, c[1]);
    [fmt(c[2]), c[3], c[4], c[5], c[6]].forEach((v, k) => {
      s += T(cx[k + 3] - 14, y, v, `fim${c[0] === "C7" ? " tA" : ""}`);
    });
  });
  const yT = y0 + 50 + 12 * h;
  s +=
    `<rect x="80" y="${yT}" width="1254" height="50" style="fill:#E6EEF9;stroke:none"/>` +
    T(94, yT + 32, "TOTAL INSTALADO", "tb") +
    T(cx[3] - 14, yT + 32, "22.300", "tb fim");
  s += `<rect x="80" y="${y0}" width="1254" height="${yT + 50 - y0}" class="m3"/>`;
  for (let r = 0; r <= 12; r++) s += L(80, y0 + 50 + r * h, 1334, y0 + 50 + r * h, "m1");
  cx.slice(1, -1).forEach((x) => {
    s += L(x, y0, x, yT + 50, "m1");
  });
  s +=
    T(80, 830, "NOTAS", "tb") +
    T(80, 866, "Condutores de cobre, isolação PVC 70 °C.", "ts") +
    T(80, 894, "Método de instalação B1 · NBR 5410.", "ts") +
    T(80, 922, "DR 30 mA nos circuitos de áreas molhadas.", "ts");
  s += carimbo("PROJETO ELÉTRICO", "QUADRO DE CARGAS", "—", "FOLHA 03/05");
  return s;
}

export function folhaQuadro(): string {
  let s = moldura();
  s += T(80, 98, "DETALHE DO QUADRO · QD-1", "tg");
  s +=
    '<rect x="220" y="160" width="440" height="680" rx="12" class="m3"/><rect x="250" y="190" width="380" height="620" rx="6" class="m1"/>';
  [310, 480, 650].forEach((y) => {
    s += `<rect x="268" y="${y - 6}" width="344" height="12" class="m1" style="fill:#E6EEF9"/>`;
  });
  function mod(x: number, y: number, w: number, rot?: string): string {
    return (
      `<rect x="${x}" y="${y - 46}" width="${w}" height="92" rx="4"/><rect x="${x + w / 2 - 9}" y="${
        y - 16
      }" width="18" height="30" rx="2" style="fill:#1B3E73;stroke:none"/>` +
      (rot ? T(x + w / 2, y + 36, rot, "ts mid") : "")
    );
  }
  s += mod(278, 310, 62, "DG") + mod(350, 310, 124, "DR") + mod(484, 310, 92, "DPS");
  for (let k = 0; k < 8; k++) s += mod(282 + k * 40, 480, 32, "");
  for (let k = 0; k < 6; k++) s += mod(282 + k * 40, 650, 32, "");
  s +=
    '<rect x="522" y="604" width="32" height="92" rx="4" class="m1 tr"/><rect x="562" y="604" width="32" height="92" rx="4" class="m1 tr"/>';
  s +=
    '<rect x="280" y="752" width="150" height="22" class="m1"/>' +
    T(355, 769, "N", "ts mid") +
    '<rect x="452" y="752" width="150" height="22" class="m1"/>' +
    T(527, 769, "PE", "ts mid");
  const ld: [number, number, number, string][] = [
    [309, 264, 214, "DISJUNTOR GERAL · 50 A"],
    [412, 264, 270, "DR · 63 A · 30 mA"],
    [530, 264, 326, "DPS · CLASSE II · 275 V"],
    [598, 450, 470, "CIRCUITOS C1 A C8"],
    [598, 620, 640, "C9 A C12 + RESERVA"],
    [602, 763, 763, "BARRAMENTOS N E PE"],
  ];
  ld.forEach((l) => {
    s +=
      `<circle cx="${l[0]}" cy="${l[1]}" r="5" style="fill:#2457A6"/>` +
      `<path d="M${l[0]} ${l[1]} L700 ${l[2]} H 730" class="m1"/>` +
      T(742, l[2] + 7, l[3], "ts");
  });
  s += L(220, 132, 660, 132, "m1") + L(220, 120, 220, 144, "m1") + L(660, 120, 660, 144, "m1") + T(440, 122, "440", "ts mid");
  s +=
    L(186, 160, 186, 840, "m1") +
    L(174, 160, 198, 160, "m1") +
    L(174, 840, 198, 840, "m1") +
    '<text x="176" y="500" class="ts mid" transform="rotate(-90 176 500)">680</text>';
  s += T(742, 860, "VISTA FRONTAL · COTAS EM mm", "ts");
  s += carimbo("PROJETO ELÉTRICO", "DETALHE DO QUADRO", "ESC. 1:5", "FOLHA 04/05");
  return s;
}

function barras(y: number, larguras: number[]): string {
  return larguras
    .map((w, k) => `<rect x="80" y="${y + k * 22}" width="${w}" height="9" rx="4.5" style="fill:#D6E2F3;stroke:none"/>`)
    .join("");
}

export function folhaMemorial(): string {
  let s = moldura();
  s += T(80, 98, "MEMORIAL DE CÁLCULO", "tg") + T(80, 136, "Circuito C7 · chuveiro elétrico · 7.500 W", "ts");
  s +=
    T(80, 200, "1. CORRENTE DE PROJETO", "tb") +
    T(80, 246, "Ib = P ÷ V = 7.500 ÷ 220 = 34,1 A", "") +
    barras(270, [560, 470]);
  s +=
    T(80, 360, "2. SEÇÃO DO CONDUTOR", "tb") +
    T(80, 400, "Método B1 · 2 condutores carregados", "ts") +
    T(80, 440, "Seção adotada: 6 mm² · Iz = 41 A ≥ 34,1 A", "") +
    barras(464, [600, 520]);
  s +=
    T(80, 552, "3. PROTEÇÃO", "tb") +
    T(80, 592, "Disjuntor 40 A · curva C · Ib ≤ In ≤ Iz", "") +
    T(80, 628, "DR 30 mA · área molhada", "ts");
  s += T(80, 690, "4. QUEDA DE TENSÃO", "tb") + T(80, 730, "ΔV = 1,8 % ≤ 4 % (limite da NBR 5410)", "");
  s +=
    '<rect x="80" y="770" width="640" height="70" rx="8" class="am" style="fill:#FFF5E2"/>' +
    T(104, 813, "RESULTADO: CONFORME NBR 5410", "tb tA");
  s +=
    '<circle cx="1040" cy="330" r="112" class="am" style="stroke-width:5"/><circle cx="1040" cy="330" r="92" class="am m1"/>';
  s +=
    T(1040, 312, "RESPONSÁVEL", "tb tA mid") +
    T(1040, 342, "TÉCNICO", "tb tA mid") +
    T(1040, 382, "CREA 000000-0", "ts tA mid");
  s +=
    '<path d="M880 590 C 905 540, 940 620, 975 566 S 1030 540, 1062 584 S 1120 552, 1180 576" class="m3"/>' +
    L(860, 620, 1200, 620, "m1") +
    T(1030, 650, "Engenheiro eletricista", "ts mid");
  s += carimbo("MEMORIAL", "DIMENSIONAMENTO C7", "—", "FOLHA 05/05");
  return s;
}

export type Folha = {
  nome: string;
  det: string;
  fn: () => string;
};

export const FOLHAS: Folha[] = [
  { nome: "Planta baixa elétrica", det: "Residência · 140 m²", fn: folhaPlanta },
  { nome: "Diagrama unifilar", det: "Quadro QD-1 · 12 circuitos", fn: folhaUnifilar },
  { nome: "Quadro de cargas", det: "127/220 V · 22,3 kW instalados", fn: folhaCargas },
  { nome: "Detalhe do quadro", det: "Vista frontal · DR e DPS", fn: folhaQuadro },
  { nome: "Memorial de cálculo", det: "Dimensionamento conforme NBR 5410", fn: folhaMemorial },
];
