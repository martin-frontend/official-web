import FingerprintJS from '@fingerprintjs/fingerprintjs';
import useVisitorIdStore from '@/core/auth/visitorId';

export default async function getVisitorId(): Promise<string> {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
}

export async function initVisitorId() {
  const visitorIdStore = useVisitorIdStore();
  if (!visitorIdStore.visitorId) {
    const visitorId = await getVisitorId();
    visitorIdStore.setVisitorId(visitorId);
  }
}
