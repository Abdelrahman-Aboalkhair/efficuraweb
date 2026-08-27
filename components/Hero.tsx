import { Container } from "@/components/Container";
import { EmailCapture } from "@/components/EmailCapture";
import { HalftoneDog } from "@/components/HalftoneDog";

/**
 * Landing hero (home): a centered stack on plain white - the labrador
 * headline (matching the live site), a one-line subtitle, and a single email
 * input that opens the Cal.com booking popup. The laptop showcase sits flush
 * beneath it in page.tsx, carrying the visual weight the old skyline photo
 * used to.
 */
export function Hero() {
  // pt clears the nav; pb sets the gap to the laptop below. Both self-owned:
  // the hero and showcase share one section, outside the Sections gap rhythm.
  return (
    <Container className="pt-6 pb-16 sm:pt-13 sm:pb-20">
      <div className="mx-auto flex w-full flex-col items-center text-center">
        <h1 className="text-balance text-[clamp(4.25rem,6vw,7rem)] font-light leading-[1.02] tracking-tight text-zinc-900">
          <span className="font-normal">labrador</span>
          <span
            className="relative mx-[0.12em] inline-block h-[0.75em] w-[1.48em] align-baseline"
            aria-hidden="true"
          >
            <span className="pointer-events-none absolute bottom-0 left-0 h-[1.42em] w-full">
              <HalftoneDog
                className="h-full w-full text-zinc-900"
                step={22}
                maxRadius={12}
                influenceRadius={120}
                pushStrength={40}
                animateIn={false}
              />
            </span>
          </span>
          <span className="font-extralight">
            makes
            <br />
            <span className="whitespace-nowrap">real-estate</span> debt simple.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-[clamp(1.25rem,1.25vw,1.5rem)] font-light text-zinc-600">
          We&apos;ve built the first AI-native system of record for real-estate
          debt.
        </p>
        <EmailCapture className="mt-8" />
      </div>
    </Container>
  );
}
