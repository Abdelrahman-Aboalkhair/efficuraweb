"use client";

import { getCalApi } from "@calcom/embed-react";
import emailjs from "@emailjs/browser";
import posthog from "posthog-js";
import { ArrowRight, SendHorizontal } from "lucide-react";
import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";

/**
 * The booking page from efficura.com/contact, rebuilt on this site's layout
 * primitives: the "book a demo." hero, a "get in touch" card that opens the
 * full Cal.com booking popup, the details form beneath it, and the
 * delivery-stages band.
 *
 * Differences from the live page: submissions go straight to EmailJS with no
 * reCAPTCHA step (the dependency isn't in this build), and the submit event is
 * tracked through PostHog rather than Vercel analytics.
 */

// EmailJS credentials are public (NEXT_PUBLIC) values; the form disables
// itself with an explanatory note when they're absent from the environment.
const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const calNamespace = "30min";
const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "efficura/30min";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  source: "",
  description: "",
};

type FormData = typeof initialFormData;
type SubmitStatus = "idle" | "success" | "error";

const inputClassName =
  "w-full rounded-[4px] border border-[#303236]/18 bg-white/75 px-4 py-3 text-base font-light text-[#303236] outline-none transition-colors placeholder:text-[#77716b]/70 focus:border-[#303236] focus:bg-white";

const labelClassName = "mb-2 block text-sm leading-none text-[#52555a]";

const deliveryStages = [
  "Initial Consultation",
  "Project Scope",
  "In House Consulting + Pain Point Extraction",
  "Design Spec And Set Up Delivery",
  "Your New Real-Estate Debt Workflow",
];

function resetStatusLater(setSubmitStatus: (status: SubmitStatus) => void) {
  window.setTimeout(() => setSubmitStatus("idle"), 5000);
}

export function BookingContent() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const { publicKey, serviceId, templateId } = emailJsConfig;
  const isContactConfigured = Boolean(publicKey && serviceId && templateId);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!publicKey || !serviceId || !templateId) {
      setSubmitStatus("error");
      resetStatusLater(setSubmitStatus);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          company: formData.company,
          source: formData.source,
          message: formData.description,
        },
        publicKey,
      );

      posthog.capture("book-email");
      setSubmitStatus("success");
      setFormData(initialFormData);
      resetStatusLater(setSubmitStatus);
    } catch {
      setSubmitStatus("error");
      resetStatusLater(setSubmitStatus);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load the Cal embed once and theme the booking popup light to match the
  // site. The "Get in touch" card opens it via its data-cal-* attributes.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calNamespace });
      cal("ui", { theme: "light", layout: "month_view" });
    })();
  }, []);

  // Carry whatever's been typed into the popup. Empty fields are omitted so Cal
  // doesn't render blank prefilled values; it reads this attribute at click time.
  const name = `${formData.firstName} ${formData.lastName}`.trim();
  const calConfig = JSON.stringify({
    layout: "month_view",
    ...(name && { name }),
    ...(formData.email && { email: formData.email }),
  });

  return (
    <Sections>
      {/* Hero - headline and pitch. */}
      <section>
        <Container className="pt-12 sm:pt-16">
          <Reveal>
            <h1 className="w-full text-[clamp(3.25rem,14vw,5.75rem)] font-light leading-[0.9] text-black sm:text-[clamp(4rem,9vw,9.5rem)] sm:leading-[0.88]">
              book a demo.
            </h1>
            <p className="mt-8 w-full max-w-5xl text-[clamp(1.45rem,6vw,2.15rem)] leading-[1.05] text-black sm:text-[clamp(1.7rem,2.8vw,3.25rem)] sm:leading-[1.02]">
              See how labrador keeps real-estate debt work organized across
              deal flow, documents, borrower updates, and everything that
              follows.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Get-in-touch card + details form, then the delivery stages. */}
      <section
        id="booking-form"
        className="scroll-mt-28"
        aria-label="Book a labrador demo"
      >
        <Container>
          <div className="grid w-full min-w-0 gap-5">
            {/* Primary CTA - opens the full Cal.com booking popup. */}
            <button
              type="button"
              data-cal-namespace={calNamespace}
              data-cal-link={calLink}
              data-cal-config={calConfig}
              onClick={() => posthog.capture("book-cal")}
              className="group w-full cursor-pointer overflow-hidden rounded-[8px] border border-[#c2662d]/20 bg-[#c2662d] p-6 text-left text-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#a95425] sm:p-8 lg:p-10"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[clamp(2rem,4.5vw,4rem)] leading-[1]">
                    Get in touch
                  </p>
                  <p className="mt-4 max-w-2xl text-[clamp(1.2rem,1.55vw,1.7rem)] leading-[1.16] text-white/80">
                    Book a 30-minute demo. Pick a time and we&apos;ll walk you
                    through labrador.
                  </p>
                </div>
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-transform group-hover:translate-x-1">
                  <ArrowRight
                    className="h-6 w-6"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </button>

            {/* Alternative path - share details by email instead. Heading and
                form sit in a text-left / form-right split that mirrors the
                delivery band below, so the two cards share the same rhythm. */}
            <div className="grid min-w-0 gap-8 rounded-[8px] border border-[#d8d6c9] bg-[#d8d6c9] p-6 text-[#303236] shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12 lg:p-10">
              <div>
                <p className="text-[clamp(1.8rem,2.55vw,3.3rem)] leading-[1.02]">
                  Or share your details
                </p>
                <p className="mt-4 max-w-md text-[clamp(1.2rem,1.55vw,1.7rem)] leading-[1.16] text-[#52555a]">
                  Tell us about your team and goals, and we&apos;ll be in touch.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="firstName">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="lastName">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                    placeholder="Work email"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="Company"
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="source">
                      How did you hear about us?
                    </label>
                    <input
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className={inputClassName}
                      placeholder="Referral, search, event, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={`${inputClassName} min-h-36 resize-y`}
                    placeholder="Tell us about your real-estate debt workflow, data challenges, or what you want to see in the demo."
                  />
                </div>

                <div className="space-y-4 pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isContactConfigured}
                    className="group inline-flex min-h-14 w-full items-center justify-between gap-5 rounded-[4px] bg-[#303236] px-5 text-left text-lg text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#303236] disabled:opacity-70 sm:px-6"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send details"}</span>
                    <SendHorizontal
                      className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>

                  {!isContactConfigured && (
                    <p className="text-sm text-[#a95425]">
                      Contact form configuration is incomplete.
                    </p>
                  )}

                  {submitStatus === "success" && (
                    <p className="rounded-[4px] border border-[#475045]/20 bg-white/65 px-4 py-3 text-sm text-[#475045]">
                      Thank you. We&apos;ll be in touch shortly.
                    </p>
                  )}

                  {submitStatus === "error" && (
                    <p className="rounded-[4px] border border-[#c2662d]/25 bg-white/65 px-4 py-3 text-sm text-[#a95425]">
                      {isContactConfigured
                        ? "Something went wrong. Please try again."
                        : "Contact form configuration is incomplete."}
                    </p>
                  )}

                  <p className="max-w-2xl text-xs leading-5 text-[#52555a]">
                    By submitting this form, you confirm that you&apos;ve read
                    efficura&apos;s{" "}
                    <Link
                      className="text-[#303236] underline underline-offset-4 transition-colors hover:text-[#e65416]"
                      href="/privacy"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-5 rounded-[8px] bg-[#475045] p-5 text-[#f5f5f5] shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
              <div>
                <p className="max-w-4xl text-[clamp(1.8rem,2.75vw,3.55rem)] leading-[1.03] text-[#f5f5f5]">
                  From initial call to delivery in 3 weeks.
                </p>
                <p className="mt-5 max-w-xl text-[clamp(1rem,1.25vw,1.35rem)] leading-[1.18] text-[#d6cbbf]">
                  A focused build path from the first conversation to a working
                  real-estate debt workflow.
                </p>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {deliveryStages.map((stage, index) => (
                  <li
                    key={stage}
                    className="flex min-h-52 flex-col justify-between gap-6 rounded-[8px] bg-gradient-to-br from-white to-[#dedbcd] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                  >
                    <span className="text-[clamp(3rem,4vw,4.25rem)] font-light leading-none text-[#e65416]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[clamp(1rem,1.05vw,1.2rem)] leading-[1.18] text-[#303236]">
                      {stage}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </Sections>
  );
}
