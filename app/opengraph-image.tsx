import { ImageResponse } from "next/og";

// Site-wide default social card. Any route segment can override it by adding
// its own opengraph-image file (see app/martley-capital/opengraph-image.tsx).
export const alt =
  "efficura: the first AI-native system of record for real-estate debt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 80,
        }}
      >
        {/* The two-circle mark from public/efficura.svg, redrawn inline in
            white for the dark ground. */}
        <svg width="120" height="121" viewBox="0 0 332 336" fill="none">
          <path
            d="M109.6 123.122C164.749 123.122 209.7 168.471 209.7 224.713C209.699 280.954 164.748 326.3 109.6 326.3C54.452 326.299 9.50106 280.954 9.5 224.713C9.5 168.471 54.4511 123.123 109.6 123.122Z"
            stroke="#ffffff"
            strokeWidth="19"
          />
          <path
            d="M221.721 9.5C276.87 9.5 321.821 54.849 321.821 111.091C321.82 167.332 276.869 212.678 221.721 212.678C166.573 212.677 121.622 167.332 121.621 111.091C121.621 54.8495 166.572 9.50057 221.721 9.5Z"
            stroke="#ffffff"
            strokeWidth="19"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: -4,
            }}
          >
            efficura
          </div>
          {/* Manual two-line break so "real-estate" never splits at its hyphen. */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              fontSize: 40,
              color: "#d4d4d8",
              lineHeight: 1.3,
            }}
          >
            <div>The first AI-native system of record</div>
            <div>for real-estate debt.</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
