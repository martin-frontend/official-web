<template>
  <div class="expansion">
    <div class="expansion-header" @click="readmore">
      <div class="expansion-header-content">
        <slot name="header" />
      </div>
      <div class="expansion-header-icon">
        <IconBase
          :width="20"
          :height="20"
          viewBox="0 0 20 20"
          :class="{ 'is-open': isOpen }"
        >
          <IconArrow />
        </IconBase>
      </div>
    </div>
    <div
      ref="expansionContent"
      class="expansion-content"
      :style="{ 'max-height': `${contentHeight}px` }"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

const isOpen = ref(false);
const expansionContent = ref<HTMLElement | null>(null);

function readmore() {
  isOpen.value = !isOpen.value;
}

const contentHeight = computed(() => {
  if (expansionContent.value && isOpen.value) {
    return expansionContent.value.scrollHeight;
  }
  return 0;
});

onMounted(() => {
  // readmore();
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.expansion {
  @include mobile {
    font-size: 12px;
  }

  &-header {
    display: flex;
    min-height: 70px;
    box-sizing: border-box;
    padding: 0 25px 0 35px;
    background-color: var(--secondary-variants-color);
    cursor: pointer;

    @include mobile {
      padding: 0 16px 0 20.5px;
    }
  }

  &-header-content {
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
    // align-items: center;
    // width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 16px;

    @include mobile {
      font-size: 14px;
    }
  }

  &-header-icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    svg {
      transition: all 0.5s ease-in-out;
      &.is-open {
        transform: rotate(-180deg);
      }
    }
  }

  &-content {
    overflow: hidden;
    box-sizing: border-box;
    background-color: #000;
    transition: all 0.3s ease-in-out;
  }

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.35);
  }
}
</style>
