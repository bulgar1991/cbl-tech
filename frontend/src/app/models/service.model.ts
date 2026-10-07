export interface Service {
  // URL slug: /services/<id>.
  id: string;
  icon: string;
  // Translation key prefix, e.g. 'services.items.web-development' -> '.title', '.summary',
  // '.description' and '.points' (a list) in assets/i18n/*.json.
  key: string;
}
