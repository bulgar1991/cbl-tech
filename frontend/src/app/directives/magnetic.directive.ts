import { Directive, ElementRef, inject, input } from '@angular/core';

/** Pulls the element slightly toward the cursor while it hovers (nice on buttons). */
@Directive({
  selector: '[appMagnetic]',
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'onLeave()',
  },
})
export class MagneticDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  magneticStrength = input(0.3);

  onMove(event: MouseEvent): void {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - rect.left - rect.width / 2) * this.magneticStrength();
    const dy = (event.clientY - rect.top - rect.height / 2) * this.magneticStrength();
    node.style.translate = `${dx}px ${dy}px`;
  }

  onLeave(): void {
    this.el.nativeElement.style.translate = '';
  }
}
