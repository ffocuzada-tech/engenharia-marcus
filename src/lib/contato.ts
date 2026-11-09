const NUMERO_MARCADOR = "55XXXXXXXXXXX";

function numeroWhatsapp(): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP;

  if (!numero) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_WHATSAPP não configurado — usando marcador. Defina em .env.local ou na Vercel."
      );
    }
    return NUMERO_MARCADOR;
  }

  return numero;
}

export function waLink(texto: string): string {
  return `https://wa.me/${numeroWhatsapp()}?text=${encodeURIComponent(texto)}`;
}
