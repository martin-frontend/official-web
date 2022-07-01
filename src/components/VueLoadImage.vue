<template>
  <Transition name="fade">
    <div v-if="$slots.image && status === 'loaded'">
      <slot name="image" />
    </div>
  </Transition>

  <slot v-if="status === 'failed'" name="error" />
  <slot v-if="status === 'loading'" name="preloader" />
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref, useSlots, watch, defineEmits } from 'vue';

interface VueLoadImageEmits {
  (e: 'onLoad'): void;
  (e: 'onError', error: any): void;
}

enum Status {
  PENDING = 'pending',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}

const emit = defineEmits<VueLoadImageEmits>();

const status = ref<string | null>(null);

const img = ref<HTMLImageElement | null>(null);

const src = ref('');

const crossOrigin = ref(null);

const slot = useSlots();

watch(
  () => src.value,
  (val) => {
    status.value = val ? Status.LOADING : Status.PENDING;
  }
);

function destroyLoader() {
  if (img.value) {
    img.value.onload = null;
    img.value.onerror = null;
    img.value = null;
  }
}

function createLoader() {
  destroyLoader();
  img.value = new Image();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  img.value.onload = handleLoad;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  img.value.onerror = handleError;
  img.value.crossOrigin = crossOrigin.value;
  img.value.src = src.value;
}

function handleLoad() {
  destroyLoader();
  status.value = Status.LOADED;
  emit('onLoad');
}

function handleError(error: any) {
  destroyLoader();
  status.value = Status.FAILED;
  emit('onError', error);
}

// eslint-disable-next-line @typescript-eslint/no-shadow
function findImgElementFrom(slot: any) {
  const queue = [...slot];
  while (queue.length > 0) {
    const child = queue.shift();
    if (
      child.type === 'img' ||
      (child.props && child.props['data-src'] != null)
    ) {
      return child;
    }
    if (child.children instanceof Array) {
      queue.push(...child.children);
    }
  }
  return null;
}

function getImgElementFromImageSlot() {
  const imageSlot = slot.image && slot.image();
  if (imageSlot === undefined) {
    console.warn(
      'Please define <template v-slot:image> slot in <vue-load-image>'
    );
    return;
  }
  // eslint-disable-next-line consistent-return
  return findImgElementFrom(imageSlot);
}

onMounted(() => {
  const imageElement = getImgElementFromImageSlot();
  if (imageElement == null) {
    return;
  }
  src.value = imageElement.props.src || imageElement.props['data-src'];
  if (src.value) {
    status.value = Status.LOADING;
    crossOrigin.value = imageElement.props.crossorigin;
    createLoader();
  } else {
    status.value = Status.PENDING;
  }
});

onUpdated(() => {
  const imageElement = getImgElementFromImageSlot();
  if (imageElement == null) {
    return;
  }
  const receivedSrc = imageElement.props.src || imageElement.props['data-src'];
  if (status.value === Status.LOADING && !img.value) {
    createLoader();
    return;
  }
  if (src.value !== receivedSrc) {
    src.value = receivedSrc;
    crossOrigin.value = imageElement.props.crossorigin;
    createLoader();
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/transition.scss';
div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
