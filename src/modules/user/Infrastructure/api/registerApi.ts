import { RegisterInfo } from '@/modules/user/domain/userAccount';
import { fetchPost } from '../../../../core/services/api/apiBase';

export default async function registerAccount(
  registerInfo: RegisterInfo
): Promise<string> {
  const result = await fetchPost<string>(
    '/official/v1/player/register',
    registerInfo
  );
  return result;
}
