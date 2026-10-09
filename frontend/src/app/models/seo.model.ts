export interface SeoMetaTag {
  name?: string;
  property?: string;
  // Translation key, or plain text.
  content: string;
}

// Set on a route as `data: { seo: {...} }`. Title and description are translation keys.
export interface SeoData {
  title: string;
  description: string;
  // Values for {{placeholders}} in the title / description. Each value is a translation key too,
  // e.g. { service: 'services.items.web-development.title' }.
  params?: Record<string, string>;
  // og:type. Default 'website'.
  type?: 'website' | 'article';
  // Path of the share image (1200×630). Default: SITE_SHARE_IMAGE in config/site.ts.
  image?: string;
  metaTags?: SeoMetaTag[];
}
