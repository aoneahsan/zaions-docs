import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {agency} from '@site/src/data/site';

type Props = WrapperProps<typeof LayoutType>;

/**
 * The publisher and author of every page: the agency, referenced by its zaions.com id, and its founder with the
 * profiles aoneahsan.com publishes, so every site names the same people (zaions-docs#1, AEO 2). Values match
 * projects-finalization-record/ecosystem/owner-profile.json.
 */
const organization = {
  '@type': 'Organization',
  '@id': agency.organizationId,
  name: 'Zaions',
  alternateName: ['Zaions products', 'Zaions projects'],
  url: agency.home,
  sameAs: ['https://zaions.com', 'https://github.com/aoneahsan'],
  founder: {
    '@type': 'Person',
    '@id': 'https://aoneahsan.com/#person',
    name: 'Ahsan Mahmood',
    alternateName: ['Ahsan', 'aoneahsan', 'a1ahsan', 'A1 Ahsan', 'AOne Ahsan'],
    url: 'https://aoneahsan.com',
    sameAs: [
      'https://aoneahsan.com',
      'https://zaions.com',
      'https://github.com/aoneahsan',
      'https://www.linkedin.com/in/aoneahsan',
      'https://www.npmjs.com/~aoneahsan',
      'https://www.upwork.com/freelancers/aoneahsan',
      'https://orcid.org/0009-0006-2311-8687',
    ],
  },
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
