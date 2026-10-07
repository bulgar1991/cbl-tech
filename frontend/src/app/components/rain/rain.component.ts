import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Drop {
  left: number;
  length: number;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const COLORS = ['var(--rain-1)', 'var(--rain-2)', 'var(--rain-3)', 'var(--rain-4)'];

/**
 * Full-screen rain: each drop is a span falling via a CSS transform animation,
 * so all motion runs on the compositor with no per-frame JS.
 * Colors come from the Tailwind palette through CSS variables (see rain.component.scss).
 */
@Component({
  selector: 'app-rain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './rain.component.scss',
  template: `
    @for (d of drops(); track $index) {
      <span
        class="drop"
        [style.left.%]="d.left"
        [style.height.px]="d.length"
        [style.width.px]="d.width"
        [style.opacity]="d.opacity"
        [style.animation-duration.s]="d.duration"
        [style.animation-delay.s]="d.delay"
        [style.--drop-color]="d.color"
      ></span>
    }
  `,
  host: { 'aria-hidden': 'true' },
})
export class RainComponent {
  // Number of drops per 1000px of screen width.
  density = input(40);

  protected drops = computed<Drop[]>(() => {
    const width = typeof window === 'undefined' ? 1000 : window.innerWidth;
    const count = Math.round((width / 1000) * this.density());
    return Array.from({ length: count }, () => {
      const depth = Math.random();
      const duration = 1.6 - depth * 0.9;
      return {
        left: Math.random() * 100,
        length: 20 + depth * 40,
        width: 1 + depth * 1.5,
        duration,
        // Negative delay so drops are already mid-fall on first paint.
        delay: -Math.random() * duration,
        opacity: 0.35 + depth * 0.65,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });
  });
}
