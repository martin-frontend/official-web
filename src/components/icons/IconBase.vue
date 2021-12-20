<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    :viewBox="viewBox"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    iconName?: string;
    iconColor?: string;
    viewBox?: string;
  }>(),
  {
    width: 18,
    height: 18,
    iconName: '',
    iconColor: 'var(--primary-color)',
    viewBox: '0 0 18 18',
  }
);

const { width, height, iconName, iconColor } = toRefs(props);
</script>
