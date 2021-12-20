import { RegisterInfo } from '@/modules/user/domain/userAccount';
import registerAccount from '@/modules/user/Infrastructure/api/registerApi';
import setAuthToken from '@/core/services/localStorage/authToken';
import useDialogStore from '@/core/shared/dialogStore';
import getVisitorId from '@/core/services/visitorId';

export default async function register(
  registerInfo: Omit<RegisterInfo, 'visitorId'>
): Promise<boolean> {
  const visitorId = await getVisitorId();
  try {
    const token = await registerAccount({ ...registerInfo, visitorId });
    setAuthToken(token);

    return true;
  } catch (error) {
    const dialogStore = useDialogStore();
    dialogStore.popUp({
      title: 'Error',
      okButtonText: 'OK',
      isCancelButtonShown: false,
      message: 'Please make sure all your field is filled.',
    });
    return false;
  }
}
