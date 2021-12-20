<template>
  <div class="close-button" :style="{ top, right }">
    <IconBase :width="12" :height="12" viewBox="9 9 12 12" icon-color="#000">
      <IconClose />
    </IconBase>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, withDefaults } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';

const props = withDefaults(
  defineProps<{
    top?: string;
    right?: string;
  }>(),
  {
    top: '10px',
    right: '10px',
  }
);
const { top, right } = toRefs(props);
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
  right: 10px;
  top: 10px;
  cursor: pointer;
  @include mobile {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }
}
</style>
