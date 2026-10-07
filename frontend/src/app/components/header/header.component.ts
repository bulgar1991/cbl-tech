import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
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

  links = [
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ];

  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}
