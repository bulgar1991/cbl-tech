export interface Service {
  // URL slug: /services/<id>.
  id: string;
  icon: string;
  title: string;
  // One line for cards.
  summary: string;
  // Intro paragraph on the detail page.
  description: string;
  // What's included, shown as a list on the detail page.
  points: string[];
}
