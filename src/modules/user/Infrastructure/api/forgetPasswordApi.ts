import { fetchPost } from '@/core/services/api/apiBase';

export default async function applyApiForgetPassword(dto: {
  email: string;
  emailLinkUrlPath?: string;
}): Promise<string> {
  const result = await fetchPost<string>(
    '/official/v1/player/password/forgot',
    {
      ...dto,
    }
  );
  return result;
}
