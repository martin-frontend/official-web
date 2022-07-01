<template>
  <CommonDialog>
    <div class="dialog">
      <div class="dialog-title">
        {{ t('payment.withdraw.dialog.setup_withdraw_password') }}
      </div>
      <div class="input-group">
        <InputBox
          v-model="passwordInput"
          :is-error="!!errorMessage && !passwordInput"
          :error-message="errorMessage"
          class="input"
        />
      </div>

      <Button
        class="confirm-button"
        :disabled="passwordInput === ''"
        @click="onClickConfirm"
      >
        {{ t('common.confirm') }}
      </Button>
    </div>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CommonDialog from '@/layout/CommonDialog.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';

const { t } = useI18n();
const errorMessage = ref<string>('');
const passwordInput = ref<string>('');

function onClickConfirm() {
  console.log('test');
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 480px;
  padding: 40px;

  @include mobile {
    width: 320px;
    padding: 32px;
  }
}

.dialog-title {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
  margin-bottom: 24px;

  @include mobile {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 16px;
  }
}

.input-group {
  margin-bottom: 16px;
  width: 100%;
  .p-input-filled + .p-input-filled {
    margin-top: 10px;
    @include mobile {
      margin-top: 8px;
    }
  }
}

.confirm-button {
  width: 100%;
}
</style>
