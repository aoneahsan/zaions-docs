import React, {type ReactNode} from 'react';
import {formatFloor, phone, productCount, type PackageKey} from '@site/src/data/site';

/**
 * A package floor from `src/data/site.ts`, formatted as US dollars.
 * @param props.pkg - the package whose floor to show
 * @returns the formatted amount, e.g. "$3,000"
 */
export function Price({pkg}: {pkg: PackageKey}): ReactNode {
  return <>{formatFloor(pkg)}</>;
}

/**
 * The public phone number as a dialable link.
 * @returns the phone link
 */
export function Phone(): ReactNode {
  return (
    <a href={phone.href} className="z-nowrap">
      {phone.display}
    </a>
  );
}

/**
 * The product count as a floor, e.g. "15+".
 * @returns the count followed by a plus sign
 */
export function ProductCount(): ReactNode {
  return <>{`${productCount}+`}</>;
}
