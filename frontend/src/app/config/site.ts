// Public address of the website, without a trailing slash. Used for canonical links and
// Open Graph URLs. Also update it in src/robots.txt and src/sitemap.xml.
export const SITE_URL = 'https://cbl-tech.com';

export const SITE_NAME = 'CBL Tech';

// Site logo (dark text, for the white background). 634×300.
export const SITE_LOGO = 'assets/images/header/site-logo.svg';

// Open Graph locale per site language.
export const OG_LOCALES: Record<string, string> = {
  fr: 'fr_CH',
  de: 'de_CH',
  en: 'en_GB',
};
