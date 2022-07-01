<template>
  <VueLoadImage>
    <template #image>
      <img :src="src" />
    </template>
    <template #preloader>
      <Loading />
    </template>
    <template #error>{{ 'Image load fails' }}</template>
  </VueLoadImage>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import VueLoadImage from '@/components/VueLoadImage.vue';
import Loading from '@/components/Loading.vue';

defineProps<{
  src: string;
}>();
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
