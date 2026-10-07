import { Routes } from '@angular/router';
import { serviceExistsGuard } from './guards/service-exists.guard';
import { seoResolver } from './resolvers/seo.resolver';
import { serviceSeoResolver } from './resolvers/service-seo.resolver';

// `data.seo` holds translation keys (under "seo" in assets/i18n/*.json); seoResolver turns them
// into the page title, description, canonical link and social-media tags.
const mainLayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.home.title',
        description: 'seo.home.description',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.about.title',
        description: 'seo.about.description',
      },
    },
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then((m) => m.ServicesComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.services.title',
        description: 'seo.services.description',
      },
    },
  },
  {
    path: 'services/:id',
    canMatch: [serviceExistsGuard],
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    // Bound to the component's `service` input (withComponentInputBinding in app.config.ts).
    resolve: { service: serviceSeoResolver },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.contact.title',
        description: 'seo.contact.description',
      },
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'seo.notFound.title',
        description: 'seo.notFound.description',
        metaTags: [{ name: 'robots', content: 'noindex, follow' }],
      },
    },
  },
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: mainLayoutRoutes,
  },
];
