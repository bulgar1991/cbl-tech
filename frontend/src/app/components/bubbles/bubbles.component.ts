import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Bubble {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  swayDuration: number;
  opacity: number;
  color: string;
}

const COLORS = ['var(--bubble-1)', 'var(--bubble-2)', 'var(--bubble-3)', 'var(--bubble-4)'];

/**
 * Full-screen floating bubbles: glassy circles rise slowly from the bottom and sway side to side.
 * Each bubble is two elements - the outer one rises, the inner one sways - both moved by CSS
 * transform animations, so all motion runs on the compositor with no per-frame JS.
 */
@Component({
  selector: 'app-bubbles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './bubbles.component.scss',
  template: `
    @for (b of bubbles(); track $index) {
      <span
        class="bubble"
        [style.left.%]="b.left"
        [style.animation-duration.s]="b.duration"
        [style.animation-delay.s]="b.delay"
      >
        <span
          class="bubble__body"
          [style.width.px]="b.size"
          [style.height.px]="b.size"
          [style.opacity]="b.opacity"
          [style.animation-duration.s]="b.swayDuration"
          [style.--sway.px]="b.sway"
          [style.--color]="b.color"
        ></span>
      </span>
    }
  `,
  host: { 'aria-hidden': 'true' },
})
export class BubblesComponent {
  // Number of bubbles per 1000px of screen width.
  density = input(14);

  protected bubbles = computed<Bubble[]>(() => {
    const width = typeof window === 'undefined' ? 1000 : window.innerWidth;
    const count = Math.round((width / 1000) * this.density());
    return Array.from({ length: count }, () => {
      // Bigger bubbles are closer: they rise faster and are more visible.
      const depth = Math.random();
      const duration = 26 - depth * 14;
      return {
        left: Math.random() * 100,
        size: 10 + depth * 46,
        duration,
        // Negative delay so bubbles are already on screen on first paint.
        delay: -Math.random() * duration,
        sway: 10 + Math.random() * 30,
        swayDuration: 3 + Math.random() * 4,
        opacity: 0.35 + depth * 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });
  });
}
