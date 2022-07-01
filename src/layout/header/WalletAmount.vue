<template>
  <router-link to="/user/balance">
    <div class="wallet-amount">
      <Button class="p-button-rounded p-button-icon-only primary-linear-btn">
        <IconBase
          :width="12"
          :height="12"
          viewBox="0 0 12 12"
          icon-color="#000"
        >
          <IconPlus />
        </IconBase>
      </Button>
      <span>{{ `$ ${balanceStore.amount.toLocaleString()}` }}</span>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import IconBase from '@/components/icons/IconBase.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';

const balanceStore = useBalanceStore();
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.wallet-amount {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-width: 100px;
  height: 40px;
  padding: 0 8px;
  border: 1px solid #505050;
  border-radius: 22.5px;
  background: #000;

  // @include phone-width {
  //   padding-right: 0;
  // }

  .p-button-icon-only {
    width: 26px;
    height: 26px;
    padding: 0;
  }

  span {
    margin-left: 10px;
    font-weight: 500;
    font-size: 12px;
    font-family: var(--font-family);
    line-height: 16px;
    color: var(--text-primary);
  }
}
</style>
