<template>
  <div class="mask" :style="{ background }" />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

export interface MaskProps {
  background?: string;
}

withDefaults(defineProps<MaskProps>(), {
  background: 'rgba(0, 0, 0, 0.5)',
});
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11;
}
</style>
