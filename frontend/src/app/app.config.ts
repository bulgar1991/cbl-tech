import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { DEFAULT_LANGUAGE, LanguageService } from './services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Route params and resolved data are set as component inputs (e.g. ServiceDetail's `service`).
      withComponentInputBinding(),
    ),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
      fallbackLang: DEFAULT_LANGUAGE,
    }),
    // Load the saved (or default French) translations before the app renders, so no raw keys flash.
    provideAppInitializer(() => inject(LanguageService).init()),
  ],
};
