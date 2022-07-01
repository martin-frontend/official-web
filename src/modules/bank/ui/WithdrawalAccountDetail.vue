<template>
  <NewDialog header="Withdrawal Account">
    <WithdrawalAccountCard
      class="card"
      :data="data"
      :is-delete-shown="false"
      :is-default-shown="false"
    />
    <div class="content">
      <div
        v-for="option of fieldOptions"
        :key="option.label"
        class="input-field"
      >
        <div class="label">{{ option.label }}</div>
        <div class="value">{{ option.value }}</div>
      </div>
      <Button
        class="button"
        variant="outlined"
        @click="emit('delete', data?.id!)"
      >
        {{ t('my_withdrawal_account.delete') }}
      </Button>
    </div>
  </NewDialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, defineProps, defineEmits } from 'vue';
import NewDialog from '@/layout/NewDialog.vue';
import WithdrawalAccountCard from './WithdrawalAccountCard.vue';
import { PlayerBankAccountAggregateRoot } from '../domain/player/playerBankAccount.model';
import Button from '@/components/Button.vue';

interface WithdrawalAccountDetailEmits {
  (e: 'delete', id: number): void;
}

interface WithdrawalAccountDetailProps {
  data?: PlayerBankAccountAggregateRoot;
}

const props = defineProps<WithdrawalAccountDetailProps>();
const emit = defineEmits<WithdrawalAccountDetailEmits>();

const { t } = useI18n();
const fieldOptions = computed(() => [
  {
    label: t('my_withdrawal_account.label.account_name'),
    value: props.data?.bankAccountName,
  },
  {
    label: t('my_withdrawal_account.label.account_number'),
    value: props.data?.bankAccount,
  },
  {
    label: t('my_withdrawal_account.label.bank_name'),
    value: props.data?.bank?.name,
  },
  {
    label: t('my_withdrawal_account.label.bank_branch_city'),
    value: props.data?.bankCityName,
  },
  {
    label: t('my_withdrawal_account.label.branch_name'),
    value: props.data?.bankBranchName,
  },
]);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.card {
  margin-top: 20px;
  @include mobile {
    margin-top: 16px;
  }
}
.content {
  width: 400px;
  height: auto;
  @include mobile {
    width: 250px;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--primary-color);
    margin-top: 16px;
    @include mobile {
      padding-bottom: 8px;
    }
    .label {
      font-size: 12px;
      line-height: 16px;
      color: var(--primary-color);
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      line-height: 20px;
      color: var(--text-primary);
      @include mobile {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}

.button {
  width: 100%;
  margin-top: 20px;
}
</style>
