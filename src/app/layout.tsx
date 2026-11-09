import type { Metadata, Viewport } from "next";
import { Archivo, Figtree, JetBrains_Mono } from "next/font/google";
import { descricaoPublica, nomePublico, site } from "@/lib/site";
import { IconeSprite } from "@/components/ui/Icone";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const nome = nomePublico();
const descricao = descricaoPublica();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: nome,
    template: `%s · ${nome}`,
  },
  description: descricao,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: nome,
    title: nome,
    description: descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: nome,
    description: descricao,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1A2E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IconeSprite />
        <a
          href="#conteudo"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-[10px] focus-visible:bg-noite focus-visible:px-4 focus-visible:py-3 font-sans font-semibold text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
