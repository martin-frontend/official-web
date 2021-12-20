import { Device } from './device';

export function calculateDevice() {
  const width = window.innerWidth;

  if (width < 768) {
    return Device.MOBILE;
  }
  if (width >= 768 && width < 1024) {
    return Device.TABLET_VERTICAL;
  }
  if (width >= 1024 && width < 1440) {
    return Device.TABLET_HORIZONTAL;
  }

  return Device.DESKTOP;
}
