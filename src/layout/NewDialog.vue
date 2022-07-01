<template>
  <DialogPrimevue
    v-model:visible="open"
    class="new-dialog"
    :closable="false"
    :modal="true"
  >
    <CloseButton @click="onClickCancel" />
    <slot />
  </DialogPrimevue>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import DialogPrimevue from 'primevue/dialog';
import { useVModel } from '@vueuse/core';
import CloseButton from '@/components/CloseButton.vue';

interface NewDialogProps {
  visible?: boolean;
}

interface NewDialogEmits {
  (e: 'update:visible', value: boolean): void;
}

const props = defineProps<NewDialogProps>();
const emit = defineEmits<NewDialogEmits>();
const open = useVModel(props, 'visible', emit);

function onClickCancel() {
  open.value = false;
}
</script>

<style lang="scss" scoped></style>
