<template>
  <div class="dialog-background" @click="closeDialog">
    <div class="dialog" @click.stop>
      <Button
        class="p-button-icon-only p-button-rounded dialog-button"
        @click="closeDialog"
      >
        <IconBase :width="9" :height="9" viewBox="9 9 12 12" icon-color="#fff">
          <IconClose />
        </IconBase>
      </Button>

      <iframe v-if="iframeUrl" :src="iframeUrl" class="dialog-content" />
      <div v-else class="dialog-content">
        <span>{{ 'This is 3rd party demo page' }}</span>

        <Button @click="completeProcess">
          {{ 'complete process' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import { defineEmits, defineProps, toRefs } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'complete'): void;
}>();

const props = defineProps<{ iframeUrl: string }>();
const { iframeUrl } = toRefs(props);

function closeDialog() {
  emit('close');
}

function completeProcess() {
  emit('complete');
}
</script>

<style lang="scss" scoped>
.dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
}

.dialog {
  position: relative;
  overflow: hidden;
  width: 600px;
  height: 720px;
  border-radius: 10px;
  background: #fff;

  .dialog-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 0;
    background: rgba(66, 66, 66, 0.8);
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    width: 100%;
    height: 100%;
    padding: 30px;
    color: #000;
    font-size: 24px;

    > * {
      margin: 30px;
    }
  }
}
</style>
