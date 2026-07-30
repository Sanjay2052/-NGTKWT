import { GOOGLE_CONFIG } from '../config/googleConfig';

export async function submitFormToGoogleSheet(formData, formType = 'Worker Application') {
  if (!GOOGLE_CONFIG.scriptUrl) {
    throw new Error('Google Apps Script URL is missing from configuration.');
  }

  const payload = {
    ...formData,
    formType,
    submittedAt: new Date().toISOString(),
  };

  const response = await fetch(GOOGLE_CONFIG.scriptUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status: ${response.status}`);
  }

  return await response.json();
}
