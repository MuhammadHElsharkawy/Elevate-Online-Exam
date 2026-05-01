import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AUTH_API_URL } from 'auth-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(NgxSpinnerModule),
    {
      provide: AUTH_API_URL,
      useValue: 'https://exam-app.elevate-bootcamp.cloud'
    }
  ]
};
