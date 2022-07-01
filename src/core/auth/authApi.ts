import { initVisitorId } from '@/core/services/visitorId';
import { fetchPost } from '../services/api/apiBase';
import { updateAmount } from '@/modules/userBalance/application/balance';
import useVisitorIdStore from '@/core/auth/visitorId';
import usePlayerMessageStore from '@/modules/theHeader/infrastructure/store/playerMessage';

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

export async function initToken(): Promise<string> {
  return fetchPost('/official/v1/player/init');
}

let evtSource: EventSource | null = null;

export async function startSubscribe() {
  await initVisitorId();
  const visitorIdStore = useVisitorIdStore();
  evtSource = new EventSource(
    `api/official/v1/player/sse/subscribe?visitor-id=${visitorIdStore.visitorId}`
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

  evtSource.addEventListener('NEW_MESSAGE', (data: any) => {
    const playerMessageStore = usePlayerMessageStore();
    playerMessageStore.setPlayerMessage(JSON.parse(data.data));
  });
}

export function closeSubscribe() {
  if (!evtSource) {
    return;
  }

  evtSource.close();
  console.log('Subscribe closed.');
}
