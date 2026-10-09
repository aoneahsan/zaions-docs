import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';

/**
 * Screen-reader-only suffix for a link that opens in a new tab.
 * @returns a visually hidden span announcing the new tab
 */
export default function ExternalSuffix(): ReactNode {
  return (
    <span className="sr-only">
      {' '}
      {translate({id: 'common.newTab', message: '(opens in a new tab)'})}
    </span>
  );
}

/**
 * Whether an href leaves this site (an absolute http(s) URL).
 * @param href - the link target
 * @returns true for an external URL
 */
export function isExternal(href: string | undefined): boolean {
  return typeof href === 'string' && /^https?:\/\//i.test(href);
}
