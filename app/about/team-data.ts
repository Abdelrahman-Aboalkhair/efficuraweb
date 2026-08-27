export type TeamGroup = "team";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Omitted → the card shows an initials placeholder until we have a photo. */
  image?: string;
  linkedin?: string;
  /**
   * Additional public profiles (personal site, GitHub, employer bio) merged
   * into the Person JSON-LD `sameAs` alongside LinkedIn - they help search
   * engines tie the page to the right person. Not rendered in the UI.
   */
  sameAs?: string[];
  group: TeamGroup;
  /** Large lead paragraph shown at the top of the member's page. */
  intro: string;
  /** Body paragraphs. Placeholder for now - fill in real bios later. */
  bio: string[];
  /** Optional small line (e.g. education / prior roles for alumni). */
  detail?: string;
  /**
   * Optional zoom applied to the grid photo so heads render at a consistent
   * size across cards (some source photos are waist-up, others close crops).
   */
  photoZoom?: number;
  /** transform-origin for the zoom, defaults to just above center (the face). */
  photoOrigin?: string;
};

// NOTE: Bios are drawn from each member's public record (LinkedIn, university
// and accelerator announcements) plus details supplied directly - verify with
// the person before changing facts.
export const teamMembers: TeamMember[] = [
  {
    slug: "zach-croft",
    name: "Zach Croft",
    role: "Cofounder / CEO",
    image: "/team/zach.jpeg",
    linkedin: "https://www.linkedin.com/in/zach-croft-sharland-2404b3272",
    group: "team",
    intro:
      "Zach leads efficura's vision and strategy, bringing the team and product together to build the operating system for asset and real-estate debt managers.",
    bio: [
      "Zach founded efficura in 2024 and has led the company from concept to a platform in production, with Martley Capital Group as its first client.",
      "Before efficura, he served as chief executive of East Coast Cocktails, the Suffolk drinks company behind the Niche Cocktails range, and studied entrepreneurship at the University of Cambridge.",
      "Under his leadership, efficura was selected for Accelerate Cambridge, the venture programme at Cambridge Judge Business School, and was awarded first place for Best Idea at Henley Business School's 2025 Greenshoots Seed Finance Awards.",
    ],
  },
  {
    slug: "oscar-norris",
    name: "Oscar Norris",
    role: "Cofounder / CTO",
    image: "/team/oscar.jpeg",
    linkedin: "https://www.linkedin.com/in/oscarhfnorris/",
    sameAs: ["https://github.com/oscarhfnorris"],
    group: "team",
    photoZoom: 1.7,
    photoOrigin: "44% 40%",
    intro:
      "Oscar leads engineering at efficura, owning the architecture and technical direction behind the platform.",
    bio: [
      "Oscar holds a first-class BSc in Computer Science from the University of Exeter, where his dissertation examined supply-chain vulnerabilities in the Visual Studio Code extension marketplace. Before efficura, he was a software engineer at Renishaw, the precision-measurement and engineering company.",
      "At efficura he is responsible for the architecture and technical direction of labrador, through to its deployment into each client's own Azure tenant.",
      "Outside of work, he is a sailing instructor.",
    ],
  },
  {
    slug: "vihan-sharma",
    name: "Vihan Sharma",
    role: "Cofounder / Creative Director",
    image: "/team/vihan.jpeg",
    linkedin: "https://www.linkedin.com/in/vihan-sharma-8a546722b/",
    sameAs: ["https://vihansharma.dev"],
    group: "team",
    intro:
      "Vihan leads creative direction at efficura, shaping how the company looks, feels and communicates across product and brand.",
    bio: [
      "Vihan holds a first-class BSc in Computer Science from the University of Exeter. Before efficura, he was a data engineer at Canon.",
      "At efficura he leads creative direction, working at the intersection of engineering and design: how labrador looks, feels and behaves, from the product interface to the company's presence in the world.",
    ],
  },
  {
    slug: "roman-pretty",
    name: "Roman Pretty",
    role: "Cofounder / CPO",
    image: "/team/roman.jpeg",
    linkedin: "https://www.linkedin.com/in/roman-pretty/",
    sameAs: ["https://romanpretty.com", "https://github.com/Roman-Pretty"],
    group: "team",
    intro:
      "Roman leads product at efficura, translating the needs of the people doing this work day to day into the platform.",
    bio: [
      "Roman holds a first-class MSci in Computer Science from Queen Mary University of London, where he also taught as a demonstrator in the School of Electronic Engineering and Computer Science, was named the school's Demonstrator of the Year and received the university's Westfield Trust Prize.",
      "He has shipped software at scale from an early age: a Minecraft mod he built at sixteen has surpassed 27 million downloads. At efficura he leads product end to end, from interface and interaction through to the data layer.",
    ],
  },
  {
    slug: "shona-johnston",
    name: "Shona Johnston",
    role: "General Counsel",
    image: "/team/shona.jpeg",
    linkedin: "https://www.linkedin.com/in/shona-johnston-",
    group: "team",

    intro:
      "Shona leads legal and governance at efficura, keeping the company on solid footing as it grows.",
    bio: [
      "Shona read law at the University of Reading, completing her MLaw with further study at The University of Law.",
      "At efficura she is responsible for contracts, data protection and corporate governance, providing the legal foundation for the company as it grows.",
    ],
  },
  {
    slug: "anish",
    name: "Anish Maharjan",
    role: "Software Engineer",
    image: "/team/anish.jpeg",
    group: "team",
    linkedin: "https://www.linkedin.com/in/anish-maharjan-7a7797285/",
    intro:
      "Anish is a software engineer at efficura, working on the product side of labrador.",
    bio: [
      "Anish holds a BSc in Computer Science from Queen Mary University of London, where he also worked as a demonstrator.",
      "At efficura he works on the product side of labrador and springer, designing and building critical features across both products.",
    ],
  },
  {
    slug: "nishant",
    name: "Nishant Kumar",
    role: "Software Engineer",
    group: "team",
    image: "/team/nishant.jpg",
    linkedin: "https://www.linkedin.com/in/nishant-kumar-bb81451a3/",
    photoZoom: 1.5,
    photoOrigin: "50% 28%",
    intro:
      "Nishant is a software engineer at efficura, working in cloud and DevOps.",
    bio: [
      "Nishant spent three years as a software engineer at Tata Consultancy Services, designing and building backend microservices in Java and Spring Boot.",
      "At efficura he works in cloud and DevOps, responsible for the CI/CD pipelines, release processes and multi-tenant Azure environments behind labrador, from identity and access management through to monitoring and incident response.",
    ],
  },
  {
    slug: "richard-croft",
    name: "Richard Croft",
    role: "Chairman",
    image: "/team/richard.jpg",
    linkedin: "https://www.linkedin.com/in/richard-croft-b2b95022/",
    sameAs: ["https://www.martleycapital.com/team/richard-croft/"],
    group: "team",
    intro:
      "Richard brings industry experience to efficura, shaping product decisions with context from the people doing real-estate debt work day to day.",
    bio: [
      "Richard is the Chief Executive of Martley Capital Group, responsible for the company's strategic direction and capital raising, and leads its real estate fund management function.",
      "Prior to Martley, he co-founded M7 Real Estate, which was sold to Oxford Properties in 2021; at the time of the sale, M7 employed more than 220 people across 13 countries, with €4.3bn of assets under management. Before M7, he founded Halverton REIM (subsequently GPT Halverton), a European real estate fund management business sold to The GPT Group in 2007 with over €2bn of assets under management. Earlier in his career he was International Investment Director of The IO Group Ltd, Property Fund Management PLC (now Cromwell).",
      "Across 30 years in real estate he has been involved in more than €15 billion of transactions, and in 2022 was named Property Week Personality of the Year.",
    ],
  },
];

export function getMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getMembersByGroup(group: TeamGroup): TeamMember[] {
  return teamMembers.filter((member) => member.group === group);
}
