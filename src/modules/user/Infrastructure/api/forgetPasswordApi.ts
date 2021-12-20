import { fetchPost } from '@/core/services/api/apiBase';

export default async function applyApiForgetPassword(
  email: string
): Promise<string> {
  const result = await fetchPost<string>(
    '/official/v1/player/password/forgot',
    {
      email,
    }
  );
  return result;
}
