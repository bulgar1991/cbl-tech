export interface SeoMetaTag {
  name?: string;
  property?: string;
  // Translation key, or plain text.
  content: string;
}

// Turns a translation key into text in the current language.
export type Translate = (key: string) => string;

// Set on a route as `data: { seo: {...} }`. Title and description are translation keys.
export interface SeoData {
  title: string;
  description: string;
  // og:type - 'article' for blog posts. Default 'website'.
  type?: 'website' | 'article';
  // Path of the share image, e.g. 'assets/images/news/5-tips.jpg'. Default: the site image.
  image?: string;
  metaTags?: SeoMetaTag[];
  // schema.org objects for this page, built again when the language changes.
  jsonLd?: (translate: Translate, url: string, lang: string) => object[];
}
