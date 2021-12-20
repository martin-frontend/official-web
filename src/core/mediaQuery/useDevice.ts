import { onMounted, onUnmounted, ref } from 'vue';
import { calculateDevice } from './calculateDevice';
import { Device } from './device';

export function useDevice() {
  const device = ref<Device | null>(null);

  function setDevice() {
    device.value = calculateDevice();
  }

  onMounted(() => {
    setDevice();
    window.addEventListener('resize', setDevice);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setDevice);
  });

  return device;
}
