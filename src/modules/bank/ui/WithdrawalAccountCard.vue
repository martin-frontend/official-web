<template>
  <div class="withdrawal-account-card">
    <div class="account-img">
      <img v-if="data" src="@/assets/images/bank.png" alt="" />

      <div v-else class="empty-img">
        <IconBase :width="12" :height="12" viewBox="0 0 12 12">
          <IconPlus />
        </IconBase>
      </div>
    </div>
    <div class="account-info">
      <div class="account-title">
        {{ data?.bank?.name || 'Add Account' }}
        <div v-if="data && isDefaultShown" class="default">
          {{ 'Default' }}
        </div>
      </div>
      <div class="account-code">
        {{ data?.bankAccount ? `[Verified] ${data?.bankAccount}` : '-' }}
      </div>
    </div>
    <template v-if="data && isDeleteShown">
      <div class="delete">
        {{ 'Delete' }}
      </div>
      <IconBase class="arrow-icon" :width="20" :height="20" viewBox="0 0 20 20">
        <IconArrow />
      </IconBase>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
// import { useI18n } from 'vue-i18n';
import { PlayerBankAccountAggregateRoot } from '../domain/player/playerBankAccount.model';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconBase from '@/components/icons/IconBase.vue';

interface WithdrawalAccountCardProps {
  data?: PlayerBankAccountAggregateRoot;
  isDeleteShown?: boolean;
  isDefaultShown?: boolean;
}
withDefaults(defineProps<WithdrawalAccountCardProps>(), {
  data: undefined,
  isDeleteShown: true,
  isDefaultShown: true,
});

// const { t } = useI18n();
// console.log(t);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.withdrawal-account-card {
  display: flex;
  border-radius: 5px;
  border: 1px solid #757575;
  padding: 16px 24px;
  align-items: center;
  @include mobile {
    padding: 13px 16px;
  }
  .account-img {
    width: 90px;
    height: 52px;
    margin-right: 24px;
    @include mobile {
      width: 50px;
      height: 30px;
      margin-right: 12px;
    }
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    .empty-img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 1px dashed var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .account-info {
    .account-title {
      display: flex;
      font-size: 16px;
      line-height: 20px;
      color: var(--primary-color);
      margin-bottom: 10px;
      @include mobile {
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 4px;
      }
      .default {
        font-size: 12px;
        line-height: 12px;
        padding: 3px 10px;
        border-radius: 2px;
        border: 1px solid var(--primary-color);
        margin-left: 13px;
        @include mobile {
          font-size: 12px;
          line-height: 16px;
          padding: 0 8px;
          margin-left: 10px;
        }
      }
    }
    .account-code {
      font-size: 16px;
      line-height: 20px;
      color: var(--text-primary);
      @include mobile {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  .delete {
    font-size: 16px;
    text-decoration-line: underline;
    color: #9e9e9e;
    margin-left: auto;
    @include mobile {
      display: none;
    }
  }
  .arrow-icon {
    margin-left: 31px;
    transform: rotate(270deg);
    @include mobile {
      margin-left: auto;
    }
  }
}
</style>
