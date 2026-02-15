export function isEmail(value?: string): boolean {
  if (!value) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function minLength(value: string | undefined, n: number) {
  if (!value) return false;
  return value.length >= n;
}

export default { isEmail, isRequired, minLength };
