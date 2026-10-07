import { Directive, ElementRef, inject, input } from '@angular/core';

/** 3D tilt that follows the mouse, plus a `--glow-x` / `--glow-y` spotlight position for CSS. */
@Directive({
  selector: '[appTilt]',
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'onLeave()',
    style: 'transform-style: preserve-3d; will-change: transform;',
  },
})
export class TiltDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  // Max rotation in degrees.
  tiltMax = input(10);

  onMove(event: MouseEvent): void {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const max = this.tiltMax();
    node.style.transition = 'transform 0.1s ease-out';
    node.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) scale(1.03)`;
    node.style.setProperty('--glow-x', `${x * 100}%`);
    node.style.setProperty('--glow-y', `${y * 100}%`);
  }

  onLeave(): void {
    const node = this.el.nativeElement;
    node.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    node.style.transform = '';
  }
}
