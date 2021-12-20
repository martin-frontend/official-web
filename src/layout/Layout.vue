<template>
  <TheDialog />
  <TheHeader />
  <TheSidebar />
  <div class="main">
    <router-view />
  </div>
  <TheFooter />
  <TheRecommend />
  <Toast />
</template>

<script setup lang="ts">
import TheHeader from './header/TheHeader.vue';
import TheSidebar from './TheSidebar.vue';
import TheFooter from './TheFooter.vue';
import TheDialog from './TheDialog.vue';
import TheRecommend from './TheRecommend.vue';
import Toast from '@/components/Toast.vue';
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 56px;
  background: url('~@/assets/images/marble-background.jpeg') no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
