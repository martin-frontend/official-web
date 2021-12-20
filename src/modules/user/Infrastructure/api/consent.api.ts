import { fetchPut } from '@/core/services/api/apiBase';

export default async function updateConsents(
  notificationEnabled: boolean
): Promise<string> {
  const result = await fetchPut<string>('/official/v1/player/consent', {
    notificationEnabled,
  });
  return result;
}
