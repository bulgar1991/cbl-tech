import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats an ISO date ('2026-09-15') for the given locale.
 *
 *   {{ post.date | localDate }}  ->  "15 Sept 2026"
 */
@Pipe({ name: 'localDate' })
export class LocalDatePipe implements PipeTransform {
  transform(isoDate: string, locale = 'en-GB'): string {
    // Noon avoids the date shifting by a day in far-off time zones.
    const date = new Date(isoDate + 'T12:00:00');
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
