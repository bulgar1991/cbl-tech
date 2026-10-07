import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Title band at the top of inner pages, with a breadcrumb back to home.
 *
 *   <app-page-header title="About us" subtitle="Who we are" />
 *
 * `parent` adds a middle breadcrumb step, e.g. Home > Services > <service title>.
 */
@Component({
  imports: [RouterLink],
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  parent = input<{ label: string; link: string }>();
}
