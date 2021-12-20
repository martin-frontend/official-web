import {
  basePath,
  createOptions,
  createUrlWithParams,
  fetchGet,
  fetchWrapper,
} from '@/core/services/api/apiBase';

export async function getPlayerKyc() {
  return fetchGet('/official/v1/player/kyc');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadPlayerKycL1(e: any) {
  const formData = new FormData();

  formData.set('identityFront', e.identityFront);
  formData.set('selfie', e.selfie);

  if (e.identityBack) {
    formData.set('identityBack', e.identityBack);
  }

  const init = {
    ...createOptions(),
    method: 'POST',
    body: formData,
  };
  // eslint-disable-next-line
  // @ts-ignore
  delete init.headers['Content-Type'];

  return fetchWrapper(
    createUrlWithParams(`${basePath}/official/v1/player/kyc/apply/level-1`),
    init
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadPlayerKycL2(e: any) {
  const formData = new FormData();

  formData.set('address ', e.address);

  const init = {
    ...createOptions(),
    method: 'POST',
    body: formData,
  };
  // eslint-disable-next-line
  // @ts-ignore
  delete init.headers['Content-Type'];

  return fetchWrapper(
    createUrlWithParams(`${basePath}/official/v1/player/kyc/apply/level-2`),
    init
  );
}
