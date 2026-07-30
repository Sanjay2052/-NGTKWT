export function validateWorkerForm(formData, cvFile) {
  if (!formData.fullName || !formData.fullName.trim()) {
    return { field: 'fullName', message: 'Please enter your full name.' };
  }

  if (!formData.email || !formData.email.trim()) {
    return { field: 'email', message: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    return { field: 'email', message: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  if (!formData.phone || !formData.phone.trim()) {
    return { field: 'phone', message: 'Please enter your phone / mobile number.' };
  }
  const cleanWorkerPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
  const kuwaitWorkerNum = cleanWorkerPhone.replace(/^(00965|965)/, '');
  if (!/^[569]\d{7}$/.test(kuwaitWorkerNum) || /^(\d)\1{7}$/.test(kuwaitWorkerNum)) {
    return { field: 'phone', message: 'Please enter a valid Kuwait mobile number (8 digits starting with 5, 6, or 9, e.g. 98765432 or +965 9876 5432).' };
  }

  if (!formData.nationality || !formData.nationality.trim()) {
    return { field: 'nationality', message: 'Please enter your nationality.' };
  }

  if (!formData.category || !formData.category.trim()) {
    return { field: 'category', message: 'Please select a job category.' };
  }

  if (!formData.position || !formData.position.trim()) {
    return { field: 'position', message: 'Please select the position you are applying for.' };
  }

  if (!formData.yearsExperience || !formData.yearsExperience.trim()) {
    return { field: 'yearsExperience', message: 'Please select your years of experience.' };
  }

  if (!formData.certifications || !formData.certifications.trim()) {
    return { field: 'certifications', message: 'Please list your certifications held.' };
  }

  if (!cvFile) {
    return { field: 'cvFile', message: 'Please upload your CV document (PDF/DOC/DOCX).' };
  }

  return null;
}

export function formatKuwaitPhone(phoneStr) {
  if (!phoneStr) return '';
  const clean = phoneStr.trim().replace(/[\s\-\(\)\+]/g, '');
  const local = clean.replace(/^(00965|965)/, '');
  return `'+965 ${local}`;
}

export function getKuwaitFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    timeZone: 'Asia/Kuwait',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}



