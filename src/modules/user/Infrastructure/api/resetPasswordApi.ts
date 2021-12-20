import { fetchPut } from '@/core/services/api/apiBase';

export default async function resetApiPassword(
  password: string,
  token: string
) {
  const result = await fetchPut<string>('/official/v1/player/password/reset', {
    password,
    token,
  });
  return result;
}
