import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MagneticDirective } from '@directives/magnetic.directive';

@Component({
  imports: [TranslatePipe, RouterLink, MagneticDirective],
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
