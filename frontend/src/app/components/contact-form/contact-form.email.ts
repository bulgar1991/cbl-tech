import { SITE_NAME } from '@/config/site';

/** How a contact message looks in the email you receive (sent by Web3FormsService). */
export const CONTACT_EMAIL_LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  company: 'Company',
  jobTitle: 'Job title',
  email: 'Email',
  phone: 'Mobile phone',
  project: 'Project details',
} as const;

export function contactEmailSubject(name: string, company: string): string {
  return `New message from ${SITE_NAME} – ${name}${company ? ` (${company})` : ''}`;
}
