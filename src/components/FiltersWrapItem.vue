<template>
  <div class="filters-wrap-item">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.filters-wrap-item {
  margin: 5px 5px;
  flex: 1;

  @include desktop {
    max-width: 248px;
    min-width: 248px;
  }

  @include tablet-h {
    max-width: 196px;
    min-width: 196px;
  }
}
</style>
