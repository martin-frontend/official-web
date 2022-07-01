<template>
  <div class="my-account">
    <div class="header">
      <Heading :title="t('my_account.label')" />
    </div>

    <RouterLinkButtonWrap :router-options="routerOptions" />

    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Heading from '@/components/Heading.vue';
import RouterLinkButtonWrap from '@/components/RouterLinkButtonWrap.vue';

const { t } = useI18n();

const routerOptions = [
  {
    name: 'Personal Detail',
    path: '/user/my-account/personal-settings',
  },
  {
    name: 'Verfication',
    path: '/user/my-account/verification',
  },
  {
    name: 'Account And Security',
    path: '/user/my-account/account-and-security',
  },
  {
    name: 'Gambling Limit',
    path: '/user/my-account/limit',
  },
];
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
</style>
