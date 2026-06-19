export interface Cta {
heading: string;
button: string;
link: string;
}

export const ctas: Record<string, Cta> = {

// ── Generic ────────────────────────────────────────────────────────────────
"contact": {
heading: "Need help choosing? We’re happy to help.",
button: "Get In Touch",
link: "/contact",
},
"all-in-one": {
heading: "Let’s bring your print project together.",
button: "Get In Touch",
link: "/contact",
},

// ── Cross-service ──────────────────────────────────────────────────────────
"design-digital": {
heading: "Need help with layout? We do that too.",
button: "Learn More",
link: "/design-digital",
},
"signs": {
heading: "Need signs to go with it? We’ve got you covered.",
button: "Learn More",
link: "/signs",
},
"promo-products": {
heading: "Need promo products too? We can help.",
button: "Learn More",
link: "/promo-products",
},
"matching-print": {
heading: "Complete your toolkit with matching print pieces.",
button: "View All Printing",
link: "/printing",
},
"brand-consistency": {
heading: "Keep your brand looking consistent everywhere.",
button: "View All Printing",
link: "/printing",
},

// ── Printing sub-pages ─────────────────────────────────────────────────────
"printing": {
heading: "Looking for more print options? Start here.",
button: "View All Printing",
link: "/printing",
},
"rack-cards": {
heading: "Complete your sales toolkit with rack cards.",
button: "Learn More",
link: "/printing/rack-cards-postcards",
},
"office-stationery": {
heading: "Need office stationery too? We’ve got you covered.",
button: "Learn More",
link: "/printing/office-stationery",
},
"booklets": {
heading: "Need manuals, catalogues, or booklets? We print those too.",
button: "Learn More",
link: "/printing/booklets-manuals",
},
"ncr-cheques": {
heading: "Need carbonless forms or cheques? We print those too.",
button: "Learn More",
link: "/printing/ncr-cheques",
},
"event-printing": {
heading: "Planning an event? We can help make it memorable.",
button: "Learn More",
link: "/printing/event-printing",
},
"event-printing-alt": {
heading: "Add a personal touch with event printing.",
button: "Learn More",
link: "/printing/event-printing",
},

// ── Printing CTAs ──────────────────────────────────────────────────────────
"printing-help": {
heading: "Need help with your next print project? We can help.",
button: "Get In Touch",
link: "/contact",
},
"printing-options": {
heading: "Looking for more print options? Start here.",
button: "View All Printing",
link: "/printing",
},
"design-support": {
heading: "Need help with layout or design? We do that too.",
button: "Learn More",
link: "/design-digital",
},
"sales-toolkit": {
heading: "Complete your sales toolkit with matching print pieces.",
button: "View All Printing",
link: "/printing",
},
"event-printing-cta": {
heading: "Planning an event? We’ll help make it look great.",
button: "Learn More",
link: "/printing/event-printing",
},
"office-essentials-cta": {
heading: "Need branded office essentials? We’ve got you covered.",
button: "Learn More",
link: "/printing/office-stationery",
},

// ── Promo CTAs ─────────────────────────────────────────────────────────────
"promo-help": {
heading: "Need promo products? We can help.",
button: "Get In Touch",
link: "/contact",
},
"promo-products-cta": {
heading: "Find promo products that get kept & used.",
button: "View All Promo",
link: "/promo-products",
},
"wear-your-brand": {
heading: "Wear your brand with custom apparel & team gear.",
button: "Learn More",
link: "/promo/apparel-team-wear",
},
"event-giveaways": {
heading: "Great events need great gear & giveaways.",
button: "Learn More",
link: "/promo/events-giveaways",
},
"drinkware-cta": {
heading: "Raise your brand with custom drinkware.",
button: "Learn More",
link: "/promo/drinkware",
},
"branded-everyday": {
heading: "Keep your brand seen on everyday items.",
button: "View All Promo",
link: "/promo-products",
},

};

// ── Random pool (legacy / generic) ────────────────────────────────────────
export const randomCtaPool: Cta[] = [
ctas["design-digital"],
ctas["signs"],
ctas["promo-products"],
ctas["matching-print"],
ctas["brand-consistency"],
ctas["event-printing"],
ctas["all-in-one"],
ctas["contact"],
];

// ── Random pool — Printing inner pages ────────────────────────────────────
export const randomPrintCtaPool: Cta[] = [
ctas["printing-help"],
ctas["printing-options"],
ctas["design-support"],
ctas["sales-toolkit"],
ctas["event-printing-cta"],
ctas["office-essentials-cta"],
];

// ── Random pool — Promo inner pages ───────────────────────────────────────
export const randomPromoCtaPool: Cta[] = [
ctas["promo-help"],
ctas["promo-products-cta"],
ctas["wear-your-brand"],
ctas["event-giveaways"],
ctas["drinkware-cta"],
ctas["branded-everyday"],
];
