import { AboutItem } from '@models/about-item.model';

// Slides of the "About us" section on the home page. Texts live in assets/i18n/*.json under
// "aboutSection.items" (placeholder texts - replace with your own).
export const ABOUT_ITEMS: AboutItem[] = [
  { icon: '👋', key: 'aboutSection.items.who' },
  { icon: '🎯', key: 'aboutSection.items.mission' },
  { icon: '🧭', key: 'aboutSection.items.how' },
  { icon: '⚙️', key: 'aboutSection.items.tech' },
  { icon: '🤝', key: 'aboutSection.items.partnership' },
];
