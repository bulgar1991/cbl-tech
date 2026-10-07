import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import { SERVICES } from '@/config/services';

/** "Our Services" section on the home page: services list on the left, image on the right. */
@Component({
  imports: [TranslatePipe, RouterLink, MagneticDirective, RevealDirective],
  selector: 'app-services-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services-section.component.scss',
  templateUrl: './services-section.component.html',
})
export class ServicesSectionComponent {
  // Placeholder illustration (transparent PNG, 800×800) - replace with your own.
  protected readonly image = 'assets/images/services/services.png';

  services = SERVICES;
}
