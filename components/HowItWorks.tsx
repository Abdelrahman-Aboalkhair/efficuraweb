import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

type Step = {
  number: string;
  title: string;
  description: string;
};

// Mirrors the three-step journey the rest of the site promises: enquiry, match,
// direct conversation. Copy is kept to a similar length per card so the titles
// line up across the row; the full breakdown lives on /how-it-works.
const steps: Step[] = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share how much you want to borrow and what it is for. It takes a couple of minutes and there is no paperwork to dig out.",
  },
  {
    number: "02",
    title: "We match you to a lender",
    description:
      "We compare a full panel of lenders and surface only the ones that genuinely fit your situation.",
  },
  {
    number: "03",
    title: "Talk direct and close",
    description:
      "We connect you directly with a lender who can move quickly, so you can get answers and close in days.",
  },
];

export function HowItWorks() {
  return (
    <section>
      <Container>
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            How it works
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-zinc-700 sm:text-xl">
            From first enquiry to a direct conversation with a lender, in three
            simple steps.
          </p>
        </Reveal>

        {/* Cool slate cards (square corners) - deliberately a different, cooler
            tone to the warm cream panel below. An oversized watermark number sits
            up top; the step detail is anchored at the bottom via justify-between,
            so with balanced copy the titles line up across all three.

            Each step reveals on a small stagger. Wrapping each card in its own
            <Reveal> makes the Reveal the grid cell; the grid still stretches those
            cells to equal height, and `h-full` on the card makes it fill that
            cell - so the titles stay lined up regardless of copy length. */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="h-full">
              <div className="flex h-full min-h-[24rem] flex-col justify-between bg-[#dce3ec] p-10 sm:min-h-[28rem]">
                <span className="text-8xl font-semibold leading-none tracking-tight text-slate-400">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg text-zinc-600">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
