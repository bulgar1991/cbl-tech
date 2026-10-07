import { CanMatchFn } from '@angular/router';
import { findService } from '@/config/services';

// Matches /services/:id only for a known service, so unknown ids fall through to the 404 page.
export const serviceExistsGuard: CanMatchFn = (_route, segments) =>
  !!findService(segments[1]?.path);
