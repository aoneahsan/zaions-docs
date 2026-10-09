/**
 * Every changeable figure the docs quote lives here, once.
 *
 * zaions.com renders the same figures from its admin records; this site cannot read them, so when a
 * price, the phone number or the product count changes there, change it here too. zaions.com stays the
 * authority (its Pricing, Payments and Contact pages).
 */

/** Package floors in US dollars. Team is per month. */
export const packageFloors = {
  consultation: 0,
  launch: 1000,
  build: 3000,
  team: 5000,
} as const;

export type PackageKey = keyof typeof packageFloors;

/** The public phone number, as displayed and as a dialable `tel:` target. */
export const phone = {
  display: '+92 304 6619706',
  href: 'tel:+923046619706',
} as const;

/** Products Zaions built and still runs. Rendered as a floor, e.g. "15+". */
export const productCount = 15;

/** Agency URLs the docs link to. */
export const agency = {
  home: 'https://zaions.com',
  startProject: 'https://zaions.com/start-a-project',
  consultation: 'https://zaions.com/start-a-project?package=free-consultation',
  services: 'https://zaions.com/services',
  pricing: 'https://zaions.com/pricing',
  contact: 'https://zaions.com/contact',
  privacy: 'https://zaions.com/privacy',
  terms: 'https://zaions.com/terms',
  organizationId: 'https://zaions.com/#organization',
} as const;

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * Formats a package floor as US dollars with no cents, e.g. 3000 → "$3,000".
 * @param key - the package whose floor to format
 * @returns the formatted amount
 */
export function formatFloor(key: PackageKey): string {
  return usd.format(packageFloors[key]);
}
