<template>
  <div class="collapse">
    <div class="collapse-header" @click="toggle">
      <slot name="header" :isActive="isActive" />

      <IconBase
        :icon-color="isActive ? 'var(--primary-color)' : 'white'"
        :width="30"
        :height="30"
        viewBox="0 0 20 20"
        :class="{ 'upside-down': isOpened }"
      >
        <IconArrow />
      </IconBase>
    </div>
    <div class="collapse-body" :class="{ opened: isOpened }">
      <div class="content-wrapper" :class="{ isActive }"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

defineProps<{ isActive?: boolean }>();
const isOpened = ref(false);

function toggle() {
  isOpened.value = !isOpened.value;
}
</script>

<style lang="scss" scoped>
.collapse {
  box-sizing: border-box;
  width: 100%;

  .collapse-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    svg {
      margin-left: auto;
      transition: 0.3s;

      &.upside-down {
        transform: rotate(-180deg);
      }
    }
  }

  .collapse-body {
    overflow: hidden;
    max-height: 0;
    padding: 0;
    transition: 0.5s;

    &.opened {
      max-height: 500px;
    }
    .content-wrapper {
      margin-left: 25px;
      border-left: 1px solid #fff;
      &.isActive {
        border-color: var(--primary-color);
      }
    }
  }
}
</style>
