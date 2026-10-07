import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { provideTestTranslations } from '../../testing/translations';
import { DEFAULT_LANGUAGE, LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideTestTranslations()] });
  });

  it('should start in French when no language was saved', async () => {
    await firstValueFrom(TestBed.inject(LanguageService).init());

    expect(DEFAULT_LANGUAGE).toBe('fr');
    expect(TestBed.inject(TranslateService).getCurrentLang()).toBe('fr');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('fr');
  });

  it('should remember the chosen language for the next visit', async () => {
    await firstValueFrom(TestBed.inject(LanguageService).use('de'));
    expect(localStorage.getItem('cbl-lang')).toBe('de');

    await firstValueFrom(TestBed.inject(LanguageService).init());
    expect(TestBed.inject(TranslateService).getCurrentLang()).toBe('de');
  });

  it('should ignore an unknown saved language', async () => {
    localStorage.setItem('cbl-lang', 'xx');
    await firstValueFrom(TestBed.inject(LanguageService).init());

    expect(TestBed.inject(TranslateService).getCurrentLang()).toBe('fr');
  });
});
