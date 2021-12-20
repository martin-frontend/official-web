<template>
  <template v-if="data">
    <div v-show="$slots['order']" class="order">
      <slot name="order" />
    </div>
    <div
      :class="columns.length > 2 ? 'grid-container' : 'grid-container-other'"
    >
      <div
        v-for="({ data: columnData, key }, index) of columns"
        :key="key"
        :class="`grid${index + 1}`"
      >
        <slot
          v-if="$slots[key as string]"
          :name="key"
          :text="(data as any)[columnData]"
        />
        <template v-else>
          {{ (data as any)[columnData] }}
        </template>
      </div>
    </div>

    <!-- <div
        v-for="{ data: columnData, key } of columns"
        :key="key"
        style="flex: 1"
      >
        <slot
          v-if="$slots[key as string]"
          :name="key"
          :text="(data as any)[columnData]"
        />
        <template v-else>
          {{ (data as any)[columnData] }}
        </template>
      </div> -->
  </template>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export interface GridExpansionPanelHeaderColumn<T> {
  key: string;
  data: keyof T;
}

export interface GridExpansionPanelHeaderProps<T> {
  // eslint-disable-next-line vue/require-default-prop
  data?: T;
  columns?: ReadonlyArray<GridExpansionPanelHeaderColumn<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<GridExpansionPanelHeaderProps<any>>(), {
  data: {},
  columns: () => [],
});
</script>

<style lang="scss" scoped>
.order {
  margin-right: 35px;
}

.grid-container,
.grid-container-other {
  display: grid;
  grid-template-columns: 2fr 1fr;
  flex: 1;

  & > div {
    line-height: 22px;
  }

  .grid1 {
    grid-column: 1;
    grid-row: 1;
  }
  .grid2 {
    grid-column: 1;
    grid-row: 2;
    color: var(--disabled-color);
    font-size: 12px;
  }
  .grid3 {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 13px;
  }
}

.grid-container-other {
  .grid1 {
    grid-column: 1;
    grid-row: 1;
  }
  .grid2 {
    grid-column: 2;
    grid-row: 1;
    margin-left: auto;
    margin-right: 13px;
    color: unset;
    font-size: unset;
  }
}
</style>
