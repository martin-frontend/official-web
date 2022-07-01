import { fetchPost } from '@/core/services/api/apiBase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function sendVerificationEmail(emailLinkUrlPath: string) {
  const result = await fetchPost(
    '/official/v1/player/email-verification/send',
    {
      emailLinkUrlPath,
    }
  );
  return result;
}

export async function verifyEmail(token: string) {
  const result = await fetchPost(
    `/official/v1/player/email-verification/verify?token=${token}`
  );
  return result;
}
