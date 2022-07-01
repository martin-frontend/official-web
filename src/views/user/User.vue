<template>
  <Container>
    <div class="user">
      <SideBar />

      <div class="router-content">
        <router-view />
      </div>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import SideBar from '@/layout/SideBar.vue';
import Container from '@/layout/Container.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.user {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  .router-content {
    flex: 1;
    overflow-x: hidden;
  }
}
</style>
