import { checkUserStatus } from '@/modules/user/application/user';
import setAuthToken from '@/core/services/localStorage/authToken';
import { initToken } from '@/core/auth/authApi';

export default async function updateAuthToken() {
  const token = await initToken();
  if (token) {
    setAuthToken(token);
    checkUserStatus();
  }
}
