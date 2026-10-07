import { SITE_NAME } from '@/config/site';

/**
 * How a contact message looks in the email you receive (sent by Web3FormsService).
 * The labels are in French (the default site language) whatever language the visitor used.
 */
export const CONTACT_EMAIL_LABELS = {
  firstName: 'Prénom',
  lastName: 'Nom',
  company: "Nom de l'entreprise",
  jobTitle: 'Poste occupé',
  email: 'E-mail',
  phone: 'Téléphone portable',
  project: 'Informations sur le projet',
} as const;

export function contactEmailSubject(name: string, company: string): string {
  return `Nouveau message de ${SITE_NAME} – ${name}${company ? ` (${company})` : ''}`;
}
