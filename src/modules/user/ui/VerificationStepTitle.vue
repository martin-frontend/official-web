<template>
  <div class="step-title">
    <Text color="surface">{{ props.title }}{{ props.step }}</Text>
    <Text color="surface">{{ ' - ' }}</Text>
    <Text color="surface">{{ props.define }}</Text>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
import Text from '@/components/Typography.vue';

export interface StepTitleProps {
  title: string;
  define?: string;
  step?: number;
}
const props = withDefaults(defineProps<StepTitleProps>(), {
  title: '',
  define: '',
  step: undefined,
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';
.step-title {
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--primary-color);

  @include mobile {
    margin-bottom: 16 px;
  }
}
</style>
