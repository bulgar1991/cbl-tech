import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { findService } from '@/config/services';
import { Service } from '@models/service.model';

// Loads the service for /services/:id and sets its SEO tags. serviceExistsGuard has already
// checked that the id exists.
export const serviceSeoResolver: ResolveFn<Service> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Service => {
  const service = findService(route.paramMap.get('id'))!;
  inject(SeoService).apply(
    {
      title: 'seo.serviceDetail.title',
      description: service.key + '.description',
      params: { service: service.key + '.title' },
    },
    state.url,
  );
  return service;
};
