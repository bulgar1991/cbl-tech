import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { findService } from '@/config/services';
import { SITE_NAME } from '@/config/site';
import { Service } from '@models/service.model';

// Loads the service for /services/:id and sets its SEO tags. serviceExistsGuard has already
// checked that the id exists.
export const serviceSeoResolver: ResolveFn<Service> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Service => {
  const service = findService(route.paramMap.get('id'))!;
  inject(SeoService).apply(
    { title: `${service.title} — ${SITE_NAME}`, description: service.description },
    state.url,
  );
  return service;
};
