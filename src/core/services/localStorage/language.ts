export function setLocalLanguage(value: string): void {
  localStorage.setItem('LANGUAGE_FOR_API', value);
}

export function getLocalLanguage(): string | null {
  return localStorage.getItem('LANGUAGE_FOR_API');
}

export function removeLocalLanguage(): void {
  localStorage.removeItem('LANGUAGE_FOR_API');
}
