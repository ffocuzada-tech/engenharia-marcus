const NUMERO_MARCADOR = "55XXXXXXXXXXX";
const EXIBICAO_MARCADOR = "(XX) X XXXX-XXXX";

function numeroLimpo(): string | null {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP;

  if (!numero) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_WHATSAPP não configurado — usando marcador. Defina em .env.local ou na Vercel."
      );
    }
    return null;
  }

  return numero.replace(/\D/g, "");
}

export function waLink(texto: string): string {
  const numero = numeroLimpo() ?? NUMERO_MARCADOR;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function telefoneE164(): string | null {
  const numero = numeroLimpo();
  return numero ? `+${numero}` : null;
}

export function whatsappExibicao(): string {
  const digitos = numeroLimpo();
  if (!digitos) return EXIBICAO_MARCADOR;

  const semDdi = digitos.startsWith("55") ? digitos.slice(2) : digitos;
  const ddd = semDdi.slice(0, 2);
  const linha = semDdi.slice(2);

  if (linha.length === 9) {
    return `(${ddd}) ${linha.slice(0, 1)} ${linha.slice(1, 5)}-${linha.slice(5)}`;
  }

  if (linha.length === 8) {
    return `(${ddd}) ${linha.slice(0, 4)}-${linha.slice(4)}`;
  }

  return EXIBICAO_MARCADOR;
}
