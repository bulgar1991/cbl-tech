// Contact details used across the site (contact section, call button, footer).
export const CONTACT_PHONE = '+41 78 323 10 39';

export const CONTACT_EMAIL = 'codebrolab@hotmail.com';
// The email is hidden on the site for now (footer and contact section) - set to true to show it again.
export const SHOW_CONTACT_EMAIL = false;
export const CONTACT_EMAIL_HREF = 'mailto:' + CONTACT_EMAIL;

// For `href="tel:..."` - digits and a leading +, no spaces.
export const CONTACT_PHONE_HREF = 'tel:' + CONTACT_PHONE.replace(/[^\d+]/g, '');
