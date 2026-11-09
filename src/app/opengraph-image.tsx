import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "src/app/og-fonts");
  const [plexSansBold, plexMonoRegular, plexMonoSemiBold] = await Promise.all([
    readFile(join(fontsDir, "IBMPlexSans-Bold.ttf")),
    readFile(join(fontsDir, "IBMPlexMono-Regular.ttf")),
    readFile(join(fontsDir, "IBMPlexMono-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F3F1EA",
          backgroundImage:
            "linear-gradient(rgba(15,30,51,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,30,51,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "32px 56px",
            borderBottom: "1px solid rgba(15,30,51,0.25)",
            fontFamily: "Plex Mono",
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4B5A6E",
          }}
        >
          <span>FOLHA 01 / 11 · APRESENTAÇÃO</span>
          <span>ESC. 1:1 · REV. 2026</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Plex Sans",
              fontWeight: 700,
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#0F1E33",
              maxWidth: 940,
            }}
          >
            {site.tituloHero}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 56px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              backgroundColor: "#F2B417",
              color: "#0F1E33",
              padding: "20px 28px",
              boxShadow: "8px 8px 0 rgba(15,30,51,0.12)",
            }}
          >
            <span style={{ fontFamily: "Plex Sans", fontWeight: 700, fontSize: 24 }}>
              {site.nome}
            </span>
            <span
              style={{
                fontFamily: "Plex Mono",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.04em",
              }}
            >
              ART · NBR 5410
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex Sans", data: plexSansBold, weight: 700, style: "normal" },
        { name: "Plex Mono", data: plexMonoRegular, weight: 400, style: "normal" },
        { name: "Plex Mono", data: plexMonoSemiBold, weight: 600, style: "normal" },
      ],
    }
  );
}
