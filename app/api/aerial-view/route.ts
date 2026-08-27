// Looks up one specific pre-rendered Google Aerial View flyover - the orbit MP4s
// plus the still frame the client paints while the video loads - and hands the
// client only the signed URIs. The clip was generated once via the Aerial View
// `videos:renderVideo` endpoint for Salesforce Tower - a famous US landmark that
// stands in for the fictional asset the product mock portrays (Aerial View
// covers US addresses only) - and the route pins to the resulting videoId: it
// can't be used as an open lookup proxy, and the API key never leaves the server.
//
// Google bills every lookup that returns URIs, so the upstream fetch is cached
// for five minutes - one billable call serves every visitor in the window,
// capping spend at ~12 lookups/hour no matter the traffic. The returned URIs
// are signed and short-lived; per the Maps ToS they must be used immediately
// and never downloaded or stored, which is why the cache window stays small.
// (videoIds, unlike those URIs, may be stored - hence the constant below.)

// Salesforce Tower - "415 Mission St, San Francisco, CA 94105".
const VIDEO_ID = "su2gt2oNkGEzFKjzt-09MW";

type OrientedUris = { landscapeUri: string; portraitUri: string };

export async function GET() {
  const key = process.env.AERIAL_VIEW_API_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 500 });

  const res = await fetch(
    `https://aerialview.googleapis.com/v1/videos:lookupVideo?videoId=${VIDEO_ID}`,
    { headers: { "X-Goog-Api-Key": key }, next: { revalidate: 300 } },
  );
  if (!res.ok) {
    // 404 = no pre-rendered video for the address; anything else is upstream
    // trouble. Neither response is billable, and the client reacts the same
    // way to both: keep the static backdrop.
    return Response.json(
      { error: "unavailable" },
      { status: res.status === 404 ? 404 : 502 },
    );
  }

  const data: { state?: string; uris?: Record<string, OrientedUris> } =
    await res.json();
  // MEDIUM first: the only consumer is the product-mock pane (~1000px wide),
  // where a faster first frame beats 1080p the pane can't show.
  const mp4 = data.uris?.MP4_MEDIUM ?? data.uris?.MP4_HIGH ?? data.uris?.MP4_LOW;
  if (data.state !== "ACTIVE" || !mp4) {
    return Response.json({ error: "processing" }, { status: 503 });
  }

  const image = data.uris?.IMAGE;
  return Response.json(
    {
      landscapeUri: mp4.landscapeUri,
      portraitUri: mp4.portraitUri,
      imageLandscapeUri: image?.landscapeUri,
      imagePortraitUri: image?.portraitUri,
    },
    // Lets back/forward navigations reuse the URIs without re-hitting us.
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}
