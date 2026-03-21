export function maskNumber(num) {
  if (!num) return '';
  const s = String(num);
  if (s.length <= 4) return s;
  return `${s.slice(0, 2)}${'X'.repeat(Math.max(0, s.length - 4))}${s.slice(-2)}`;
}

export function buildUserQrPayload(user) {
  if (!user) return null;

  const contactNumber = user.contactNumber || user.phone || '';
  const name = user.name || '';

  if (!name || !contactNumber) {
    return null;
  }

  const payload = {
    id: user.id || null,
    name,
    contactNumber,
    email: user.email || null,
    source: 'digital-contact-mobile',
  };

  return JSON.stringify(payload);
}
