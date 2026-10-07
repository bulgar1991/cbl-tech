export interface SeoMetaTag {
  name?: string;
  property?: string;
  content: string;
}

// Set on a route as `data: { seo: {...} }`.
export interface SeoData {
  title: string;
  description: string;
  // og:type. Default 'website'.
  type?: 'website' | 'article';
  // Path of the share image, e.g. 'assets/images/og-image.jpg' (1200×630).
  image?: string;
  metaTags?: SeoMetaTag[];
}
