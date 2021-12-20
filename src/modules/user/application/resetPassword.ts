import { Router } from 'vue-router';
import useDialogStore from '@/core/shared/dialogStore';
import resetApiPassword from '../Infrastructure/api/resetPasswordApi';

export default async function resetPassword(
  password: string,
  token: string,
  router: Router
): Promise<void> {
  const dialogStore = useDialogStore();

  try {
    await resetApiPassword(password, token);

    dialogStore.popUp({
      title: 'Succeed',
      okButtonText: 'OK',
      isCancelButtonShown: false,
      message: 'Reset password successfully',
      onOk() {
        router.push('/login');
      },
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
