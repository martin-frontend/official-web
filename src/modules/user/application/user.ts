import { closeSubscribe, startSubscribe } from '@/core/auth/authApi';
import useAuthStore from '@/core/auth/authStore';
import checkAuthToken from '@/core/auth/checkAuthToken';
import clearAuth from '@/core/auth/clearAuth';
import useVisitorIdStore from '@/core/auth/visitorId';
import getVisitorId from '@/core/services/visitorId';
import { updateAmount } from '@/modules/userBalance/application/balance';
import { UserInfo } from '../domain/user.model';
import getApiUserInfo from '../Infrastructure/api/userInfoApi';
import useLanguageStore from '../Infrastructure/store/languageStore';
import useUserStore from '../Infrastructure/store/userStore';

export default async function getUserInfo(): Promise<UserInfo | null> {
  if (!checkAuthToken()) {
    return null;
  }
  const userInfo: UserInfo = await getApiUserInfo();
  return userInfo;
}

let isCheckingUserInfo = false;

async function waitUntilCheckingPromiseComplete(): Promise<void> {
  while (isCheckingUserInfo) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export async function checkUserStatus(): Promise<boolean> {
  const visitorIdStore = useVisitorIdStore();
  const visitorId = await getVisitorId();
  visitorIdStore.setVisitorId(visitorId);
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (authStore.isAuthenticated) {
    return true;
  }
  if (!checkAuthToken()) {
    clearAuth();
    return false;
  }
  if (isCheckingUserInfo) {
    await waitUntilCheckingPromiseComplete();
    return !!authStore.isAuthenticated;
  }

  isCheckingUserInfo = true;

  try {
    updateAmount();
    const userInfo: UserInfo = await getApiUserInfo();
    userStore.setUserInfo(userInfo);
    authStore.setAuthenticated(true);
    isCheckingUserInfo = false;

    const { language } = userInfo;
    if (language) {
      const languageStore = useLanguageStore();
      languageStore.setLanguage(language);
    }

    startSubscribe();

    return true;
  } catch (error) {
    isCheckingUserInfo = false;
    closeSubscribe();
    // clearAuth();
    return false;
  }
}
