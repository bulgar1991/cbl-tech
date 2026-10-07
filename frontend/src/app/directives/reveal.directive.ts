import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Fades and slides the element in the first time it scrolls into view (see `.reveal` in styles.scss). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  // Delay in ms, to stagger a list of items.
  revealDelay = input(0);

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.style.transitionDelay = `${this.revealDelay()}ms`;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
