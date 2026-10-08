import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SHOW_CONTACT_EMAIL,
} from '@/config/contact';

/**
 * Contact block: centered title, the form on the left, and an image with a call button on the right.
 * Used on the home page and on /contact (where the page header already has the title).
 */
@Component({
  imports: [TranslatePipe, ContactFormComponent, MagneticDirective, RevealDirective],
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact-section.component.scss',
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  // Hide the section title when the page already shows one.
  showTitle = input(true);

  // Placeholder illustration (transparent PNG, 800×600) - replace with your own.
  protected readonly image = 'assets/images/contact/contact.png';
  protected readonly phone = CONTACT_PHONE;
  protected readonly phoneHref = CONTACT_PHONE_HREF;
  protected readonly email = CONTACT_EMAIL;
  protected readonly emailHref = CONTACT_EMAIL_HREF;
  protected readonly showEmail = SHOW_CONTACT_EMAIL;
}
