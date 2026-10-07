import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTranslations } from '../../../testing/translations';
import { HeaderComponent } from './header.component';

describe('HeaderComponent mobile sidebar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      // Any url matches, so clicking a menu link navigates without errors.
      providers: [provideRouter([{ path: '**', children: [] }]), provideTestTranslations()],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const body = TestBed.inject(DOCUMENT).body;
    const click = (testId: string) => {
      el.querySelector<HTMLElement>(`[data-testid="${testId}"]`)?.click();
      fixture.detectChanges();
    };
    return { fixture, el, body, click };
  }

  it('should show the logo in the header and in the sidebar', () => {
    const { el, click } = setup();
    expect(el.querySelector('[data-testid="header-logo"] img')?.getAttribute('src')).toBe(
      'assets/images/header/site-logo-light.svg',
    );

    click('mobile-menu-open');
    expect(el.querySelector('.sidebar__logo img')?.getAttribute('alt')).toBe('CBL Tech');
  });

  it('should open the sidebar with every link, lock the page and close again', () => {
    const { el, body, click } = setup();
    expect(el.querySelector('[data-testid="mobile-menu"]')).toBeNull();

    click('mobile-menu-open');
    expect(el.querySelector('[data-testid="mobile-menu"]')).not.toBeNull();
    expect(el.querySelectorAll('[data-testid^="mobile-nav-link-"]').length).toBe(4);
    expect(el.querySelector('[data-testid="mobile-menu-phone"]')?.getAttribute('href')).toBe(
      'tel:+41783231039',
    );
    expect(body.style.overflow).toBe('hidden');

    click('mobile-menu-close');
    expect(el.querySelector('[data-testid="mobile-menu"]')).toBeNull();
    expect(body.style.overflow).toBe('');
  });

  it('should close when a link is chosen or Escape is pressed', async () => {
    const { el, fixture, body, click } = setup();

    click('mobile-menu-open');
    click('mobile-nav-link-about');
    await fixture.whenStable();
    expect(el.querySelector('[data-testid="mobile-menu"]')).toBeNull();

    click('mobile-menu-open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('[data-testid="mobile-menu"]')).toBeNull();
    expect(body.style.overflow).toBe('');
  });
});
