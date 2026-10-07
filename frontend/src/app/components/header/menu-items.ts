import { MenuItem } from '@models/menu-item.model';

// Links shown in the header and footer. Labels live in assets/i18n/*.json under "header.menu".
export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', labelKey: 'header.menu.home', link: '/' },
  { id: 'about', labelKey: 'header.menu.about', link: '/about' },
  { id: 'services', labelKey: 'header.menu.services', link: '/services' },
  { id: 'contact', labelKey: 'header.menu.contact', link: '/contact' },
];
