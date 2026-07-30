export function formatCurrency(amount, currency = 'KWD') {
  return new Intl.NumberFormat('en-KW', { style: 'currency', currency }).format(amount);
}

export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
