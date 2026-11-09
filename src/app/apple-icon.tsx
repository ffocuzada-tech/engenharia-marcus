import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0F1E33",
          padding: 30,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 36 36">
          <path d="M1 35 L35 1 L35 35 Z" fill="#F2B417" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#F3F1EA" strokeWidth="2" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
