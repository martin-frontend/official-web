<template>
  <CommonDialog>
    <div class="dialog">
      <div class="dialog-title">
        {{ t('payment.withdraw.dialog.new_password') }}
      </div>

      <div class="logo-img">
        <img :src="`${imagePath}${logoUrl}`" />
      </div>
      <div class="input-group">
        <div class="p-input-filled">
          <span class="p-float-label">
            <InputText v-model="cardHolderInput" />
            <label>{{ t('payment.withdraw.dialog.card_holder') }}</label>
          </span>
        </div>
        <div class="p-input-filled">
          <span class="p-float-label">
            <InputText v-model="cardNumberInput" />
            <label>{{ t('payment.withdraw.dialog.card_number') }}</label>
          </span>
        </div>
      </div>

      <Button
        class="confirm-button"
        :disabled="passwordInput === ''"
        @click="onClickConfirm"
      >
        {{ t('common.confirm') }}
      </Button>

      <u class="lost-password" @click="showNewPasswordDialog">
        {{ t('payment.withdraw.dialog.lost_your_password') }}
      </u>
    </div>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import CommonDialog from '@/layout/CommonDialog.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';

const { t } = useI18n();
const errorMessage = ref<string>('');
const logoUrl = ref<string>('');
const passwordInput = ref<string>('');
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
const cardHolderInput = ref<string>('');
const cardNumberInput = ref<string>('');

function onClickConfirm() {
  console.log('test');
}

const showNewPasswordDialog = () => {
  //   withdrawPasswordStore.popUp({
  //     title: t('payment.withdraw.dialog.new_password'),
  //     confirmButtonText: t('common.confirm'),
  //     curDialogType: DialogType.NewPassword,
  //   });

  passwordInput.value = '';
};
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

.lost-password {
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  margin-top: 24px;
  color: #fff;
  @include mobile {
    font-size: 12px;
    line-height: 16px;
    margin-top: 16px;
  }
}
</style>
