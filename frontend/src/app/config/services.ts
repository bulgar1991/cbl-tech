import { Service } from '@models/service.model';

// Services shown on /services and /services/:id. Texts live in assets/i18n/*.json under
// "services.items.<id>" (placeholder texts - replace with your own).
export const SERVICES: Service[] = [
  { id: 'web-development', icon: '💻', key: 'services.items.web-development' },
  { id: 'ui-ux-design', icon: '🎨', key: 'services.items.ui-ux-design' },
  { id: 'mobile-apps', icon: '📱', key: 'services.items.mobile-apps' },
  { id: 'support-maintenance', icon: '🛡️', key: 'services.items.support-maintenance' },
];

export function findService(id: string | null | undefined): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}
