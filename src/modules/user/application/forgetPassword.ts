import useDialogStore from '@/core/shared/dialogStore';
import applyApiForgetPassword from '../Infrastructure/api/forgetPasswordApi';
import useForgetPasswordStore from '../Infrastructure/store/forgetPasswordStore';

export async function forgetPassword(email: string): Promise<void> {
  const dialogStore = useDialogStore();
  try {
    await applyApiForgetPassword(email);

    const forgetPasswordStore = useForgetPasswordStore();

    forgetPasswordStore.$reset();

    dialogStore.popUp({
      title: 'Succeed',
      okButtonText: 'OK',
      isCancelButtonShown: false,
      message: 'Apply successfully, Please check your email.',
    });
  } catch (error) {
    dialogStore.popUp({
      title: 'Error',
      okButtonText: 'OK',
      isCancelButtonShown: false,
      message: error as string,
    });
  }
}
