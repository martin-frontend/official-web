import { fetchGet } from '@/core/services/api/apiBase';
import { UserInfo } from '@/modules/user/domain/user.model';

export default async function getApiUserInfo(): Promise<UserInfo> {
  const userInfo: UserInfo = await fetchGet<UserInfo>('/official/v1/player');
  return userInfo;
}
