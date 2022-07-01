<template>
  <CommonDialog>
    <div class="dialog">
      <div class="dialog-title">
        {{ t('payment.withdraw.dialog.verify_your_mobile_number') }}
      </div>

      <div class="otp-container">
        <IconBase class="icon" :width="60" :height="60" viewBox="0 0 60 60">
          <IconOTP />
        </IconBase>
        <ul>
          <li>{{ 'The OTP will be expired in 5:00' }}</li>
          <li>{{ '您已使用每日OTP次數1/3次' }}</li>
        </ul>
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

      <p class="otp-text">
        {{ 'Didn’t receive the verification OTP?' }}
        <u>{{ 'Resend OTP' }}</u>
      </p>
    </div>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CommonDialog from '@/layout/CommonDialog.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconOTP from '@/components/icons/IconOTP.vue';

const { t } = useI18n();
const errorMessage = ref<string>('');
const passwordInput = ref<string>('');

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

.otp-container {
  display: flex;
  flex-direction: column;
  margin-top: -2px;
  margin-bottom: 24px;
  @include mobile {
    margin-top: -7px;
    margin-bottom: 16px;
  }
  .icon {
    margin: 0 auto;
  }
  ul {
    margin-top: 18px;
    list-style-type: disc;

    @include mobile {
      margin-top: 9px;
    }

    li {
      font-size: 16px;
      line-height: 20px;
      color: #bdbdbd;

      @include mobile {
        font-size: 12px;
        line-height: 16px;
      }
    }
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

.otp-text {
  display: flex;
  margin-top: 16px;
  font-size: 14px;
  line-height: 22px;
  color: #fff;

  @include mobile {
    flex-direction: column;
    font-size: 12px;
    line-height: 16px;
  }
  u {
    text-align: center;
    margin-left: 6px;
    color: var(--success-color);
    cursor: pointer;
  }
}
</style>
