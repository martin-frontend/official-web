<template>
  <div>
    <div class="bonus-block-group">
      <template v-if="$route.name === 'AccountAndSecurity'">
        <Heading :define="t('account_and_security.define')" />
        <OutlineCard
          v-for="({ title, define, to, type }, index) of options"
          :key="index"
        >
          <div class="bulletin">
            <div class="bulletin-content">
              <div class="bulletin-title">
                {{ title }}
              </div>
              <div class="bulletin-define">
                {{ define }}
              </div>
            </div>
            <router-link
              v-if="
                type === 'changeWithdrawalPassword'
                  ? userSotre.userInfo?.hasWithdrawalPasswordBeenSet
                  : true
              "
              class="bulletin-button"
              :to="to"
            >
              <Button variant="outlined" size="small">
                {{ t('common.update') }}
              </Button>
            </router-link>
          </div>
        </OutlineCard>
      </template>

      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import Button from '@/components/Button.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';

type OptionType =
  | 'changePassword'
  | 'changeWithdrawalPassword'
  | 'changeWithdrawalAccount';

// use i18n
const { t } = useI18n();

const userSotre = useUserStore();
const options = computed<
  {
    type: OptionType;
    title: string;
    define: string;
    to: string;
  }[]
>(() => [
  {
    type: 'changePassword',
    title: t('account_and_security.change_password'),
    define: t('account_and_security.change_password_define'),
    to: '/user/my-account/account-and-security/change-password',
  },
  {
    type: 'changeWithdrawalPassword',
    title: t('account_and_security.withdraw_password'),
    define: t('account_and_security.change_password_define'),
    to: '/user/my-account/account-and-security/change-withdraw-password',
  },
  {
    type: 'changeWithdrawalAccount',
    title: t('account_and_security.withdrawal_account'),
    define: t('account_and_security.change_my_withdrawal_account'),
    to: '/user/my-account/account-and-security/change-withdraw-account',
  },
]);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.outline-card {
  overflow: auto;
  & + & {
    margin-top: 16px;
  }
}
.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}
.bulletin {
  box-sizing: border-box;
  display: flex;
  padding: 28px 20px;
  min-width: 320px;

  .bulletin-content {
    display: flex;
    align-items: center;
    margin-right: 20px;

    @include mobile {
      flex-direction: column;
      align-items: unset;
    }
  }

  .bulletin-title,
  .bulletin-define {
    font-size: 18px;
    line-height: 20px;
    color: var(--text-secondary);

    @include mobile {
      font-size: 12px;
      line-height: 16px;
    }
  }

  .bulletin-title {
    width: 180px;
  }
  .bulletin-define {
    margin-left: 20px;
    color: var(--text-primary);
    @include mobile {
      margin: 4px 0 0;
    }
  }

  .bulletin-button {
    margin: auto 0 auto auto;
    max-height: 40px;

    @include mobile {
      max-height: 24px;
    }
  }
}
</style>
