export default function setAuthToken(value: string): void {
  localStorage.setItem('CSRF_TOKEN_FOR_API', value);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('CSRF_TOKEN_FOR_API');
}

export function removeAuthToken(): void {
  localStorage.removeItem('CSRF_TOKEN_FOR_API');
}
