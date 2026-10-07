import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import { Service } from '@models/service.model';

@Component({
  imports: [TranslatePipe, PageHeaderComponent, RouterLink, MagneticDirective, RevealDirective],
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  private translate = inject(TranslateService);

  // Set by serviceSeoResolver (route `resolve: { service }`).
  service = input.required<Service>();

  // "What's included" list - an array in the translation files, re-read when the language changes.
  protected points = computed(() => {
    this.translate.currentLang();
    const points: unknown = this.translate.instant(this.service().key + '.points');
    return Array.isArray(points) ? (points as string[]) : [];
  });
}
