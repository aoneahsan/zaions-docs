import React, {type ComponentProps, type ReactNode} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import StartProject from '@site/src/components/StartProject';
import ExternalSuffix, {isExternal} from '@site/src/components/ExternalSuffix';
import {Phone, Price, ProductCount} from '@site/src/components/SiteData';

const OriginalA = MDXComponents.a;

/**
 * Markdown links: external ones open in a new tab (Docusaurus default), so they carry a
 * screen-reader suffix saying so.
 * @param props - the anchor props from MDX
 * @returns the rendered link
 */
function A(props: ComponentProps<'a'>): ReactNode {
  if (!isExternal(props.href)) {
    return <OriginalA {...props} />;
  }
  return (
    <OriginalA {...props}>
      {props.children}
      <ExternalSuffix />
    </OriginalA>
  );
}

export default {
  ...MDXComponents,
  a: A,
  StartProject,
  Price,
  Phone,
  ProductCount,
};
