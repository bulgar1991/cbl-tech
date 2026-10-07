import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type LanguageCode = 'fr' | 'de' | 'en';

export interface Language {
  code: LanguageCode;
  label: string;
  name: string;
  flag: string;
}

// Order matters: this is the order shown in the language switcher.
export const LANGUAGES: Language[] = [
  { code: 'fr', label: 'FR', name: 'Français', flag: 'assets/images/flags/fr.svg' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: 'assets/images/flags/de.svg' },
  { code: 'en', label: 'EN', name: 'English', flag: 'assets/images/flags/gb.svg' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'fr';

const STORAGE_KEY = 'cbl-lang';

/** Switches the site language (translations in src/assets/i18n/*.json) and remembers the choice. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  readonly languages = LANGUAGES;
  readonly current = this.translate.currentLang;

  // Called once on app start, before the first render.
  init(): Observable<unknown> {
    return this.use(this.savedLanguage() ?? DEFAULT_LANGUAGE);
  }

  use(code: LanguageCode): Observable<unknown> {
    this.document.documentElement.lang = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage can be blocked (private mode); the language just won't be remembered.
    }
    return this.translate.use(code);
  }

  private savedLanguage(): LanguageCode | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.some((lang) => lang.code === saved) ? (saved as LanguageCode) : null;
    } catch {
      return null;
    }
  }
}
