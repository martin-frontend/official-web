<template>
  <div class="history">
    <div class="header">
      <Heading :title="routerOptionsByPath[$route.path]?.title" />
      <RouterLinkButtonWrap :router-options="routerOptions" />
    </div>

    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { keyBy } from 'lodash-es';
import RouterLinkButtonWrap from '@/components/RouterLinkButtonWrap.vue';
import Heading from '@/components/Heading.vue';

const { t } = useI18n();

const routerOptions = computed(() => [
  {
    name: 'Game',
    path: '/user/history/game-history',
    title: t('payment.game_history.title'),
  },
  {
    name: 'Wallet',
    path: '/user/history/payment-transactions',
    title: t('payment.transactions.title'),
  },
  {
    name: 'Deposit',
    path: '/user/history/deposit-history',
    title: t('paymentshistory.title'),
  },
  {
    name: 'Withdraw',
    path: '/user/history/withdraw-history',
    title: t('paymentshistory.title'),
  },
  {
    name: 'Login',
    path: '/user/history/login-history',
    title: t('loginhistory.title'),
  },
  {
    name: 'Withdraw Limit Record',
    path: '/user/history/balance-withdraw',
    title: t('payment.balance_withdraw.title'),
  },
  {
    name: 'Bonuses Record',
    path: '/user/history/bonuses-history',
    title: t('bonusesHistory.title'),
  },
  {
    name: 'Reward Record',
    path: '/user/history/balance-rewards',
    title: t('payment.reward.title'),
  },
]);

const routerOptionsByPath = computed(() =>
  keyBy(routerOptions.value, (r) => r.path)
);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped></style>
