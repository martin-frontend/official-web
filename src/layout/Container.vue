<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.container {
  box-sizing: border-box;
  max-width: 1530px;
  margin: 0 auto;
  padding: 40px 40px 100px 40px;
  text-align: center;

  @include mobile {
    padding: 16px 20px 100px 20px;
  }
}
</style>
