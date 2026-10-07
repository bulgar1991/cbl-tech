import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render one header, main and footer landmark', async () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('header[data-testid="site-header"]').length).toBe(1);
    expect(compiled.querySelector('main#main-content')).not.toBeNull();
    expect(compiled.querySelector('footer[data-testid="site-footer"]')).not.toBeNull();
  });

  it('should link the skip link to the main content', async () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    await fixture.whenStable();
    const skipLink = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="skip-to-content"]',
    );

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
  });
});
