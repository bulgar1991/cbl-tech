import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

interface Column {
  left: number;
  // Trail length in squares.
  length: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  // Start / end of the fall in px, and how many square-sized jumps it takes.
  from: number;
  to: number;
  steps: number;
}

const COLORS = ['var(--matrix-1)', 'var(--matrix-2)', 'var(--matrix-3)'];

/**
 * Matrix-style rain made of squares: columns of squares on a grid that drop one square at a time,
 * with a bright head and a fading trail. Each column is one element moved by a CSS transform
 * animation, so it runs on the compositor with no per-frame JS.
 */
@Component({
  selector: 'app-matrix-rain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './matrix-rain.component.scss',
  template: `
    @for (c of columns(); track $index) {
      <span
        class="column"
        [style.left.px]="c.left"
        [style.height.px]="c.length * cell()"
        [style.opacity]="c.opacity"
        [style.animation-duration.s]="c.duration"
        [style.animation-delay.s]="c.delay"
        [style.animation-timing-function]="'steps(' + c.steps + ')'"
        [style.--from.px]="c.from"
        [style.--to.px]="c.to"
        [style.--cell.px]="cell()"
        [style.--color]="c.color"
      ></span>
    }
  `,
  host: {
    'aria-hidden': 'true',
    '(window:resize)': 'onResize()',
  },
})
export class MatrixRainComponent {
  // Size of one square incl. its gap, in px.
  cell = input(16);
  // Share of grid columns that have a falling trail (0-1).
  density = input(0.3);

  private viewport = signal(this.readViewport());
  private resizeTimer?: ReturnType<typeof setTimeout>;

  protected columns = computed<Column[]>(() => {
    const cell = this.cell();
    const { width, height } = this.viewport();
    const columns: Column[] = [];

    for (let x = 0; x < width; x += cell) {
      if (Math.random() > this.density()) continue;
      const length = 6 + Math.floor(Math.random() * 18);
      const from = -length * cell;
      // Snap the end to the grid so every jump is exactly one square.
      const steps = Math.ceil((height - from) / cell);
      const duration = steps * (0.04 + Math.random() * 0.06);
      columns.push({
        left: x,
        length,
        duration,
        delay: -Math.random() * duration,
        opacity: 0.3 + Math.random() * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        from,
        to: from + steps * cell,
        steps,
      });
    }
    return columns;
  });

  // Rebuild the grid once the window stops resizing.
  onResize(): void {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.viewport.set(this.readViewport()), 200);
  }

  private readViewport(): { width: number; height: number } {
    return typeof window === 'undefined'
      ? { width: 1280, height: 800 }
      : { width: window.innerWidth, height: window.innerHeight };
  }
}
