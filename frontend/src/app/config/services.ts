import { Service } from '@models/service.model';

// Services shown on /services and /services/:id. Placeholder texts - replace with your own.
export const SERVICES: Service[] = [
  {
    id: 'web-development',
    icon: '💻',
    title: 'Web development',
    summary: 'Fast, modern websites and web apps built with Angular.',
    description:
      'From landing pages to full web applications, we build sites that load fast, rank well and are easy to grow.',
    points: [
      'Angular single-page applications',
      'Responsive design for every screen',
      'SEO-friendly structure and metadata',
      'Hosting and deployment on Vercel',
    ],
  },
  {
    id: 'ui-ux-design',
    icon: '🎨',
    title: 'UI / UX design',
    summary: 'Interfaces that look sharp and are easy to use.',
    description:
      'We design clear, accessible interfaces with a strong visual identity, from wireframes to the final pixel.',
    points: [
      'Wireframes and interactive prototypes',
      'Design systems and component libraries',
      'Accessibility (WCAG) reviews',
      'Animations and micro-interactions',
    ],
  },
  {
    id: 'mobile-apps',
    icon: '📱',
    title: 'Mobile apps',
    summary: 'Apps for iOS and Android from a single codebase.',
    description:
      'We turn your idea into a mobile app that works offline, sends notifications and feels native on every phone.',
    points: [
      'Progressive web apps (PWA)',
      'Cross-platform iOS and Android apps',
      'Push notifications and offline mode',
      'App store publishing',
    ],
  },
  {
    id: 'support-maintenance',
    icon: '🛡️',
    title: 'Support & maintenance',
    summary: 'Updates, monitoring and fixes so your product keeps running.',
    description:
      'We keep your site or app secure and up to date, and we are there when something needs fixing.',
    points: [
      'Framework and dependency updates',
      'Uptime and error monitoring',
      'Security patches',
      'Small changes and new features',
    ],
  },
];

export function findService(id: string | null | undefined): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}
