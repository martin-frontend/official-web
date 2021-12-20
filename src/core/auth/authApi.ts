import { fetchPost } from '../services/api/apiBase';
import { updateAmount } from '@/modules/userBalance/application/balance';
import useVisitorIdStore from '@/core/auth/visitorId';

export default async function loginApi(
  email: string,
  password: string,
  visitorId: string
): Promise<string> {
  return fetchPost('/official/v1/player/login', {
    visitorId,
    email,
    password,
  });
}

export async function logoutApi(): Promise<void> {
  return fetchPost('/official/v1/player/logout');
}

let evtSource: EventSource | null = null;

export function startSubscribe() {
  const visitorIdStore = useVisitorIdStore();
  evtSource = new EventSource(
    `${process.env.VUE_APP_BASE_PATH}api/official/v1/player/sse/subscribe?visitor-id=${visitorIdStore.visitorId}`
  );

  evtSource.onopen = () => {
    console.log('Connection to subscribed.');
  };

  evtSource.onerror = () => {
    console.log('Subscribe failed.');
  };

  evtSource.addEventListener('WALLET_AMOUNT', () => {
    updateAmount();
  });
}

export function closeSubscribe() {
  if (!evtSource) {
    return;
  }

  evtSource.close();
  console.log('Subscribe closed.');
}
