import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  input,
  viewChild,
} from '@angular/core';

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
  color: string;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

/**
 * Full-screen "bullet rain": glowing drops fall, leave a gradient trail and splash at the bottom.
 * Colors come from the Tailwind palette through CSS variables (see rain.component.scss).
 */
@Component({
  selector: 'app-rain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './rain.component.scss',
  template: '<canvas #canvas aria-hidden="true"></canvas>',
})
export class RainComponent implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // Number of drops per 1000px of screen width.
  density = input(90);

  private ctx!: CanvasRenderingContext2D;
  private drops: Drop[] = [];
  private splashes: Splash[] = [];
  private colors: string[] = [];
  private frame = 0;
  private width = 0;
  private height = 0;
  private onResize = () => this.resize();

  ngAfterViewInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const style = getComputedStyle(this.host.nativeElement);
    this.colors = ['--rain-1', '--rain-2', '--rain-3', '--rain-4'].map((v) =>
      style.getPropertyValue(v).trim(),
    );
    this.ctx = this.canvas().nativeElement.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', this.onResize);
    // Animate outside Angular so every frame doesn't trigger change detection.
    this.zone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.onResize);
  }

  private resize(): void {
    const canvas = this.canvas().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((this.width / 1000) * this.density());
    this.drops = Array.from({ length: count }, () => this.newDrop(true));
  }

  private newDrop(anywhere = false): Drop {
    const depth = Math.random();
    return {
      x: Math.random() * this.width,
      y: anywhere ? Math.random() * this.height : -50,
      length: 10 + depth * 30,
      speed: 4 + depth * 10,
      width: 0.6 + depth * 1.8,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    };
  }

  private loop = (): void => {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < this.drops.length; i++) {
      const d = this.drops[i];
      d.y += d.speed;

      // Gradient trail with a bright bullet head.
      const trail = ctx.createLinearGradient(d.x, d.y - d.length, d.x, d.y);
      trail.addColorStop(0, 'transparent');
      trail.addColorStop(1, d.color);
      ctx.strokeStyle = trail;
      ctx.lineWidth = d.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(d.x, d.y - d.length);
      ctx.lineTo(d.x, d.y);
      ctx.stroke();

      ctx.fillStyle = d.color;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.width * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (d.y > height) {
        this.splash(d);
        this.drops[i] = this.newDrop();
      }
    }

    for (let i = this.splashes.length - 1; i >= 0; i--) {
      const s = this.splashes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.15;
      s.life -= 0.03;
      if (s.life <= 0) {
        this.splashes.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    this.frame = requestAnimationFrame(this.loop);
  };

  private splash(d: Drop): void {
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      this.splashes.push({
        x: d.x,
        y: this.height - 2,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 3 - 1,
        life: 1,
        color: d.color,
      });
    }
  }
}
