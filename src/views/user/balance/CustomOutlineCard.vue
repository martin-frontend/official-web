<template>
  <OutlineCard>
    <router-link :to="path">
      <div class="brick-card">
        <div class="brick-card-title">
          {{ title }}
          <i class="pi pi-angle-right" />
        </div>
        <div class="brick-card-amount">
          {{ data }}
        </div>
      </div>
    </router-link>
    <slot />
  </OutlineCard>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import OutlineCard from '@/components/OutlineCard.vue';

interface CustomOutlineCardProps {
  title: string;
  data: string;
  path: string;
}

defineProps<CustomOutlineCardProps>();
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.brick-card {
  box-sizing: border-box;
  width: 100%;
  padding: 32px;
  text-align: left;
  cursor: pointer;

  .brick-card-title {
    font-size: 28px;
    line-height: 32px;
    color: var(--primary-color);
    i {
      float: right;
      line-height: 32px;
    }
  }
  .brick-card-amount {
    margin-top: 16px;
    font-size: 26px;
    line-height: 28px;
    color: #ffffff;
  }

  @include tablet-v {
    padding: 24px;
  }

  @include mobile {
    padding: 20px 12px;

    .brick-card-content + .brick-card-action {
      margin-top: 12px;
    }

    .brick-card-title {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
</style>
