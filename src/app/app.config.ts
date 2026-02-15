import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideSpinnerConfig } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideTranslation } from './core/config/i18n/translate-loader.config';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { loadingSpinnerInterceptor } from './core/interceptors/loading-data.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
    ),
    provideSpinnerConfig({ type: 'ball-scale-multiple' }),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-left',
      timeOut: 2000,
      preventDuplicates: true,
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        cacheInterceptor,
        loadingSpinnerInterceptor,
        // retryInterceptor,
      ])
    ),
  ],
};
