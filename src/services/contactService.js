import { submitFormToGoogleSheet } from './api';

export async function sendContactInquiry(contactData) {
  return await submitFormToGoogleSheet(contactData, 'Contact Inquiry');
}

export async function sendCompanyInquiry(companyData) {
  return await submitFormToGoogleSheet(companyData, 'Company Request');
}
