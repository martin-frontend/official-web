<template>
  <template v-if="data">
    <ul class="double-column-list">
      <li v-for="{ header, key } of columns" :key="key" class="item">
        <div class="title">{{ header }}</div>
        <div>
          <slot
            v-if="$slots[key as string]"
            :name="key"
            :text="(data as any)[key]"
          />
          <template v-else>
            {{ (data as any)[key] }}
          </template>
        </div>
      </li>
    </ul>
  </template>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export interface DoubleColumnListColumn<T> {
  key: keyof T;
  header: string;
}

export interface DoubleColumnListProps<T> {
  // eslint-disable-next-line vue/require-default-prop
  data?: T;
  columns?: ReadonlyArray<DoubleColumnListColumn<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<DoubleColumnListProps<any>>(), {
  columns: () => [],
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.double-column-list {
  .item {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 8px;
    padding: 0 24px;

    &:first-child {
      margin-top: 20px;
    }

    &:last-child {
      margin-bottom: 20px;
    }
  }

  .title {
    color: var(--primary-color);
  }

  @include mobile {
    .item {
      padding: 0 16px;

      &:first-child {
        margin-top: 16px;
      }

      &:last-child {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
