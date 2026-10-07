import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
} from '@angular/core';

/** A soft gradient spotlight that follows the mouse across the page. */
@Component({
  selector: 'app-cursor-glow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cursor-glow.component.scss',
  template: '',
})
export class CursorGlowComponent {
  constructor() {
    const node = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    const onMove = (event: MouseEvent) => {
      node.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    // Outside Angular so mouse moves don't trigger change detection.
    afterNextRender(() =>
      zone.runOutsideAngular(() => document.addEventListener('mousemove', onMove)),
    );
    destroyRef.onDestroy(() => document.removeEventListener('mousemove', onMove));
  }
}
