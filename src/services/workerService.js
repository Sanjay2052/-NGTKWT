import { submitFormToGoogleSheet } from './api';

export async function submitWorkerApplication(workerData) {
  return await submitFormToGoogleSheet(workerData, 'Worker Application');
}
