import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { A11y, Navigation } from 'swiper/modules';
import { RevealDirective } from '@directives/reveal.directive';
import { ABOUT_ITEMS } from './about-section.items';

/** "About us" section on the home page: a full-width, centered, looping row of glass cards. */
@Component({
  imports: [RouterLink, RevealDirective],
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about-section.component.scss',
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  private swiperEl = viewChild.required<ElementRef<HTMLElement>>('swiperEl');
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private swiper?: Swiper;

  items = ABOUT_ITEMS;
  // Loop mode needs more slides than are visible at once (5), so the cards are rendered twice.
  slides = [...ABOUT_ITEMS, ...ABOUT_ITEMS];
  // Index of the centered card in `items`, for the dots.
  active = signal(0);

  constructor() {
    afterNextRender(() => {
      this.swiper = new Swiper(this.swiperEl().nativeElement, {
        modules: [A11y, Navigation],
        loop: true,
        centeredSlides: true,
        slidesPerView: 1.3,
        spaceBetween: 16,
        grabCursor: true,
        // Scoped to this component, in case the section is used twice on a page.
        navigation: {
          prevEl: this.host.querySelector<HTMLElement>('.about-section__arrow--prev'),
          nextEl: this.host.querySelector<HTMLElement>('.about-section__arrow--next'),
        },
        breakpoints: {
          640: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        },
        on: {
          realIndexChange: (swiper) => this.active.set(swiper.realIndex % this.items.length),
        },
      });
    });

    inject(DestroyRef).onDestroy(() => this.swiper?.destroy());
  }

  goTo(index: number): void {
    this.swiper?.slideToLoop(index);
  }
}
