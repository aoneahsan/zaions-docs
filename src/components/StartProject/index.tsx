import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import ExternalSuffix from '@site/src/components/ExternalSuffix';
import {agency} from '@site/src/data/site';
import styles from './styles.module.css';

/**
 * The closing call to action every page carries: start a project, or book the free consultation.
 * Both strings live here once, matching `cta.start` / `cta.consult` on zaions.com.
 * @returns the two-link CTA block
 */
export default function StartProject(): ReactNode {
  return (
    <div className={styles.cta}>
      <Link className={styles.primary} href={agency.startProject}>
        {translate({id: 'cta.start', message: 'Start a project'})}
        <ExternalSuffix />
      </Link>
      <Link className={styles.secondary} href={agency.consultation}>
        {translate({id: 'cta.consult', message: 'Book a free consultation'})}
        <ExternalSuffix />
      </Link>
    </div>
  );
}
