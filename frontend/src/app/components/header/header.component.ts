import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/config/contact';
import { SITE_LOGO, SITE_NAME } from '@/config/site';
import { MENU_ITEMS } from './menu-items';

// Same breakpoint as `lg` in header.component.html, where the desktop menu takes over.
const DESKTOP_MIN_WIDTH = 1024;

@Component({
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()',
    '(document:keydown.escape)': 'closeSidebar()',
  },
})
export class HeaderComponent {
  private document = inject(DOCUMENT);

  scrolled = signal(false);
  sidebarOpen = signal(false);

  siteName = SITE_NAME;
  logo = SITE_LOGO;
  links = MENU_ITEMS;
  phone = CONTACT_PHONE;
  phoneHref = CONTACT_PHONE_HREF;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unlockScroll());
  }

  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  openSidebar(): void {
    this.sidebarOpen.set(true);
    // Stop the page behind the sidebar from scrolling.
    this.document.body.style.overflow = 'hidden';
  }

  closeSidebar(): void {
    if (!this.sidebarOpen()) return;
    this.sidebarOpen.set(false);
    this.unlockScroll();
  }

  // Rotating a tablet or widening the window switches to the desktop menu - don't leave
  // the page locked behind a hidden sidebar.
  onResize(): void {
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) this.closeSidebar();
  }

  private unlockScroll(): void {
    this.document.body.style.overflow = '';
  }
}
