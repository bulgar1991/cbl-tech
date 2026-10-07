import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MENU_ITEMS } from '@components/header/menu-items';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '@/config/contact';
import { SERVICES } from '@/config/services';
import { SITE_LOGO, SITE_NAME } from '@/config/site';

@Component({
  imports: [TranslatePipe, RouterLink],
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  siteName = SITE_NAME;
  logo = SITE_LOGO;
  year = new Date().getFullYear();
  menuItems = MENU_ITEMS;
  services = SERVICES;
  phone = CONTACT_PHONE;
  phoneHref = CONTACT_PHONE_HREF;
  email = CONTACT_EMAIL;
  emailHref = CONTACT_EMAIL_HREF;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
