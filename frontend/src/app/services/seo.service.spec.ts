import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { provideTestTranslations } from '../../testing/translations';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let meta: Meta;
  const content = (selector: string) => meta.getTag(selector)?.getAttribute('content');

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideTestTranslations('en')] });
    seo = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
  });

  it('should set the title, description, canonical link and social tags', () => {
    seo.apply({ title: 'seo.home.title', description: 'seo.home.description' }, '/?ref=x#top');

    expect(TestBed.inject(Title).getTitle()).toBe('CBL Tech — Web development, design and apps');
    expect(content("name='description'")).toContain('Fast, modern websites');
    expect(content("property='og:url'")).toBe('https://cbl-tech.com/');
    expect(content("property='og:title'")).toBe('CBL Tech — Web development, design and apps');
    expect(content("name='twitter:card'")).toBe('summary_large_image');
    expect(
      TestBed.inject(DOCUMENT).querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://cbl-tech.com/');
  });

  it('should use the default share image with its size and alt text', () => {
    seo.apply({ title: 'seo.about.title', description: 'seo.about.description' }, '/about');

    expect(content("property='og:image'")).toBe(
      'https://cbl-tech.com/assets/images/seo/og-image.jpg',
    );
    expect(content("property='og:image:width'")).toBe('1200');
    expect(content("property='og:image:height'")).toBe('630');
    expect(content("property='og:image:alt'")).toBe('CBL Tech — modern websites, apps and design');
    expect(content("name='twitter:image'")).toBe(
      'https://cbl-tech.com/assets/images/seo/og-image.jpg',
    );
  });

  it('should list the other languages and follow a language change', async () => {
    seo.apply({ title: 'seo.about.title', description: 'seo.about.description' }, '/about');
    const alternates = () =>
      meta.getTags("property='og:locale:alternate'").map((tag) => tag.getAttribute('content'));

    expect(content("property='og:locale'")).toBe('en_GB');
    expect(alternates()).toEqual(['fr_CH', 'de_CH']);

    await firstValueFrom(TestBed.inject(TranslateService).use('fr'));
    expect(content("property='og:locale'")).toBe('fr_CH');
    expect(alternates()).toEqual(['de_CH', 'en_GB']);
    expect(content("property='og:image:alt'")).toBe(
      'CBL Tech — sites web, applications et design modernes',
    );
  });

  it('should let a route override robots', () => {
    seo.apply(
      {
        title: 'seo.notFound.title',
        description: 'seo.notFound.description',
        metaTags: [{ name: 'robots', content: 'noindex, follow' }],
      },
      '/nope',
    );

    expect(content("name='robots'")).toBe('noindex, follow');
  });
});
