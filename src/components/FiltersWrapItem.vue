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
  text-align: left;

  @include desktop {
    max-width: 230px;
    min-width: 230px;
  }

  @include tablet-h {
    max-width: 190px;
    min-width: 190px;
  }
}
</style>
