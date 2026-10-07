import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import { TiltDirective } from '@directives/tilt.directive';
import { VALUES } from './about.items';

@Component({
  imports: [PageHeaderComponent, RouterLink, MagneticDirective, RevealDirective, TiltDirective],
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  values = VALUES;
}
