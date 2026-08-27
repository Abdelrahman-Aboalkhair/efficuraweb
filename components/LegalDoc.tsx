import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";

/**
 * Layout for long-form legal pages (Terms, Privacy, Cookies). Clean white
 * page, a plain document title, then body text kept to a narrow reading
 * measure with light styling only - headings, bullet lists, the odd bold
 * lead-in, and full-container-width data tables. It reuses the
 * site's <Sections>/<Container>/<Reveal> rhythm so these pages sit in the same
 * grid as the rest of the site while staying deliberately quiet.
 *
 * Each page supplies its copy as data (see app/terms, app/privacy) rather than
 * hand-writing the same className strings twice; the styling lives here.
 */

export type LegalBlock =
  | { p: string } // paragraph (supports **bold** inline)
  | { sub: string } // sub-heading (e.g. "5.1 Data We Collect")
  | { list: string[] } // bullet list (items support **bold** inline)
  | { table: { head: string[]; rows: string[][] } }; // data table (e.g. cookie inventory)

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

// Supports light inline emphasis and external links without requiring legal
// pages to hand-write presentation markup.
function Inline({ text }: { text: string }) {
  const parts = text.split(
    /(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g,
  );

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
          <strong key={i} className="font-semibold text-zinc-900">
              {part.slice(2, -2)}
          </strong>
          );
        }

        const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
            >
              {link[1]}
            </a>
          );
        }

        return part;
      })}
    </>
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if ("sub" in block) {
          return (
            <h3
              key={i}
              className="max-w-3xl pt-2 text-lg font-semibold text-zinc-900"
            >
              {block.sub}
            </h3>
          );
        }
        if ("table" in block) {
          // Tables span the full container width (unlike the narrow text
          // measure); on viewports narrower than the table they scroll inside
          // their own container.
          return (
            <div
              key={i}
              className="overflow-x-auto rounded-lg border border-zinc-200"
            >
              <table className="w-full min-w-5xl border-collapse text-left text-sm leading-relaxed text-zinc-600">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    {block.table.head.map((label) => (
                      <th
                        key={label}
                        className="px-4 py-3 font-semibold text-zinc-900"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {block.table.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`px-4 py-4 align-top ${c === 0 ? "font-medium text-zinc-900" : ""}`}
                        >
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if ("list" in block) {
          return (
            <ul
              key={i}
              className="max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600 marker:text-zinc-400"
            >
              {block.list.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="max-w-3xl text-base leading-relaxed text-zinc-600">
            <Inline text={block.p} />
          </p>
        );
      })}
    </>
  );
}

export function LegalDoc({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string[];
  sections: LegalSection[];
}) {
  return (
    <Sections>
      {/* Title block - the hero owns its top offset below the sticky nav,
          mirroring the other pages. Kept smaller than the marketing heroes so
          it reads as a document header, not a headline. */}
      <section>
        <Container className="pt-20 pb-2 sm:pb-4">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {intro && intro.length > 0 && (
              <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-zinc-700">
                {intro.map((paragraph, i) => (
                  <p key={i}>
                    <Inline text={paragraph} />
                  </p>
                ))}
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      {/* Document body - opened by a hairline rule. Text blocks keep a narrow
          reading measure (max-w-3xl on each block, not on the column) so that
          wide blocks like tables can span the full container. Each section gets
          its own Reveal - a single Reveal around the whole document never hits
          the 20% in-view threshold on a body this tall, leaving the text
          invisible until (or unless) the reader scrolls deep into the page. */}
      <section>
        <Container>
          <div className="space-y-10 border-t border-zinc-200 pt-10 sm:space-y-12 sm:pt-12">
            {sections.map((section) => (
              <Reveal key={section.heading} className="space-y-4">
                <h2 className="max-w-3xl text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <Blocks blocks={section.blocks} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </Sections>
  );
}
