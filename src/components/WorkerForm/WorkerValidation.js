export function validateWorkerForm(formData, cvFile) {
  if (!formData.fullName || !formData.email || !formData.phone || !formData.position) {
    return 'Please complete all required fields marked with *';
  }

  if (!cvFile) {
    return 'Please upload your CV document (PDF/DOC/DOCX).';
  }

  return null;
}
