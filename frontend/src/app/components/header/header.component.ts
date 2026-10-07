import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SITE_NAME } from '@/config/site';
import { MENU_ITEMS } from './menu-items';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class HeaderComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  siteName = SITE_NAME;
  links = MENU_ITEMS;

  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}
