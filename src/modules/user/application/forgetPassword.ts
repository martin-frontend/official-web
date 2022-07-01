import useDialogStore from '@/core/shared/dialogStore';
import applyApiForgetPassword from '../Infrastructure/api/forgetPasswordApi';

export async function forgetPassword(dto: {
  email: string;
  emailLinkUrlPath?: string;
}): Promise<void> {
  const dialogStore = useDialogStore();
  try {
    await applyApiForgetPassword(dto);

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
