import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/LastUpdated';

const longDate = new Intl.DateTimeFormat('en-US', {dateStyle: 'long', timeZone: 'UTC'});

/**
 * "Page updated October 9, 2026." from the file's last git commit. No author byline: the
 * organization is the author.
 * @param props.lastUpdatedAt - the last-commit timestamp in milliseconds
 * @returns the page-updated line, or nothing when no date is known
 */
export default function LastUpdated({lastUpdatedAt}: Props): ReactNode {
  if (!lastUpdatedAt) {
    return null;
  }
  const date = new Date(lastUpdatedAt);
  return (
    <span className={ThemeClassNames.common.lastUpdated}>
      <Translate
        id="common.updatedOn"
        description="Page footer line naming the date the page last changed"
        values={{date: <time dateTime={date.toISOString()}>{longDate.format(date)}</time>}}>
        {'Page updated {date}.'}
      </Translate>
    </span>
  );
}
