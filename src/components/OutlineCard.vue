<template>
  <div class="outline-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.outline-card {
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: var(--secondary-variants-color);
}
</style>
