import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { getMembersByGroup, type TeamMember } from "./team-data";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the efficura team building labrador for real-estate debt managers.",
};

// The team page from efficura.com/about, rebuilt on this site's layout
// primitives: the headline, then the team grid, with <Container> owning the
// gutters and <Sections> the vertical rhythm.

function LinkedInProfileLink({
  href,
  name,
  className = "",
}: {
  href: string;
  name: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} on LinkedIn`}
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center transition hover:opacity-80 ${className}`}
    >
      <Image
        src="/icons/linkedin.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 brightness-0"
        aria-hidden="true"
      />
    </a>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative">
      {/* The whole card links to the member's page; the LinkedIn icon stays a
          sibling of the link (not a child) so anchors don't nest. */}
      <Link href={`/about/${member.slug}`} className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-md bg-neutral-100">
          {member.image ? (
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              <Image
                src={member.image}
                alt={member.name}
                width={900}
                height={1125}
                className="h-full w-full object-cover contrast-110 grayscale"
                style={
                  member.photoZoom
                    ? {
                        transform: `scale(${member.photoZoom})`,
                        transformOrigin: member.photoOrigin ?? "50% 40%",
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl font-light text-neutral-300 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="mt-5 text-2xl font-light leading-tight text-black">
          {member.name}
        </h3>
        {member.role ? (
          <p className="mt-1 text-base font-light text-neutral-600">
            {member.role}
          </p>
        ) : null}
        {member.detail ? (
          <p className="mt-3 max-w-sm text-sm font-light leading-6 text-neutral-500">
            {member.detail}
          </p>
        ) : null}
      </Link>
      {member.linkedin ? (
        <LinkedInProfileLink
          href={member.linkedin}
          name={member.name}
          className="absolute right-0 top-0 z-10 m-3"
        />
      ) : null}
    </article>
  );
}

export default function Page() {
  const team = getMembersByGroup("team");

  return (
    <Sections>
      {/* Headline + the core team grid. The hero owns its offset below the
          sticky nav, mirroring the other inner pages. */}
      <section>
        <Container className="pt-12 sm:pt-16">
          <Reveal>
            <h1 className="max-w-6xl text-[clamp(2.75rem,6.5vw,6rem)] font-light leading-[0.9] text-black">
              About efficura.
            </h1>
            <p className="mt-7 max-w-5xl text-xl font-light leading-8 text-neutral-600 sm:text-2xl sm:leading-10">
              We&apos;re building the operating system for asset and
              real-estate debt managers.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.slug} delay={i * 0.06}>
                <MemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

    </Sections>
  );
}
