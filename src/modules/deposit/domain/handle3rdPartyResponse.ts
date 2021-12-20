export function createUrlWithParams(
  url: string,
  params: Record<string, string>
): string {
  const urlWithParams = new URL(url);
  Object.keys(params).forEach((key) => {
    urlWithParams.searchParams.set(key, params[key]);
  });
  return urlWithParams.toString();
}
