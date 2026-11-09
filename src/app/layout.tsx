import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { descricaoPublica, nomePublico, site } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  themeColor: "#0F1E33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#conteudo"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:border-[1.5px] focus-visible:border-ink focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 font-mono text-label text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
