import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { RevealDirective } from '@directives/reveal.directive';
import { TiltDirective } from '@directives/tilt.directive';
import { SERVICES } from '@/config/services';

@Component({
  imports: [PageHeaderComponent, RouterLink, RevealDirective, TiltDirective],
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = SERVICES;
}
