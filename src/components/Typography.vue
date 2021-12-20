<template>
  <component :is="component" class="text" :class="[color, device, size]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'surface'
  | 'disabled'
  | 'dark';

export type TypographySize = 'defult' | 'sm' | 'tiny';

export type TypographyComponent = 'div' | 'span';

export type TypographyDevice = 'mobile' | '';

export interface TypographyProps {
  color?: TypographyColor;
  component?: string;
  size?: TypographySize;
  device?: TypographyDevice;
}

withDefaults(defineProps<TypographyProps>(), {
  component: 'span',
  color: 'primary',
  size: 'defult',
  device: '',
});
</script>

<style scoped lang="scss">
@import '@/styles/breakpoints';

.text {
  &.defult {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
  }

  &.sm {
    font-size: 14px;
  }

  &.tiny {
    font-size: 12px;
    line-height: 16px;
  }

  &.primary {
    color: var(--text-primary);
  }

  &.secondary {
    color: var(--text-secondary);
  }

  &.success {
    color: var(--success-color);
  }

  &.warning {
    color: var(--warning-color);
  }

  &.error {
    color: var(--error-color);
  }

  &.surface {
    color: var(--primary-color);
  }
  &.disabled {
    color: var(--disabled-color);
  }
  &.dark {
    color: var(--secondary-color);
  }

  @include mobile {
    &.mobile.defult {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
