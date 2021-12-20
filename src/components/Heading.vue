<template>
  <div class="heading">
    <h2 class="heading__title">{{ props.title }}</h2>
    <div class="heading__define">
      {{ props.define }}
      <Text class="heading__define" :color="props.otherDefineColor" size="sm">
        {{ props.otherDefine }}
      </Text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
import Text, { TypographyColor } from '@/components/Typography.vue';

export interface HeadingProps {
  title: string;
  define?: string;
  otherDefine?: string;
  otherDefineColor?: TypographyColor;
}
const props = withDefaults(defineProps<HeadingProps>(), {
  title: '',
  define: '',
  otherDefine: '',
  otherDefineColor: 'success',
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.heading {
  width: 100%;
  margin-bottom: 24px;

  &__title {
    color: var(--text-primary);
    font-weight: var(--text-bold);
    font-size: 36px;
    line-height: 42px;
  }

  &__define {
    margin-top: 8px;
    color: var(--text-secondary);
    line-height: 20px;
  }

  @include mobile {
    margin-bottom: 16px;
    &__title {
      font-weight: normal;
      font-size: 22px;
      line-height: 24px;
    }

    &__define {
      margin-top: 4px;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
