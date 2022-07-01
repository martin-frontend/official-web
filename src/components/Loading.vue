<template>
  <div ref="box" class="loading" :style="{ 'min-height': `${height}px` }">
    <!-- <i class="pi pi-spin pi-spinner" style="font-size: 2rem" /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const box = ref<HTMLElement>();

const height = computed(() => box.value?.offsetWidth);
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
