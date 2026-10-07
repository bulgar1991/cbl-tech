import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import { Service } from '@models/service.model';

@Component({
  imports: [PageHeaderComponent, RouterLink, MagneticDirective, RevealDirective],
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  // Set by serviceSeoResolver (route `resolve: { service }`).
  service = input.required<Service>();
}
