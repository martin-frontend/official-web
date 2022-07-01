<template>
  <DialogPrimevue :modal="true" :show-header="false">
    <div class="common-dialog">
      <CloseButton @click="closeDialog" />
      <slot />
    </div>
  </DialogPrimevue>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import DialogPrimevue from 'primevue/dialog';
import CloseButton from '@/components/CloseButton.vue';

export interface CommonDialogEmits {
  (e: 'close'): void;
}

const emit = defineEmits<CommonDialogEmits>();

function closeDialog() {
  emit('close');
}
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.common-dialog {
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  background: #323232;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  max-width: 90vw;
}
</style>
