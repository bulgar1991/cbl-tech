import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '@directives/magnetic.directive';

/**
 * Full-screen banner at the top of a page: title, description and one button.
 *
 *   <app-hero-banner title="CBL Tech" description="…" buttonLabel="Get started" buttonLink="/contact" />
 */
@Component({
  imports: [RouterLink, MagneticDirective],
  selector: 'app-hero-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-banner.component.html',
})
export class HeroBannerComponent {
  title = input.required<string>();
  description = input.required<string>();
  buttonLabel = input.required<string>();
  // Router path, e.g. '/contact'.
  buttonLink = input.required<string>();
}
