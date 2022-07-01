<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import updateAuthToken from './core/auth/updateAuthToken';
import useLanguageStore from './modules/user/Infrastructure/store/languageStore';

const langStore = useLanguageStore();

onMounted(async () => {
  langStore.initLanguage();
  updateAuthToken();
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
