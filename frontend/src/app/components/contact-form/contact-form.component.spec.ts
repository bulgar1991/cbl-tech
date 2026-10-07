import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Web3FormsService } from '@services/web3forms.service';
import { provideTestTranslations } from '../../../testing/translations';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  const send = vi.fn(() => of(true));

  beforeEach(async () => {
    send.mockClear();
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [{ provide: Web3FormsService, useValue: { send } }, provideTestTranslations()],
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(ContactFormComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('should have all the requested fields', () => {
    const fixture = TestBed.createComponent(ContactFormComponent);
    fixture.detectChanges();
    const names = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('[formControlName]'),
    ].map((el) => el.getAttribute('formControlName'));

    expect(names).toEqual([
      'firstName',
      'lastName',
      'company',
      'jobTitle',
      'email',
      'phone',
      'project',
      'botcheck',
    ]);
  });

  it('should not send when required fields are missing', () => {
    const form = create();
    form.submit();

    expect(send).not.toHaveBeenCalled();
    expect(form.showError('firstName')).toBe(true);
    expect(form.showError('company')).toBe(false);
  });

  it('should reject an invalid phone number', () => {
    const form = create();
    form.form.controls.phone.setValue('call me');
    expect(form.form.controls.phone.valid).toBe(false);
    form.form.controls.phone.setValue('+41 78 323 10 39');
    expect(form.form.controls.phone.valid).toBe(true);
  });

  it('should send every field to Web3Forms', () => {
    const form = create();
    form.form.setValue({
      firstName: 'Ada',
      lastName: 'Lovelace',
      company: 'Analytical Engines',
      jobTitle: 'CTO',
      email: 'ada@example.com',
      phone: '+44 20 1234 5678',
      project: 'A new website for our engines.',
      botcheck: false,
    });
    form.submit();

    expect(send).toHaveBeenCalledWith(
      expect.stringContaining('Ada Lovelace (Analytical Engines)'),
      'ada@example.com',
      [
        ['Prénom', 'Ada'],
        ['Nom', 'Lovelace'],
        ["Nom de l'entreprise", 'Analytical Engines'],
        ['Poste occupé', 'CTO'],
        ['E-mail', 'ada@example.com'],
        ['Téléphone portable', '+44 20 1234 5678'],
        ['Informations sur le projet', 'A new website for our engines.'],
      ],
    );
    expect(form.status()).toBe('success');
  });
});
