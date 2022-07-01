<template>
  <NewDialog header="Delete The Account">
    <div class="contetn">
      <span class="message">
        {{ t('my_withdrawal_account.delete_account_dialog.message') }}
      </span>
      <div class="button-group">
        <Button
          class="button"
          variant="rounded-outlined"
          color="primary"
          @click="emit('cancel')"
        >
          {{ t('common.cancel') }}
        </Button>
        <Button
          class="button"
          variant="rounded"
          color="primary"
          @click="emit('delete')"
        >
          {{ t('common.delete') }}
        </Button>
      </div>
    </div>
  </NewDialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { defineEmits, defineProps } from 'vue';
import NewDialog from '@/layout/NewDialog.vue';
import Button from '@/components/Button.vue';

interface DeleteWithdrawalAccountEmits {
  (e: 'delete'): void;
  (e: 'cancel'): void;
}
interface DeleteWithdrawalAccountProps {
  id: number;
}

const emit = defineEmits<DeleteWithdrawalAccountEmits>();
defineProps<DeleteWithdrawalAccountProps>();
const { t } = useI18n();
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.contetn {
  margin-top: 16px;
  @include mobile {
    margin-top: 8px;
  }
}
.message {
  line-height: 20px;
  color: var(--text-secondary);
  margin-top: 16px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  @include mobile {
    font-size: 12px;
    line-height: 16px;
  }
}
.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
  .button {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>
