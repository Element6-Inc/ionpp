/* =======================================================
 * CONTESTS
 * Single source of truth for the QR-code "enter to win"
 * contests. Edit dates, prizes and rules wording here —
 * the entry pages and the rules page both read from it.
 * ======================================================= */

import raptorsLogo from "../assets/logos/raptors-primary.png";
import raptorsHero from "../assets/heros/contests/raptors.webp";
import giveawayHero from "../assets/heros/contests/giveaway.webp";

export const sponsor = "ION Print & Promo, a division of ION Group";

export const drawDate = "Monday, November 30, 2026";
export const entryDeadline = "Friday, November 27, 2026 at 11:59 PM ET";

// Skill-testing question the selected entrant must answer correctly (Canada).
export const skillTestingQuestion = "(5 × 4) + 2 − 1";
export const skillTestingAnswer = "21";

export interface Contest {
  slug: string;          // page path: /contest/<slug>
  shortPath: string;     // short URL printed as the QR target
  formName: string;      // Netlify form name (one per contest)
  title: string;
  heroTitle: string;     // short headline shown in the page hero
  heading: string;
  prize: string;         // one-line prize description
  details: string[];     // bullet points shown on the entry page
  retailValue?: string;  // approximate retail value (add when confirmed)
  organizationRequired: boolean;
  // Optional long-form page copy. When absent, the page falls back to the
  // short prize line above.
  copy?: {
    headline: string;
    intro: string;
    prizeDateLabel: string; // e.g. "Game date" or "Redeem by"
    prizeDate: string;
  };
  heroImage?: ImageMetadata; // optional hero; falls back to the contact hero
  logo?: ImageMetadata; // optional logo shown above the prize details
  logoAlt?: string;
}

export const contests: Contest[] = [
  {
    slug: "raptors-tickets",
    shortPath: "/raptors",
    formName: "contest-raptors-tickets",
    title: "Win Toronto Raptors Tickets | ION Print & Promo",
    heroTitle: "Raptors Giveaway",
    heading: "Enter to win a pair of Raptors tickets",
    prize: "A pair of Toronto Raptors tickets for Friday, January 1, 2027 at 7:30 PM, Toronto",
    details: [
      "2 tickets",
      "Friday, January 1, 2027 | 7:30 PM",
      "Amazing seats!",
    ],
    organizationRequired: false,
    copy: {
      headline: "Win a pair of Raptors tickets!",
      intro:
        "Start the new year with Raptors basketball! One lucky winner gets 2 amazing seats to see the Raptors in Toronto.",
      prizeDateLabel: "Game date",
      prizeDate: "Friday, January 1, 2027 at 7:30 PM",
    },
    heroImage: raptorsHero,
    logo: raptorsLogo,
    logoAlt: "Toronto Raptors logo",
  },
  {
    slug: "printing-promo-500",
    shortPath: "/win500",
    formName: "contest-printing-promo-500",
    title: "Win $500 in Printing & Promo | ION Print & Promo",
    heroTitle: "$500 Giveaway",
    heading: "Enter to win $500 in printing & promotional products",
    prize: "$500 in printing and promotional products for your organization to be used by Dec. 31, 2027",
    details: [
      "$500 towards printing & promotional products",
      "For your business, team or organization",
      "Use by December 31, 2027",
    ],
    organizationRequired: true,
    heroImage: giveawayHero,
    copy: {
      headline: "Win $500 for your organization!",
      intro:
        "Enter for your chance to receive $500 toward custom printing, signage, apparel and promotional products.",
      prizeDateLabel: "Redeem by",
      prizeDate: "December 31, 2027",
    },
  },
];

export const getContest = (slug: string) =>
  contests.find((c) => c.slug === slug)!;
