import loginApi, {
  logoutApi,
  closeSubscribe,
  startSubscribe,
} from '@/core/auth/authApi';
import setAuthToken from '@/core/services/localStorage/authToken';
import useDialogStore from '@/core/shared/dialogStore';
import clearAuth from './clearAuth';
import { checkUserStatus } from '@/modules/user/application/user';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import useAuthStore from './authStore';
import useVisitorIdStore from './visitorId';

export default async function userLogin(
  email: string,
  password: string
): Promise<string> {
  const visitorIdStore = useVisitorIdStore();

  try {
    const token = await loginApi(email, password, visitorIdStore.visitorId);
    setAuthToken(token);

    checkUserStatus();
    startSubscribe();

    return '';
  } catch (error) {
    const dialogStore = useDialogStore();
    dialogStore.popUp({
      title: 'Error',
      okButtonText: 'OK',
      isCancelButtonShown: false,
      message: error as string,
    });

    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unknown error occurred';
  }
}

export function userLogout(): void {
  const balanceStore = useBalanceStore();
  balanceStore.$reset();

  logoutApi();
  clearAuth();

  const authStore = useAuthStore();
  authStore.setAuthenticated(false);

  checkUserStatus();
  closeSubscribe();
}
