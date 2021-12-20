<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.container {
  box-sizing: border-box;
  max-width: 1360px;
  margin: 0 auto;
  padding: 96px 40px 100px 40px;

  @include mobile {
    padding: 64px 20px 100px 20px;
  }
}
</style>
