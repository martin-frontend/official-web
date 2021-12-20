import { ref } from 'vue';

// for normal system
export const isFullscreen = ref<boolean>(false);

// for can't use fullscreen system
export const isOtherFullscreen = ref<boolean>(false);

export const isCanFullscreen = ref<boolean>(false);

export function openfullscreen(element: HTMLElement) {
  // Trigger fullscreen
  const docElmWithBrowsersFullScreenFunctions = element as HTMLElement & {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  };

  if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
    docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    isCanFullscreen.value = true;
  } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
    /* Firefox */
    docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    isCanFullscreen.value = true;
  } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    isCanFullscreen.value = true;
  } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
    /* IE/Edge */
    docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    isCanFullscreen.value = true;
  }

  if (!isCanFullscreen.value) {
    isOtherFullscreen.value = true;
    return;
  }

  isFullscreen.value = true;
}

export function closefullscreen() {
  const docWithBrowsersExitFunctions = document as Document & {
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
  };
  if (docWithBrowsersExitFunctions.exitFullscreen) {
    docWithBrowsersExitFunctions.exitFullscreen();
  } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
    /* Firefox */
    docWithBrowsersExitFunctions.mozCancelFullScreen();
  } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    docWithBrowsersExitFunctions.webkitExitFullscreen();
  } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
    /* IE/Edge */
    docWithBrowsersExitFunctions.msExitFullscreen();
  }

  isFullscreen.value = false;
}
