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
      label: 'Products from Zaions',
      link: {type: 'doc', id: 'ecosystem/index'},
      items: [
        'ecosystem/achat', 'ecosystem/callvault', 'ecosystem/capacitor-auth-manager',
        'ecosystem/clearhire', 'ecosystem/eatthis', 'ecosystem/empora',
        'ecosystem/habitforge', 'ecosystem/labflow', 'ecosystem/lifewell',
        'ecosystem/linux-cleanup', 'ecosystem/macleanup', 'ecosystem/native-update',
        'ecosystem/netcage', 'ecosystem/pregnancypal', 'ecosystem/rentparty',
        'ecosystem/smsapp', 'ecosystem/strata-storage', 'ecosystem/tilawah',
        'ecosystem/trizlink', 'ecosystem/video-controls-plus', 'ecosystem/waylock',
        'ecosystem/windowsweep', 'ecosystem/ztools',
      ],
    },
    'about-developer',
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
