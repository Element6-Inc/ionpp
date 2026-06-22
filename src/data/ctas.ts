export interface Cta {
heading: string;
button: string;
link: string;
}

export const ctas: Record<string, Cta> = {

// ── Generic ────────────────────────────────────────────────────────────────
"contact": {
heading: "Need help choosing the right option? We're happy to help.",
button: "Get In Touch",
link: "/contact",
},
"all-in-one": {
heading: "Bring your print, signs & promo together in one place.",
button: "Get In Touch",
link: "/contact",
},

// ── Cross-service ──────────────────────────────────────────────────────────
"design-digital": {
heading: "Need help with layout or design? We do that too.",
button: "Learn More",
link: "/design-digital",
},
"signs": {
heading: "Need signs to go with your project? We've got you covered.",
button: "Learn More",
link: "/signs",
},
"promo-products": {
heading: "Need promo products to match? We can help.",
button: "Learn More",
link: "/promo-products",
},
"matching-print": {
heading: "Complete your toolkit with matching print pieces.",
button: "View All Printing",
link: "/printing",
},
"brand-consistency": {
heading: "Keep your brand looking consistent across every piece.",
button: "View All Printing",
link: "/printing",
},


// ── Printing CTAs ──────────────────────────────────────────────────────────
"design-support": {
heading: "Need help with artwork, layout or design? We do that too.",
button: "Learn More",
link: "/design-digital",
},
"sales-toolkit": {
heading: "Complete your sales toolkit with matching print materials.",
button: "View All Printing",
link: "/printing",
},
"booklets-manuals": {
heading: "Need booklets, catalogues or manuals? We print those too.",
button: "Learn More",
link: "/printing/booklets-manuals",
},
"brochures-flyers": {
heading: "Promote your message with brochures & flyers that get noticed.",
button: "Learn More",
link: "/printing/brochures-flyers",
},
"business-cards": {
heading: "Make a great first impression with custom business cards.",
button: "Learn More",
link: "/printing/business-cards",
},
"event-printing": {
heading: "Planning an event? We'll help make it look great.",
button: "Learn More",
link: "/printing/event-printing",
},
"labels-stickers": {
heading: "Need labels, stickers or decals? We've got you covered.",
button: "Learn More",
link: "/printing/labels-stickers",
},
"ncr-cheques": {
heading: "Stay organized with custom NCR forms & cheques.",
button: "Learn More",
link: "/printing/ncr-cheques",
},
"office-stationery": {
heading: "Keep your office essentials polished, branded & ready to go.",
button: "Learn More",
link: "/printing/office-stationery",
},
"rack-cards-postcards": {
heading: "Share your message with rack cards & postcards.",
button: "Learn More",
link: "/printing/rack-cards-postcards",
},

// ── Promo CTAs ─────────────────────────────────────────────────────────────
"promo-products-cta": {
heading: "Find branded items that get kept, used & remembered.",
button: "Learn more",
link: "/promo-products",
},
"branded-everyday": {
heading: "Keep your brand seen on useful everyday items.",
button: "Learn more",
link: "/promo-products",
},
"apparel-team": {
heading: "Wear your brand with custom apparel, uniforms & team gear.",
button: "Learn More",
link: "/promo/apparel-team-wear",
},
"awards-trophies": {
heading: "Give credit where it's due with custom awards & trophies.",
button: "Learn More",
link: "/promo/awards-trophies",
},
"bags-totes": {
heading: "Carry your brand further with custom bags & totes.",
button: "Learn More",
link: "/promo/bags-totes",
},
"drinkware-cta": {
heading: "Raise your brand with mugs, bottles & custom drinkware.",
button: "Learn More",
link: "/promo/drinkware",
},
"events-giveaways": {
heading: "Great events need great gear, swag & giveaways.",
button: "Learn More",
link: "/promo/events-giveaways",
},
"caps-hats": {
heading: "Top it off right with branded caps & hats.",
button: "Learn More",
link: "/promo/headwear",
},
"health-home": {
heading: "Choose useful gifts for wellness, home & everyday comfort.",
button: "Learn More",
link: "/promo/health-home",
},
"golf-outdoor": {
heading: "Tee up your brand with golf & outdoor gear.",
button: "Learn More",
link: "/promo/golf-outdoor",
},
"pens-office": {
heading: "Make your mark with pens & office essentials.",
button: "Learn More",
link: "/promo/office-essentials",
},
"tech-accessories": {
heading: "Power up your brand with tech & accessories.",
button: "Learn More",
link: "/promo/tech-accessories",
},

// ── Signs CTAs ─────────────────────────────────────────────────────────────
"signs-help": {
heading: "Need signage that gets your business noticed? We can help.",
button: "Get In Touch",
link: "/contact",
},
"signs-options": {
heading: "From storefront signs to banners, see what we offer.",
button: "View All Signs",
link: "/signs",
},
"banners-awnings": {
heading: "Need banners, awnings or outdoor signs? We've got you covered.",
button: "Learn More",
link: "/signs/banners-awnings",
},
"business-storefront": {
heading: "Opening, rebranding or upgrading? Let's get your sign seen.",
button: "Learn More",
link: "/signs/business-storefronts",
},
"flags-pole-banners": {
heading: "Get noticed fast with flags & pole banners.",
button: "Learn More",
link: "/signs/flags-pole-banners",
},
"graphics-murals": {
heading: "Transform your space with custom graphics & murals.",
button: "Learn More",
link: "/signs/graphics-murals",
},
"lawn-event-signs": {
heading: "Need quick, reliable signs for lawns or events?",
button: "Learn More",
link: "/signs/lawn-event-signs",
},
"led-illuminated": {
heading: "Shine a light on your business with illuminated signs.",
button: "Learn More",
link: "/signs/led-illuminated-signs",
},
"sidewalk-portable-signs": {
heading: "Right place, right time with portable signs.",
button: "Learn More",
link: "/signs/portable-signs",
},
"wayfinding-directional": {
heading: "Help visitors find their way with clear signage.",
button: "Learn More",
link: "/signs/wayfinding-signs",
},

};

// ── Random pool (legacy / generic) ────────────────────────────────────────
export const randomCtaPool: Cta[] = [
ctas["design-digital"],
ctas["signs"],
ctas["promo-products"],
ctas["matching-print"],
ctas["brand-consistency"],
ctas["all-in-one"],
ctas["contact"],
];

// ── Random pool — Printing inner pages ────────────────────────────────────
export const randomPrintCtaPool: Cta[] = [
ctas["contact"],
ctas["design-support"],
ctas["sales-toolkit"],
ctas["booklets-manuals"],
ctas["brochures-flyers"],
ctas["business-cards"],
ctas["event-printing"],
ctas["labels-stickers"],
ctas["ncr-cheques"],
ctas["office-stationery"],
ctas["rack-cards-postcards"],
];

// ── Random pool — Promo inner pages ───────────────────────────────────────
export const randomPromoCtaPool: Cta[] = [
ctas["contact"],
ctas["promo-products-cta"],
ctas["branded-everyday"],
ctas["apparel-team"],
ctas["awards-trophies"],
ctas["bags-totes"],
ctas["drinkware-cta"],
ctas["events-giveaways"],
ctas["caps-hats"],
ctas["health-home"],
ctas["golf-outdoor"],
ctas["pens-office"],
ctas["tech-accessories"],
];

// ── Random pool — Signs inner pages ───────────────────────────────────────
export const randomSignsCtaPool: Cta[] = [
ctas["signs-help"],
ctas["signs-options"],
ctas["banners-awnings"],
ctas["business-storefront"],
ctas["flags-pole-banners"],
ctas["graphics-murals"],
ctas["lawn-event-signs"],
ctas["led-illuminated"],
ctas["sidewalk-portable-signs"],
ctas["wayfinding-directional"],
];
