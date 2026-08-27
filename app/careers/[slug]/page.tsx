import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { signoffBackgroundClassName } from "@/components/CtaPanel";
import { flushSectionClassName, Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { careerRoles, getRole } from "../careers-data";

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);

  if (!role) {
    return { title: "Careers" };
  }

  return {
    title: `${role.title} | Careers`,
    description: role.summary,
  };
}

// A single role from efficura.com/careers/[slug], rebuilt on this site's
// layout primitives with full-bleed colour bands and content on the container
// grid, like the audience pages. Applications are currently internal-only, so
// both "Apply" affordances render disabled with the explanatory line.
export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRole(slug);

  if (!role) {
    notFound();
  }

  const tags = [role.team, role.employmentType];

  return (
    <Sections>
      {/* JobPosting rich results are only valid for roles the public can
          actually apply to - gated on externallyOpenSince in careers-data. */}
      {role.externallyOpenSince && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: role.title,
            description: role.aboutRole,
            datePosted: role.externallyOpenSince,
            employmentType: role.employmentType,
            hiringOrganization: {
              "@type": "Organization",
              name: "efficura",
              sameAs: "https://efficura.com",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "GB",
              },
            },
          }}
        />
      )}
      {/* Role hero - the careers variant of the audience-page gradient panel. */}
      <section className="flex min-h-[60svh] flex-col justify-end overflow-hidden bg-[#303236] bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.7)_0%,rgba(214,203,191,0.5)_22%,rgba(71,80,69,0.98)_52%,rgb(48,50,54)_100%)] bg-no-repeat py-10 text-[#f5f5f5] sm:min-h-[68svh] sm:py-14 lg:py-16">
        <Container>
          <Reveal>
            <div>
              <Link
                href="/careers"
                className="text-sm font-light text-white/70 transition hover:text-white"
              >
                ← All roles
              </Link>

              <h1 className="mt-8 max-w-6xl text-[clamp(3rem,9vw,7rem)] font-light leading-[0.9]">
                {role.title}
              </h1>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm leading-5 text-white"
                  >
                    {tag}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm leading-5 text-white">
                  <MapPin className="h-4 w-4" strokeWidth={1.7} />
                  {role.location}
                </span>
              </div>

              <p className="mt-8 max-w-3xl text-[clamp(1.45rem,3vw,2.4rem)] leading-[1.08]">
                {role.intro}
              </p>

              <div className="mt-9">
                <span
                  aria-disabled="true"
                  className="inline-flex w-fit cursor-not-allowed select-none items-center gap-2 rounded bg-white/15 px-5 py-3 text-base leading-none text-white/70 ring-1 ring-white/20"
                >
                  <span>Apply now</span>
                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-3 text-sm font-light leading-5 text-white/70">
                  We&apos;re currently hiring internally for this role.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container>
          <Reveal>
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
              <h2 className="text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                About the role
              </h2>
              <p className="max-w-3xl text-lg font-light leading-8 text-neutral-700 sm:text-xl sm:leading-9">
                {role.aboutRole}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Day-to-day - numbered list on the muted band, mirroring the workflow
          steps on the audience pages. */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                What you&apos;ll do
              </h2>
            </Reveal>
            <Reveal>
              <ul className="grid gap-px overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-200">
                {role.whatYouDo.map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-5 bg-white p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-6 lg:p-8"
                  >
                    <p className="text-[clamp(1.5rem,2vw,2.25rem)] font-light leading-none text-[#c2662d]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="max-w-3xl text-base font-light leading-7 text-[#52555a] sm:text-lg sm:leading-8">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Reveal>
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
              <h2 className="text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                What we&apos;re looking for
              </h2>
              <ul className="max-w-3xl space-y-4">
                {role.lookingFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base font-light leading-7 text-[#52555a] sm:text-lg sm:leading-8"
                  >
                    <Check
                      className="mt-1.5 h-4 w-4 shrink-0 text-[#c2662d] sm:mt-2"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why join - dark band with reason cards, like the security band on
          the audience pages. */}
      <section className="bg-[#303236] py-16 text-white sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.3rem,5vw,5rem)] font-light leading-[0.9] text-white">
              Why join us.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {role.whyJoin.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.06} className="h-full">
                <article className="h-full rounded-[8px] border border-white/10 bg-white/8 p-6 sm:p-8">
                  <h3 className="text-xl leading-tight text-white sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-base font-light leading-7 text-[#d6cbbf]">
                    {reason.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Sign-off - the site's shared dark sign-off treatment, carrying the
          (disabled) apply affordance instead of the demo CTA. Runs flush out
          of the dark why-join band above it. */}
      <section
        className={`overflow-hidden py-16 text-white sm:py-20 lg:py-28 ${flushSectionClassName} ${signoffBackgroundClassName}`}
      >
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <p className="max-w-4xl text-[clamp(2rem,4.4vw,4.5rem)] font-light leading-[0.96]">
                Ready to build our first client base?
              </p>
              <div className="justify-self-start">
                <span
                  aria-disabled="true"
                  className="inline-flex w-fit cursor-not-allowed select-none items-center gap-4 text-lg leading-none text-white/45"
                >
                  <span>Apply for this role</span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:h-14 sm:w-14">
                    <ArrowUpRight
                      className="h-6 w-6"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <p className="mt-3 text-sm font-light leading-5 text-[#d6cbbf]">
                  We&apos;re currently hiring internally for this role.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </Sections>
  );
}
