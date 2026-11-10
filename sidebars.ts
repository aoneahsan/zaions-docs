import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// One curated list, in reading order. A new page is added here in the same change.
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'brief',
    'tours-and-how-it-works',
    'using-zaions-com',
    'how-a-project-runs',
    'packages',
    'handover',
    'paying-an-invoice',
    'open-source',
    {
      type: 'category',
      label: 'Compare',
      link: {type: 'doc', id: 'compare/index'},
      items: [
        'compare/big-agency',
        'compare/solo-freelancer',
        'compare/ai-builder',
        'compare/in-house',
        'compare/hourly-developers',
      ],
    },
    'faq',
  ],
};

export default sidebars;
