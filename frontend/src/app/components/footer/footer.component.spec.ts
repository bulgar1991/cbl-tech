import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SERVICES } from '@/config/services';
import { MENU_ITEMS } from '@components/header/menu-items';
import { provideTestTranslations } from '../../../testing/translations';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([]), provideTestTranslations()],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should link every menu page and every service', () => {
    const footer = render();

    expect(footer.querySelectorAll('[data-testid^="footer-nav-link-"]').length).toBe(
      MENU_ITEMS.length,
    );
    for (const service of SERVICES) {
      const link = footer.querySelector(`[data-testid="footer-service-link-${service.id}"]`);
      expect(link?.getAttribute('href')).toBe(`/services/${service.id}`);
    }
  });

  it('should show the phone as a tel: link, hide the email and show the current year', () => {
    const footer = render();

    // Hidden for now - see SHOW_CONTACT_EMAIL in config/contact.ts.
    expect(footer.querySelector('[data-testid="footer-email"]')).toBeNull();

    expect(footer.querySelector('[data-testid="footer-phone"]')?.getAttribute('href')).toBe(
      'tel:+41783231039',
    );
    expect(footer.querySelector('[data-testid="footer-copyright"]')?.textContent).toContain(
      String(new Date().getFullYear()),
    );
  });

  it('should show the logo linking home', () => {
    const logo = render().querySelector('[data-testid="footer-logo"]');

    expect(logo?.getAttribute('href')).toBe('/');
    expect(logo?.querySelector('img')?.getAttribute('src')).toBe(
      'assets/images/header/site-logo.svg',
    );
    expect(logo?.querySelector('img')?.getAttribute('alt')).toBe('CBL Tech');
  });

  it('should scroll back to the top', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    render().querySelector<HTMLButtonElement>('[data-testid="footer-back-to-top"]')?.click();

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
