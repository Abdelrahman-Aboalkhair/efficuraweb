import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getMember } from "../team-data";

// Per-member social card: name and role in the brand treatment, with the
// member's photo on the right when we have one.
const size = { width: 1200, height: 630 };

const ORANGE = "#b06331";

// generateImageMetadata (rather than static `alt`/`size`/`contentType`
// exports) so each member's card gets its own descriptive alt text.
export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const member = getMember(params.slug);

  return [
    {
      id: "card",
      alt: member
        ? `${member.name} – ${member.role} at efficura`
        : "efficura team",
      size,
      contentType: "image/png",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMember(slug);

  let photoSrc: ArrayBuffer | undefined;
  if (member?.image) {
    const data = await readFile(join(process.cwd(), "public", member.image));
    photoSrc = Uint8Array.from(data).buffer;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000000",
          padding: 80,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: 60,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg width="56" height="57" viewBox="0 0 332 336" fill="none">
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
            <div
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: -1,
              }}
            >
              efficura
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: ORANGE,
                letterSpacing: 6,
              }}
            >
              THE TEAM
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 84,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              {member?.name ?? "About us"}
            </div>
            {member?.role ? (
              <div
                style={{
                  marginTop: 20,
                  fontSize: 36,
                  color: "#d4d4d8",
                  lineHeight: 1.3,
                }}
              >
                {member.role}
              </div>
            ) : null}
          </div>
        </div>

        {photoSrc ? (
          // ImageResponse renders with Satori, which requires an img element.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            // satori accepts an ArrayBuffer for src; the DOM typing doesn't.
            src={photoSrc as unknown as string}
            alt=""
            width={376}
            height={470}
            style={{
              width: 376,
              height: 470,
              objectFit: "cover",
              borderRadius: 12,
              alignSelf: "center",
            }}
          />
        ) : null}
      </div>
    ),
    size
  );
}
