import { reactive } from 'vue';
import { RegisterForm, RegisterInfo } from '@/modules/user/domain/userAccount';
import registerAccount from '@/modules/user/Infrastructure/api/registerApi';
import setAuthToken from '@/core/services/localStorage/authToken';
import useDialogStore from '@/core/shared/dialogStore';
import getVisitorId from '@/core/services/visitorId';
import { passwordValidator } from '@/modules/changePassword/application/changePassword';

function showErrorMessage(error?: any) {
  const dialogStore = useDialogStore();
  dialogStore.popUp({
    title: 'Error',
    okButtonText: 'OK',
    isCancelButtonShown: false,
    message: error || 'Please make sure all your field is filled.',
  });
}

export default async function register(
  registerInfo: Omit<RegisterInfo, 'visitorId'>
): Promise<boolean> {
  const visitorId = await getVisitorId();
  try {
    const token = await registerAccount({ ...registerInfo, visitorId });
    setAuthToken(token);

    return true;
  } catch (error) {
    showErrorMessage(error);
    return false;
  }
}

export const emailValidator = (email: string) => {
  const regex =
    /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
  return regex.test(email);
};

export const phoneNumberValidator = (phoneNumber: string) => {
  const regex = /^[0-9]{1,}$/;
  return regex.test(phoneNumber);
};

export function useRegisterForm() {
  const form = reactive<RegisterForm>({
    email: '',
    phoneNumberPrefix: '+886',
    phoneNumberMain: '',
    password: '',
    privacyPolicyAccepted: false,
    firstname: '',
    lastname: '',
    yearOfBirth: new Date().getFullYear() - 18,
    monthOfBirth: 1,
    dayOfBirth: 1,
    gender: 'M',
    promoCode: '',
    country: 'The U.K',
    city: '',
    address: '',
    zipCode: '',
    notificationEnabled: false,
  });

  const isFormError = reactive<{ [key: string]: boolean }>({});

  Object.keys(form).forEach((key) => {
    isFormError[key] = false;
  });

  const formValidator = (step: number) => {
    if (step === 1) {
      const {
        email,
        phoneNumberPrefix,
        phoneNumberMain,
        password,
        privacyPolicyAccepted,
      } = form;

      isFormError.email = !emailValidator(email);
      isFormError.phoneNumberPrefix = phoneNumberPrefix === '';
      isFormError.phoneNumberMain = !phoneNumberValidator(phoneNumberMain);
      isFormError.password = !passwordValidator(password);

      return (
        !isFormError.email &&
        !isFormError.password &&
        !isFormError.phoneNumberPrefix &&
        !isFormError.phoneNumberMain &&
        privacyPolicyAccepted
      );
    }

    if (step === 2) {
      const { firstname, lastname } = form;

      isFormError.firstname = firstname === '';
      isFormError.lastname = lastname === '';

      return !isFormError.firstname && !isFormError.lastname;
    }

    if (step === 3) {
      const { city, address, zipCode } = form;

      isFormError.city = city === '';
      isFormError.address = address === '';
      isFormError.zipCode = zipCode === '';

      return !isFormError.city && !isFormError.address && !isFormError.zipCode;
    }

    return false;
  };

  return { form, isFormError, formValidator };
}
