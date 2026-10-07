import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';

/** Page frame: skip link, header, routed page and footer. */
@Component({
  imports: [TranslatePipe, RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './main-layout.component.scss',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
