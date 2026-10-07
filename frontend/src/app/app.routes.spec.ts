import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { provideTestTranslations } from '../testing/translations';
import { routes } from './app.routes';

describe('routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    // jsdom has no IntersectionObserver (used by appReveal).
    globalThis.IntersectionObserver ??= class {
      observe = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof IntersectionObserver;

    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding()), provideTestTranslations()],
    });
    harness = await RouterTestingHarness.create();
  });

  const text = () => (harness.routeNativeElement as HTMLElement).textContent ?? '';

  it('should start the home page with the banner', async () => {
    await harness.navigateByUrl('/');
    const home = (harness.routeNativeElement as HTMLElement).querySelector('app-home');
    const first = home?.firstElementChild;

    expect(first?.tagName).toBe('APP-HERO-BANNER');
    expect(first?.querySelector('[data-testid="hero-title"]')?.textContent?.trim()).toBe(
      'CBL Tech',
    );
    expect(first?.querySelector('[data-testid="hero-description"]')?.textContent).toContain(
      'digital products',
    );
    expect(first?.querySelector('[data-testid="hero-cta"]')?.getAttribute('href')).toBe('/contact');
  });

  it('should show the About us slider right after the banner', async () => {
    await harness.navigateByUrl('/');
    const home = (harness.routeNativeElement as HTMLElement).querySelector('app-home');
    const about = home?.children[1];

    expect(about?.tagName).toBe('APP-ABOUT-SECTION');
    // Rendered twice for loop mode, 5 different cards and one dot per card.
    const titles = [...(about?.querySelectorAll('[data-testid="about-card"] h3') ?? [])].map((h) =>
      h.textContent?.trim(),
    );
    expect(new Set(titles).size).toBe(5);
    expect(about?.querySelectorAll('.about-section__dot').length).toBe(5);
  });

  it('should show Our Services after About us, with every service and the image', async () => {
    await harness.navigateByUrl('/');
    const home = (harness.routeNativeElement as HTMLElement).querySelector('app-home');
    const section = home?.children[2];

    expect(section?.tagName).toBe('APP-SERVICES-SECTION');
    expect(section?.querySelector('h2')?.textContent?.trim()).toBe('Our Services');
    expect(section?.querySelectorAll('[data-testid^="services-section-item-"]').length).toBe(4);
    expect(
      section?.querySelector('[data-testid="services-section-image"]')?.getAttribute('src'),
    ).toBe('assets/images/services/services.png');
  });

  it('should end the home page with the contact section: form, image and call button', async () => {
    await harness.navigateByUrl('/');
    const home = (harness.routeNativeElement as HTMLElement).querySelector('app-home');
    const section = home?.lastElementChild;

    expect(section?.tagName).toBe('APP-CONTACT-SECTION');
    expect(section?.querySelector('h2')?.textContent?.trim()).toBe('Contact');
    expect(section?.querySelector('[data-testid="contact-form"]')).not.toBeNull();
    expect(section?.querySelector('[data-testid="contact-section-image"]')).not.toBeNull();
    expect(section?.querySelector('[data-testid="contact-call"]')?.getAttribute('href')).toMatch(
      /^tel:\+?\d+$/,
    );
  });

  it('should not repeat the contact title on /contact', async () => {
    await harness.navigateByUrl('/contact');
    const section = (harness.routeNativeElement as HTMLElement).querySelector(
      'app-contact-section',
    );

    expect(section?.querySelector('h2')).toBeNull();
    expect(section?.querySelector('[data-testid="contact-form"]')).not.toBeNull();
  });

  it('should translate the page and its title when the language changes', async () => {
    await harness.navigateByUrl('/services/web-development');
    const page = harness.routeNativeElement as HTMLElement;
    const title = TestBed.inject(Title);
    expect(page.querySelector('h1')?.textContent?.trim()).toBe('Web development');

    await firstValueFrom(TestBed.inject(LanguageService).use('fr'));
    harness.detectChanges();
    expect(page.querySelector('h1')?.textContent?.trim()).toBe('Développement web');
    expect(page.querySelector('[data-testid="nav-link-about"]')?.textContent?.trim()).toBe(
      'À propos',
    );
    expect(title.getTitle()).toBe('Développement web — CBL Tech');
    expect(page.querySelectorAll('li.flex.items-start').length).toBe(4);

    await firstValueFrom(TestBed.inject(LanguageService).use('de'));
    harness.detectChanges();
    expect(page.querySelector('h1')?.textContent?.trim()).toBe('Webentwicklung');
    expect(title.getTitle()).toBe('Webentwicklung — CBL Tech');
  });

  it.each([
    ['/about', 'About us — CBL Tech'],
    ['/services', 'Services — CBL Tech'],
    ['/contact', 'Contact — CBL Tech'],
  ])('should open %s with its page title', async (url, title) => {
    await harness.navigateByUrl(url);
    expect(TestBed.inject(Title).getTitle()).toBe(title);
  });

  it('should show a service detail page from the resolver', async () => {
    await harness.navigateByUrl('/services/web-development');
    expect(text()).toContain('Web development');
    expect(TestBed.inject(Title).getTitle()).toBe('Web development — CBL Tech');
  });

  it('should show the 404 page for an unknown service', async () => {
    await harness.navigateByUrl('/services/does-not-exist');
    expect(text()).toContain('Page not found');
  });

  it('should show the 404 page for an unknown url', async () => {
    await harness.navigateByUrl('/nope');
    expect(text()).toContain('Page not found');
  });
});
