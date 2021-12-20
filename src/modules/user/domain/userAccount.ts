export interface RegisterInfo {
  address: string;
  birthday: number;
  city: string;
  country: string;
  // currency: string;
  email: string;
  firstname: string;
  gender: 'M' | 'F';
  lastname: string;
  notificationEnabled: boolean;
  password: string;
  privacyPolicyAccepted: boolean;
  promoCode: string;
  phoneNumber: string;
  visitorId: string;
  zipCode: string;
}

export type RegisterForm = Omit<
  RegisterInfo,
  'visitorId' | 'birthday' | 'phoneNumber' | 'visitorId'
> & {
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  phoneNumberPrefix: string;
  phoneNumberMain: string;
};
