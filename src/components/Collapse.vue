<template>
  <div class="collapse">
    <div class="collapse-header" @click="toggle">
      <slot name="header" />

      <IconBase
        :width="30"
        :height="30"
        viewBox="0 0 20 20"
        :class="{ 'upside-down': isOpened }"
      >
        <IconArrow />
      </IconBase>
    </div>
    <div class="collapse-body" :class="{ opened: isOpened }">
      <div class="content-wrapper"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

const isOpened = ref(false);

function toggle() {
  isOpened.value = !isOpened.value;
}
</script>

<style lang="scss" scoped>
.collapse {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: #323232;

  .collapse-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100px;
    padding: 0 24px;

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
    transition: 0.3s;

    &.opened {
      max-height: 500px;
    }

    .content-wrapper {
      margin: 8px 24px 32px;
    }
  }
}
</style>
