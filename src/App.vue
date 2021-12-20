<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { checkUserStatus } from './modules/user/application/user';
import useLanguageStore from './modules/user/Infrastructure/store/languageStore';

const langStore = useLanguageStore();

onMounted(async () => {
  langStore.initLanguage();

  checkUserStatus();
});
</script>

<style lang="scss">
@import './styles/reset';
@import './styles/breakpoints';
@import './styles/theme';
@import './styles/variable';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
@import './styles/index.scss';
</style>
