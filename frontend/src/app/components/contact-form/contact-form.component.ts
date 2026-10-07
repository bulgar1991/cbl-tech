import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Web3FormsService } from '@services/web3forms.service';
import { MagneticDirective } from '@directives/magnetic.directive';

type Status = 'idle' | 'sending' | 'success' | 'error';

/** "Get in touch" form, sent to your inbox through Web3Forms. */
@Component({
  imports: [ReactiveFormsModule, MagneticDirective],
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private web3forms = inject(Web3FormsService);
  private fb = inject(FormBuilder);

  status = signal<Status>('idle');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    // Honeypot: hidden from people, bots fill it in.
    botcheck: [false],
  });

  showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    if (value.botcheck) return;

    this.status.set('sending');
    const subject = value.subject.trim();

    this.web3forms
      .send(`${subject} - ${value.name.trim()}`, value.email.trim(), [
        ['Name', value.name.trim()],
        ['Email', value.email.trim()],
        ['Subject', subject],
        ['Message', value.message.trim()],
      ])
      .subscribe((sent) => {
        this.status.set(sent ? 'success' : 'error');
        if (sent) this.form.reset();
      });
  }

  reset(): void {
    this.status.set('idle');
  }
}
