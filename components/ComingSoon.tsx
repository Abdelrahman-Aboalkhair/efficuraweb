import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

/**
 * Placeholder shown for routes that are linked in the nav but not built yet.
 * Renders the page's own <main> (the root layout supplies only the <Header>),
 * and uses flex-1 so the message centers in the leftover viewport height.
 */
export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="flex flex-1 flex-col justify-center py-24">
      <Container>
        <Reveal>
          <p className="text-base font-medium text-[#bf6c35]">{title}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Coming soon
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            We&apos;re still putting this page together. Check back shortly, or
            head back to the homepage in the meantime.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-[#bf6c35] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#894d26]"
          >
            Back to home
          </Link>
        </Reveal>
      </Container>
    </main>
  );
}
