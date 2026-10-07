import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AboutSectionComponent } from '@components/about-section/about-section.component';
import { ServicesSectionComponent } from '@components/services-section/services-section.component';
import { ContactSectionComponent } from '@components/contact-section/contact-section.component';
import { HeroBannerComponent } from '@components/hero-banner/hero-banner.component';

@Component({
  imports: [
    TranslatePipe,
    AboutSectionComponent,
    ContactSectionComponent,
    HeroBannerComponent,
    ServicesSectionComponent,
  ],
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
})
export class HomeComponent {}
