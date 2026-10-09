import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import type {Props} from '@theme/NotFound/Content';
import ExternalSuffix from '@site/src/components/ExternalSuffix';
import {agency} from '@site/src/data/site';
import styles from './styles.module.css';

/**
 * The 404 body: what happened, then where to go next.
 * @param props.className - optional class from the page wrapper
 * @returns the not-found content
 */
export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1">
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              {"This page isn't here."}
            </Translate>
          </Heading>
          <p>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              The link may be out of date, or the address mistyped. Try one of these instead.
            </Translate>
          </p>
          <nav aria-label={translate({id: 'states.notFound.linksLabel', message: 'Where next'})}>
            <ul className={styles.links}>
              <li>
                <Link className={styles.primary} href={agency.startProject}>
                  {translate({id: 'cta.start', message: 'Start a project'})}
                  <ExternalSuffix />
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/">
                  {translate({id: 'states.notFound.home', message: 'Back to home'})}
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/packages">
                  {translate({id: 'nav.packages', message: 'Packages'})}
                </Link>
              </li>
              <li>
                <Link className={styles.link} href={agency.services}>
                  {translate({id: 'nav.services', message: 'Services'})}
                  <ExternalSuffix />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
