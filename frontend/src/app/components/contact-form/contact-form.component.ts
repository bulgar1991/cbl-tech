import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Web3FormsService } from '@services/web3forms.service';
import { MagneticDirective } from '@directives/magnetic.directive';
import { CONTACT_EMAIL_LABELS, contactEmailSubject } from './contact-form.email';

type Status = 'idle' | 'sending' | 'success' | 'error';

// Optional +, then digits with spaces, dots, dashes or brackets (at least 6 digits' worth).
const PHONE_PATTERN = /^\+?[\d\s().-]{6,20}$/;

/** "Get in touch" form, sent to your inbox through Web3Forms. */
@Component({
  imports: [TranslatePipe, ReactiveFormsModule, MagneticDirective],
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private web3forms = inject(Web3FormsService);
  private fb = inject(FormBuilder);

  status = signal<Status>('idle');

  form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(60)]],
    lastName: ['', [Validators.required, Validators.maxLength(60)]],
    company: ['', [Validators.maxLength(120)]],
    jobTitle: ['', [Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(PHONE_PATTERN)]],
    project: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
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
    const firstName = value.firstName.trim();
    const lastName = value.lastName.trim();
    const company = value.company.trim();
    const email = value.email.trim();

    this.web3forms
      .send(contactEmailSubject(`${firstName} ${lastName}`, company), email, [
        [CONTACT_EMAIL_LABELS.firstName, firstName],
        [CONTACT_EMAIL_LABELS.lastName, lastName],
        [CONTACT_EMAIL_LABELS.company, company],
        [CONTACT_EMAIL_LABELS.jobTitle, value.jobTitle.trim()],
        [CONTACT_EMAIL_LABELS.email, email],
        [CONTACT_EMAIL_LABELS.phone, value.phone.trim()],
        [CONTACT_EMAIL_LABELS.project, value.project.trim()],
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
