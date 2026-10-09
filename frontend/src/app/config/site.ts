// Public address of the website, without a trailing slash. Used for canonical links and
// Open Graph URLs. Also update it in src/index.html, src/robots.txt and src/sitemap.xml.
export const SITE_URL = 'https://cbl-tech.com';

export const SITE_NAME = 'CBL Tech';

// Site logo (dark text, for the white background). 634×300.
export const SITE_LOGO = 'assets/images/header/site-logo.svg';

// Default image when a page is shared on social media (1200×630). A route can set its own
// with `data.seo.image`.
export const SITE_SHARE_IMAGE = {
  path: 'assets/images/seo/og-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  // Translation key for the image's alt text.
  alt: 'seo.imageAlt',
};

// Open Graph locale per site language.
export const OG_LOCALES: Record<string, string> = {
  fr: 'fr_CH',
  de: 'de_CH',
  en: 'en_GB',
};
