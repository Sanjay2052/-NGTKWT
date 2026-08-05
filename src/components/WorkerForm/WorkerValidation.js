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
  const cleanPhoneDigits = formData.phone.replace(/\D/g, '');
  if (cleanPhoneDigits.length < 5 || cleanPhoneDigits.length > 15) {
    return { field: 'phone', message: 'Please enter a valid phone / mobile number (minimum 5 digits).' };
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
  const trimmed = phoneStr.trim();
  if (trimmed.startsWith('+')) {
    return `'${trimmed}`;
  }
  const clean = trimmed.replace(/[\s\-\(\)]/g, '');
  if (/^00/.test(clean)) {
    return `'+${clean.slice(2)}`;
  }
  if (clean.length === 8) {
    return `'+965 ${clean}`;
  }
  return `'${trimmed}`;
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



