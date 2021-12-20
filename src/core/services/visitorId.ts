import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default async function getVisitorId(): Promise<string> {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
}
