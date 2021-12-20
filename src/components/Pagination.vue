<template>
  <div class="pagination">
    <IconBase
      :width="20"
      :height="20"
      viewBox="0 0 20 20"
      icon-color="#fff"
      :style="{ transform: 'rotate(90deg)' }"
      @click="changePage(page - 1)"
    >
      <IconArrow />
    </IconBase>
    <span
      v-for="(item, index) of pages"
      :key="index"
      :class="{ active: item === page, ellipsis: item === '...' }"
      @click="changePage(item)"
    >
      {{ item }}
    </span>
    <IconBase
      :width="20"
      :height="20"
      viewBox="0 0 20 20"
      :style="{ transform: 'rotate(270deg)' }"
      @click="changePage(page + 1)"
    >
      <IconArrow />
    </IconBase>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  toRefs,
  withDefaults,
  defineEmits,
  ComputedRef,
} from 'vue';
import { getPagesOnPagination } from '@/libs/pagination';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

const props = withDefaults(
  defineProps<{
    page: number;
    totalRows: number;
    rowsPerPage?: number;
  }>(),
  {
    page: 1,
    totalRows: 100,
    rowsPerPage: 20,
  }
);

const { page, totalRows, rowsPerPage } = toRefs(props);

const totalPages = computed(() =>
  totalRows.value ? Math.ceil(totalRows.value / rowsPerPage.value) : 1
);

const pages: ComputedRef<(number | '...')[]> = computed(() =>
  getPagesOnPagination(page.value, totalPages.value)
);

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

function changePage(newPage: number | '...') {
  if (
    newPage === '...' ||
    newPage === page.value ||
    newPage < 1 ||
    newPage > totalPages.value
  ) {
    return;
  }
  window.scrollTo(0, 0);
  emit('update:page', newPage);
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin: 24px 0;

  > * {
    width: 24px;
    height: 24px;
    margin: 0 4px;
    cursor: pointer;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--text-primary);
    font-size: 14px;
    font-family: var(--font-family);

    &.ellipsis {
      cursor: default;
    }

    &.active {
      background-color: var(--primary-color);
    }
  }
}
</style>
