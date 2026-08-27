// Renders a schema.org JSON-LD block. A plain <script> (not next/script) is
// deliberate: this is structured data, not executable code. Escaping "<"
// guards against a "</script>" breakout should any field ever carry
// user-supplied content.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
