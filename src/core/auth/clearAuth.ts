import clearCookies from '@/core/services/cookies/clearCookies';
import { removeAuthToken } from '@/core/services/localStorage/authToken';
import useAuthStore from '@/core/auth/authStore';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';

export default function clearAuth(): void {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  userStore.setUserInfo(null);
  authStore.setAuthenticated(false);
  removeAuthToken();
  clearCookies();
}
