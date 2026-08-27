export const CAREERS_EMAIL = "careers@efficura.com";

export type CareerWhyJoin = {
  title: string;
  detail: string;
};

export type CareerRole = {
  slug: string;
  title: string;
  team: string;
  location: string;
  employmentType: string;
  /** Short line used on the careers index card. */
  summary: string;
  /** Larger statement shown in the role hero. */
  intro: string;
  aboutRole: string;
  whatYouDo: string[];
  lookingFor: string[];
  whyJoin: CareerWhyJoin[];
  /**
   * ISO date (e.g. "2026-07-01") from which the role accepts external
   * applications. Leave unset while hiring is internal-only: it gates the
   * JobPosting structured data on the role page (and supplies its required
   * datePosted), which must not be emitted for roles the public can't
   * apply to.
   */
  externallyOpenSince?: string;
};

export const careersIntro =
  "efficura is a fast-paced fintech startup building the next generation operating system for the debt industry. Our labrador platform gives financial institutions custom enterprise software, from intelligent data infrastructure to AI-driven deal origination, servicing, and research tools, all wrapped in modern frontend experiences purpose-built for the world of real-estate debt.";

export const careerRoles: CareerRole[] = [
  {
    slug: "sales-associate",
    title: "Sales Associate",
    team: "Go-to-market",
    location: "Central London",
    employmentType: "Full-time / Internship",
    summary:
      "Own outreach, pipeline, and relationships while building efficura's first client base alongside the founders.",
    intro:
      "Build our go-to-market engine from the ground up and turn early conversations into our first institutional clients.",
    aboutRole:
      "As a Sales Associate, you will work directly alongside one of the company's founders to build, expand, and refine efficura's go-to-market engine. This is a hands-on, high-impact role where you'll own outreach, pipeline, and relationships from day one, gaining deep exposure to the intersection of financial technology, modern sales tooling, and applied AI. You'll do it all within a lean, founder-led environment where your contributions directly shape who we serve.",
    whatYouDo: [
      "Design and run modern lead-generation workflows using tools like Origami to identify, enrich, and prioritise high-intent prospects across the real-estate debt lending landscape",
      "Own first-touch outreach to potential clients, crafting sharp, personalised messaging across email, LinkedIn, and direct channels that earns meetings with institutional decision-makers",
      "Build and maintain a lean, clean investor- and client-relationship management pipeline, keeping every contact, conversation, and next step accurate and actionable",
      "Continuously evaluate and adopt the best tools, automations, and workflows to keep our go-to-market motion fast, organised, and low-overhead as we scale",
      "Collaborate directly with the founding team to shape positioning, qualify opportunities, and move deals from first contact to signed client",
      "Help build efficura's first client base from the ground up, turning early conversations into lasting institutional relationships",
    ],
    lookingFor: [
      "Currently pursuing or recently completed a degree in Business, Finance, Economics, Marketing, or a related field, or an equivalent track record and hustle",
      "Excellent written and verbal communication, with a knack for turning a cold contact into a warm conversation",
      "Familiarity with, or strong curiosity for, modern sales and lead-generation tooling such as Origami, CRMs, and outreach and automation platforms",
      "Comfort working with data: researching markets, enriching prospect lists, and keeping a pipeline clean and well-organised",
      "Interest in fintech, real-estate debt, and how AI is reshaping financial workflows",
      "Strong organisational skills and the ability to learn quickly in a fast-moving environment",
      "An entrepreneurial mindset. You thrive with autonomy, ambiguity, and ownership",
    ],
    whyJoin: [
      {
        title: "Founder access",
        detail:
          "Work side-by-side with a young team and the core founders, gaining mentorship and visibility into how a startup is built and sold from the ground up.",
      },
      {
        title: "Real impact",
        detail:
          "You'll build our first client base, with your outreach directly shaping who efficura serves in finance.",
      },
      {
        title: "Modern stack",
        detail:
          "Work with cutting-edge sales, lead-generation, and AI tooling instead of legacy CRMs and spreadsheets.",
      },
      {
        title: "Growth trajectory",
        detail:
          "Join early at a company building critical infrastructure for the financial industry, with significant room to grow into a full-time commercial role. Plus, you get to work out of our central London office, which is always fun!",
      },
    ],
  },
  {
    slug: "founder-associate",
    title: "Founder Associate",
    team: "Operations",
    location: "Central London",
    employmentType: "Full-time",
    summary:
      "Work daily with the CEO and COO to run client communications, operations, and admin in a streamlined, repeatable way.",
    intro:
      "Be the connective tissue between our clients and our team, keeping efficura's operations running like clockwork.",
    aboutRole:
      "As a Founder Associate, you will work side-by-side with our CEO and COO every day to keep efficura's operations running in a streamlined, repeatable way. You'll be the connective tissue between our clients and our team, owning communications, coordinating meetings, and making sure the right information reaches the right person at the right time. This is a high-trust, high-visibility role for someone with exceptional organisational instincts who wants a front-row seat to how a fintech startup is built and run.",
    whatYouDo: [
      "Work directly with the CEO and COO every day to plan, coordinate, and execute the company's operations in a streamlined, repeatable format",
      "Own all client communications, fielding incoming requests, keeping conversations warm and responsive, and ensuring nothing slips through the cracks",
      "Organise and run meetings end to end, from scheduling and agendas through to notes, action items, and follow-through",
      "Triage and direct client requests to the correct technical team member, then track them through to resolution",
      "Liaise information across the team, capturing decisions, surfacing updates, and keeping everyone aligned as priorities move quickly",
      "Build and refine the systems, templates, and workflows that turn one-off tasks into repeatable processes as we scale",
      "Take ownership of all administrative operations, freeing the founding team to focus on product and growth",
    ],
    lookingFor: [
      "Top-tier organisational skills that keep many moving parts in order without dropping a single detail",
      "Excellent written and verbal communication, with the polish and judgement to represent efficura directly to clients",
      "A natural coordinator who enjoys being the dependable hub that keeps people and information moving",
      "Comfort with modern productivity, scheduling, and CRM tooling, plus the instinct to improve a process rather than just follow it",
      "Calm, proactive, and resourceful under ambiguity; you anticipate needs before you're asked",
      "Interest in fintech, real-estate debt, and the operational side of building a company",
      "An entrepreneurial mindset. You thrive with autonomy, ownership, and high trust",
    ],
    whyJoin: [
      {
        title: "Founder access",
        detail:
          "Work hand-in-hand with the CEO and COO every day, gaining unmatched visibility into how a startup is built and run from the inside.",
      },
      {
        title: "Real impact",
        detail:
          "You'll own the operating rhythm of the company, and your systems and follow-through keep clients happy and the team moving.",
      },
      {
        title: "Broad exposure",
        detail:
          "Touch every part of the business, from client relationships to internal operations, and grow well beyond a traditional admin remit.",
      },
      {
        title: "Growth trajectory",
        detail:
          "Join early at a company building critical infrastructure for the financial industry, with significant room to grow into a senior operations or chief-of-staff role. Plus, you get to work out of our central London office, which is always fun!",
      },
    ],
  },
];

export function getRole(slug: string) {
  return careerRoles.find((role) => role.slug === slug);
}
