<template>
  <div class="outlineCard">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.outlineCard {
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: var(--secondary-variants-color);

  & + & {
    margin-top: 16px;
  }
}
</style>
