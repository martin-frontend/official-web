<template>
  <div class="block-button">
    <div class="block-button-warp">
      <router-link
        v-for="{ name, path } of routerOptions"
        :key="name"
        v-slot="{ isActive }"
        :to="path"
      >
        <Button
          component="button"
          color="primary"
          size="small"
          :actived="isActive"
          variant="darken-rounded"
        >
          {{ name }}
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import Button from '@/components/Button.vue';

export interface RouterLinkBUttonWrapProps {
  routerOptions: {
    name: string;
    path: string;
    title?: string;
  }[];
}

defineProps<RouterLinkBUttonWrapProps>();
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.block-button {
  display: flex;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: 24px;
  overflow-x: auto;

  .block-button-warp {
    display: flex;
    flex-wrap: nowrap;
  }
  .button {
    margin-right: 20px;
  }
}
</style>
