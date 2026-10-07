import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { SeoData } from '@models/seo.model';

// Applies the route's `data.seo` (title, description, canonical link, social-media tags).
export const seoResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): void => {
  const seo = route.data['seo'] as SeoData | undefined;
  // state.url is the page being opened - router.url would still be the previous page here.
  if (seo) inject(SeoService).apply(seo, state.url);
};
