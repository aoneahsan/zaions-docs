import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {agency} from '@site/src/data/site';

type Props = WrapperProps<typeof LayoutType>;

/** The publisher and author of every page: the agency, referenced by its zaions.com id. */
const organization = {
  '@type': 'Organization',
  '@id': agency.organizationId,
  name: 'Zaions',
  url: agency.home,
};

/**
 * Adds one JSON-LD node per doc page: `WebPage` on the docs home, `Article` everywhere else.
 * The FAQPage on /faq is added after the build from the rendered Q&A (src/plugins/faq-schema).
 * @param props - the original DocItem layout props
 * @returns the original layout plus the structured-data script
 */
export default function LayoutWrapper(props: Props): ReactNode {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const url = `${siteConfig.url}${metadata.permalink}`;
  const isHome = metadata.permalink === '/';
  const dateModified = metadata.lastUpdatedAt
    ? new Date(metadata.lastUpdatedAt).toISOString()
    : undefined;
  const title = frontMatter.title ?? metadata.title;

  const node = isHome
    ? {
        '@type': 'WebPage',
        name: title,
        description: metadata.description,
        url,
        mainEntityOfPage: url,
        ...(dateModified ? {dateModified} : {}),
        author: {'@id': agency.organizationId},
        publisher: {'@id': agency.organizationId},
      }
    : {
        '@type': 'Article',
        headline: title,
        description: metadata.description,
        url,
        mainEntityOfPage: url,
        ...(dateModified ? {dateModified} : {}),
        author: {'@id': agency.organizationId},
        publisher: {'@id': agency.organizationId},
      };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify({'@context': 'https://schema.org', '@graph': [organization, node]})}</script>
      </Head>
      <Layout {...props} />
    </>
  );
}
