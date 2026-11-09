import { cn } from "@/lib/cn";

export function IconeSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="i-raio" viewBox="0 0 24 24">
        <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z" />
      </symbol>
      <symbol id="i-casa" viewBox="0 0 24 24">
        <path d="M3 11.2 12 4l9 7.2" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="m12.6 11.5-2.1 3.2h3l-2.1 3.2" />
      </symbol>
      <symbol id="i-quadro" viewBox="0 0 24 24">
        <rect x="4.5" y="3" width="15" height="18" rx="2" />
        <path d="M7.5 8h9M7.5 16h9" />
        <path d="M9 10.5v3M12 10.5v3M15 10.5v3" />
      </symbol>
      <symbol id="i-planta" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <path d="M3 12h7v8M10 4v4.5M14 12h7M14 12v3" />
      </symbol>
      <symbol id="i-lupa" viewBox="0 0 24 24">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20 20-4.6-4.6" />
        <path d="m11.4 7.4-2.2 3.3h2.6l-2.2 3.3" />
      </symbol>
      <symbol id="i-chave" viewBox="0 0 24 24">
        <path d="M14.8 4.2a4.6 4.6 0 0 0-5.5 6.2l-5.6 5.6a1.8 1.8 0 0 0 2.6 2.6l5.6-5.6a4.6 4.6 0 0 0 6.2-5.5l-2.8 2.8-2.4-.6-.6-2.4z" />
      </symbol>
      <symbol id="i-terra" viewBox="0 0 24 24">
        <path d="M12 3v9M5 12h14M7.8 15.5h8.4M10.4 19h3.2" />
      </symbol>
      <symbol id="i-spda" viewBox="0 0 24 24">
        <path d="M12 2.5v4" />
        <path d="M5 21V10.5l7-4 7 4V21z" />
        <path d="m12.8 11-2.3 3.4h3l-2.3 3.4" />
      </symbol>
      <symbol id="i-padrao" viewBox="0 0 24 24">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <circle cx="12" cy="9.5" r="3.2" />
        <path d="m12 9.5 1.7-1.7M9 16h6" />
      </symbol>
      <symbol id="i-carro" viewBox="0 0 24 24">
        <path d="M4.5 16v-4.5l2-5h11l2 5V16z" />
        <path d="M4.5 16v2.5M19.5 16v2.5M4.5 11.5h15" />
        <path d="m12.7 7.8-1.6 2.4h2l-1.6 2.4" />
      </symbol>
      <symbol id="i-escudo" viewBox="0 0 24 24">
        <path d="M12 3 19 6v5.2c0 4.4-3 8.2-7 9.8-4-1.6-7-5.4-7-9.8V6z" />
        <path d="m9 12 2.2 2.2L15.3 10" />
      </symbol>
      <symbol id="i-alerta" viewBox="0 0 24 24">
        <path d="M12 3.5 2.8 19.5h18.4z" />
        <path d="M12 10v4.2M12 17v.1" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </symbol>
      <symbol id="i-seta" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </symbol>
      <symbol id="i-chev" viewBox="0 0 24 24">
        <path d="m9 6 6 6-6 6" />
      </symbol>
      <symbol id="i-baixo" viewBox="0 0 24 24">
        <path d="m6 9 6 6 6-6" />
      </symbol>
      <symbol id="i-mais" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </symbol>
      <symbol id="i-fechar" viewBox="0 0 24 24">
        <path d="M6 6l12 12M18 6 6 18" />
      </symbol>
      <symbol id="i-menu" viewBox="0 0 24 24">
        <path d="M4 7h16M4 12h16M4 17h10" />
      </symbol>
      {/* Glifo oficial do WhatsApp (Simple Icons, licença CC0): preenchido, não de traço. */}
      <symbol id="i-whats" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          stroke="none"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
        />
      </symbol>
      <symbol id="i-indice" viewBox="0 0 24 24">
        <path d="M9 6.5h11M9 12h11M9 17.5h11" />
        <circle cx="4.6" cy="6.5" r="1" />
        <circle cx="4.6" cy="12" r="1" />
        <circle cx="4.6" cy="17.5" r="1" />
      </symbol>
      <symbol id="i-relogio" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </symbol>
      <symbol id="i-doc" viewBox="0 0 24 24">
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12h6M9 16h4" />
      </symbol>
    </svg>
  );
}

export function Icone({ nome, className }: { nome: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6 shrink-0", className)}
    >
      <use href={`#i-${nome}`} />
    </svg>
  );
}
