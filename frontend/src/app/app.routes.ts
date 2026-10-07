import { Routes } from '@angular/router';
import { serviceExistsGuard } from './guards/service-exists.guard';
import { seoResolver } from './resolvers/seo.resolver';
import { serviceSeoResolver } from './resolvers/service-seo.resolver';

// `data.seo` holds the page title, description and social-media tags; seoResolver applies them.
const mainLayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'CBL Tech',
        description: 'We build fast, beautiful and modern digital products — with a touch of neon.',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    resolve: { seo: seoResolver },
    data: {
      seo: {
        title: 'About us — CBL Tech',
        description: 'A small team building fast, modern websites, web apps and mobile apps.',
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
        title: 'Services — CBL Tech',
        description: 'Web development, UI/UX design, mobile apps, support and maintenance.',
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
        title: 'Contact — CBL Tech',
        description: "Tell us about your project and we'll answer within a day.",
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
        title: 'Page not found — CBL Tech',
        description: "The page you're looking for doesn't exist or has moved.",
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
