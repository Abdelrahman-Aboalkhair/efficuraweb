import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { teamMembers, getMember } from "../team-data";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(slug);

  if (!member) {
    return { title: "About us" };
  }

  const [firstName, ...rest] = member.name.split(" ");
  const lastName = rest.join(" ");
  const socialTitle = `${member.name} – ${member.role} at efficura`;

  // The root layout owns the canonical, og:url and the "| efficura" title
  // suffix - only the per-person fields live here.
  return {
    title: `${member.name} – ${member.role}`,
    description: member.intro,
    keywords: [
      member.name,
      ...member.role.split(" / "),
      "efficura",
      "labrador",
      "real-estate debt",
      "team",
    ],
    openGraph: {
      type: "profile",
      firstName,
      lastName,
      siteName: "efficura",
      locale: "en_GB",
      url: `https://efficura.com/about/${member.slug}`,
      title: socialTitle,
      description: member.intro,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: member.intro,
    },
  };
}

// A single team member from /about: the grid photo with the name, role and
// about copy beside it, the whole block centered on the page.
export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMember(slug);

  if (!member) {
    notFound();
  }

  const [firstName, ...rest] = member.name.split(" ");
  const lastName = rest.join(" ");
  const sameAs = [
    ...(member.linkedin ? [member.linkedin] : []),
    ...(member.sameAs ?? []),
  ];

  return (
    <Sections>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: member.name,
          givenName: firstName,
          familyName: lastName,
          jobTitle: member.role,
          description: member.intro,
          url: `https://efficura.com/about/${member.slug}`,
          worksFor: {
            "@type": "Organization",
            name: "efficura",
            sameAs: "https://efficura.com",
          },
          ...(sameAs.length ? { sameAs } : {}),
          ...(member.image
            ? { image: `https://efficura.com${member.image}` }
            : {}),
        }}
      />

      {/* Photo and copy sit side by side as one centered block. The hero owns
          its offset below the sticky nav, mirroring the other inner pages. */}
      <section>
        <Container className="pt-12 sm:pt-16">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-light text-neutral-500 transition hover:text-black"
              >
                <ChevronLeft
                  className="h-4 w-4"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                Back to the team
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
                <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md bg-neutral-100 md:max-w-none">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={900}
                      height={1125}
                      priority
                      className="h-full w-full object-cover contrast-110 grayscale"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-8xl font-light text-neutral-300">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.95] text-black">
                    {member.name}
                  </h1>
                  {member.role ? (
                    <p className="mt-3 text-lg font-light text-neutral-600 sm:text-xl">
                      {member.role}
                    </p>
                  ) : null}
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-base font-light text-neutral-600 transition hover:text-black"
                    >
                      <Image
                        src="/icons/linkedin.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 brightness-0"
                        aria-hidden="true"
                      />
                      <span>LinkedIn</span>
                    </a>
                  ) : null}

                  <div className="mt-10 max-w-3xl">
                    <p className="text-lg font-light leading-8 text-neutral-700 sm:text-xl sm:leading-9">
                      {member.intro}
                    </p>
                    {member.bio.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-6 text-base font-light leading-7 text-neutral-600 sm:text-lg sm:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </Sections>
  );
}
