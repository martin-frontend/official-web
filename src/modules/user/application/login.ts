import userLogin from '@/core/auth/userLogin';
import useForgetPasswordStore from '../Infrastructure/store/forgetPasswordStore';
import useLoginStore from '../Infrastructure/store/loginStore';
import useSignUpStore from '../Infrastructure/store/signUpStore';
import { checkUserStatus } from './user';

export function closeLoginDialog() {
  const loginStore = useLoginStore();
  loginStore.setIsLoginDialogShown(false);
}

export function openSignUpDialog() {
  const loginStore = useLoginStore();
  const signUpStore = useSignUpStore();

  loginStore.$reset();
  signUpStore.setIsSignUpDialogShown(true);
}

export function openForgetPasswordDialog() {
  const loginStore = useLoginStore();
  const forgetPasswordStore = useForgetPasswordStore();

  loginStore.$reset();
  forgetPasswordStore.setIsForgetPasswordDialogShown(true);
}

export async function login() {
  const loginStore = useLoginStore();

  const errorMessage: string = await userLogin(
    loginStore.email,
    loginStore.password
  );

  if (!errorMessage) {
    loginStore.$reset();

    checkUserStatus();
  }
}
