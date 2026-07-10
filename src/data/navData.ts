export interface NavLink {
  label: string;
  href: string;
  footerLabel?: string;
  target?: string;
  rel?: string;
}

export interface NavDropdown {
  label: string;
  href: string; // Used by the footer only; the header trigger is a button.
  footerLabel?: string;
  children: NavLink[];
}

export interface NavItem {
  type: "link" | "dropdown";
  data: NavLink | NavDropdown;
}

export interface FooterLink {
  label: string;
  href: string;
}

// ===========================================
// NAVIGATION DATA
// ===========================================

export const navigationItems: NavItem[] = [
  // {
  //   type: "dropdown",
  //   data: {
  //     label: "Printing",
  //     footerLabel: "Printing Services",
  //     href: "/printing",
  //     children: [
  //       { label: "Printing Services", href: "/printing" },
  //       { label: "Business Cards", href: "/printing/business-cards" },
  //       { label: "Booklets & Manuals", href: "/printing/booklets-manuals" },
  //       { label: "Brochures & Flyers", href: "/printing/brochures-flyers" },
  //       { label: "Event & Party Printing", href: "/printing/event-printing" },
  //       { label: "Labels & Stickers", href: "/printing/labels-stickers" },
  //       { label: "NCR Forms & Cheques", href: "/printing/ncr-cheques" },
  //       { label: "Office Stationery", href: "/printing/office-stationery" },
  //       { label: "Postcards & Rack Cards", href: "/printing/rack-cards-postcards" },
  //     ],
  //   } as NavDropdown,
  // },
  {
    type: "link",
    data: {
      label: "Printing",
      footerLabel: "Printing Services",
      href: "/printing",
    } as NavLink,
  },
  // {
  //   type: "dropdown",
  //   data: {
  //     label: "Signs",
  //     footerLabel: "Sign Services",
  //     href: "/signs",
  //     children: [
  //       { label: "Sign Services", href: "/signs" },
  //       { label: "Banners & Awnings", href: "/signs/banners-awnings" },
  //       { label: "Business & Storefront", href: "/signs/business-storefronts" },
  //       { label: "Flags & Pole Banners", href: "/signs/flags-pole-banners" },
  //       { label: "Graphics & Murals", href: "/signs/graphics-murals" },
  //       { label: "Lawn & Event Signs", href: "/signs/lawn-event-signs" },
  //       { label: "LED & Illuminated Signs", href: "/signs/led-illuminated-signs" },
  //       { label: "Portable Signs", href: "/signs/portable-signs" },
  //       { label: "Wayfinding Signs", href: "/signs/wayfinding-signs" },
  //     ],
  //   } as NavDropdown,
  // },
  // Election Campaigns hidden pending approval — re-add as a dropdown child when ready:
  // {
  //   type: "dropdown",
  //   data: {
  //     label: "Signs",
  //     footerLabel: "Sign Services",
  //     href: "/signs",
  //     children: [
  //       { label: "Sign Services", href: "/signs" },
  //       { label: "Election Campaigns", href: "/signs/election-campaigns" },
  //     ],
  //   } as NavDropdown,
  // },
  {
    type: "link",
    data: {
      label: "Signs",
      footerLabel: "Sign Services",
      href: "/signs",
    } as NavLink,
  },
  // {
  //   type: "dropdown",
  //   data: {
  //     label: "Promo",
  //     footerLabel: "Promotional Products",
  //     href: "/promo-products",
  //     children: [
  //       { label: "Promo Products", href: "/promo-products" },
  //       { label: "Apparel & Team Wear", href: "/promo/apparel-team-wear" },
  //       { label: "Awards & Trophies", href: "/promo/awards-trophies" },
  //       { label: "Bags & Totes", href: "/promo/bags-totes" },
  //       { label: "Drinkware", href: "/promo/drinkware" },
  //       { label: "Events & Giveaways", href: "/promo/events-giveaways" },
  //       { label: "Caps & Hats", href: "/promo/headwear" },
  //       { label: "Health & Home", href: "/promo/health-home" },
  //       { label: "Golf & Outdoor", href: "/promo/golf-outdoor" },
  //       { label: "Pens & Office Essentials", href: "/promo/office-essentials" },
  //       { label: "Tech & Accessories", href: "/promo/tech-accessories" },
  //     ],
  //   } as NavDropdown,
  // },
    {
    type: "dropdown",
    data: {
      label: "Promo",
      footerLabel: "Promotional Products",
      href: "/promo-products",
      children: [
        { label: "Promo Products", href: "/promo-products" },
        { label: "Shop Promo Products", href: "https://promo.ionprintandpromo.ca/", target: "_blank", rel: "noopener noreferrer" },
      ],
    } as NavDropdown,
  },
  // {
  //   type: "link",
  //   data: {
  //     label: "Promo",
  //     footerLabel: "Promotional Products",
  //     href: "/promo-products",
  //   } as NavLink,
  // },
  {
    type: "link",
    data: {
      label: "Design & Digital",
      href: "/design-digital",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Real Estate Signs",
      footerLabel: "Real Estate Signs",
      href: "/real-estate-signs",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Contact",
      href: "/contact",
    } as NavLink,
  },
];

// ===========================================
// HELPERS
// ===========================================

export function getNavItems(): NavItem[] {
  return navigationItems;
}

/**
 * Flat list for the footer: one entry per top-level item. Dropdowns collapse
 * to their parent `href`; children are not listed in the footer.
 */
export function getFooterLinks(): FooterLink[] {
  return navigationItems.map((item) => {
    const data = item.data as NavLink | NavDropdown;
    return {
      label: data.footerLabel || data.label,
      href: data.href,
    };
  });
}