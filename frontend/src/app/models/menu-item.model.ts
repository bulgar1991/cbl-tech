export interface MenuItem {
  id: string;
  // Translation key, e.g. 'header.menu.home'.
  labelKey: string;
  // Router path, e.g. '/services'.
  link: string;
}
