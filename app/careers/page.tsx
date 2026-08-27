import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { careerRoles, careersIntro } from "./careers-data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join efficura and help build the next generation operating system for the debt industry. Explore open roles in our London-based, founder-led team.",
};

// The careers index from efficura.com/careers, rebuilt on this site's layout
// primitives. Role copy lives in careers-data.ts, shared with the per-role
// pages at /careers/[slug].
export default function Page() {
  return (
    <Sections>
      <section>
        <Container className="pt-12 sm:pt-16">
          <Reveal>
            <p className="text-sm uppercase tracking-wide text-[#c2662d]">
              Careers
            </p>
            <h1 className="mt-5 max-w-6xl text-[clamp(3.25rem,8vw,7.5rem)] font-light leading-[0.9] text-black">
              Build the operating system for debt.
            </h1>
            <p className="mt-7 max-w-4xl text-xl font-light leading-8 text-neutral-600 sm:text-2xl sm:leading-10">
              {careersIntro}
            </p>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container>
          <Reveal>
            <div className="border-t border-neutral-200 pt-10">
              <h2 className="text-3xl font-light text-black sm:text-4xl">
                Open roles
              </h2>

              <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
                {careerRoles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      href={`/careers/${role.slug}`}
                      className="group grid gap-6 py-8 transition-colors lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12"
                    >
                      <div>
                        <h3 className="text-2xl leading-tight text-[#303236] transition-colors group-hover:text-[#c2662d] sm:text-3xl">
                          {role.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-base font-light leading-7 text-neutral-600">
                          {role.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#ded8cf] bg-[#f8f7f4] px-4 py-2 text-sm leading-5 text-[#303236]">
                            {role.team}
                          </span>
                          <span className="rounded-full border border-[#ded8cf] bg-[#f8f7f4] px-4 py-2 text-sm leading-5 text-[#303236]">
                            {role.employmentType}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ded8cf] bg-[#f8f7f4] px-4 py-2 text-sm leading-5 text-[#303236]">
                            <MapPin className="h-4 w-4" strokeWidth={1.7} />
                            {role.location}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex w-fit items-center gap-2 justify-self-start text-base leading-none text-[#303236] lg:justify-self-end">
                        <span>View role</span>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#303236]/15 bg-[#f8f7f4] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowUpRight
                            className="h-5 w-5"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-10 max-w-3xl text-base font-light leading-7 text-neutral-500">
                Don&apos;t see the right role? We&apos;re always glad to meet
                sharp, entrepreneurial people. Reach out via our{" "}
                <Link
                  href="/contact"
                  className="text-[#303236] underline underline-offset-4 transition-colors hover:text-[#e65416]"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </Sections>
  );
}
