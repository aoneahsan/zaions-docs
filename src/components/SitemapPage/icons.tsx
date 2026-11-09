import React, { type ReactNode } from 'react';

/** Which picture sits beside a group's heading. */
export type GroupIconName = 'docs' | 'compare' | 'site';

/**
 * Each icon's shapes, on a 24-unit grid with a round 1.75 stroke in the text's own colour, drawn for this site:
 * a brief with its milestones ticked off, two offers side by side, and the compass zaions.com uses for its tours.
 */
const SHAPES: Record<GroupIconName, ReactNode> = {
  docs: (
    <>
      <path d="M6.5 3h8l3.5 3.5V19a2 2 0 0 1-2 2h-9.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14.5 3v3.5H18" />
      <path d="m8 11.5 1.25 1.25L11.5 10.5M8 16.5l1.25 1.25 2.25-2.25M13.5 12h2.5M13.5 17h2.5" />
    </>
  ),
  compare: (
    <>
      <rect x="3.5" y="9" width="7" height="11.5" rx="1.75" />
      <rect x="13.5" y="4" width="7" height="16.5" rx="1.75" />
      <path d="m15.25 9.25 1.25 1.25 2.25-2.5M5.5 13h3" />
    </>
  ),
  site: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2z" />
    </>
  ),
};

/**
 * A group's icon. It is decoration: the heading beside it says the same thing, so assistive tech skips it.
 *
 * @param props.name - which icon
 * @param props.className - sizing and colour from the page's styles
 * @returns the inline SVG
 */
export function GroupIcon({ name, className }: { readonly name: GroupIconName; readonly className?: string }): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES[name]}
    </svg>
  );
}
