import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { MagneticDirective } from '@directives/magnetic.directive';
import { RevealDirective } from '@directives/reveal.directive';
import { TiltDirective } from '@directives/tilt.directive';

@Component({
  imports: [ContactFormComponent, MagneticDirective, RevealDirective, TiltDirective],
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  features = [
    {
      icon: '⚡',
      title: 'Fast',
      text: 'Lightning quick builds powered by the Angular application builder.',
    },
    {
      icon: '🎨',
      title: 'Gradients',
      text: 'Every color lives in tailwind.config.js, ready for classes and SCSS.',
    },
    {
      icon: '🌧️',
      title: 'Effects',
      text: 'Bullet rain, tilt cards, magnetic buttons, reveals and glows.',
    },
    { icon: '✉️', title: 'Forms', text: 'Web3Forms delivers your forms straight to your inbox.' },
    { icon: '🛡️', title: 'Reliable', text: 'Strict TypeScript, ESLint and Prettier from day one.' },
    { icon: '🚀', title: 'Ready', text: 'Standalone components, signals and OnPush by default.' },
  ];

  stats = [
    { value: '99%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: '150+', label: 'Projects' },
    { value: '10x', label: 'Faster' },
  ];
}
