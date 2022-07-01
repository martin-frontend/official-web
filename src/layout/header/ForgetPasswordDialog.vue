<template>
  <CommonDialog @close="close">
    <div class="forget-password-dialog">
      <h2 class="forget-password-dialog-title">{{ 'Lost your password?' }}</h2>
      <div class="forget-password-dialog-subtitle">
        {{
          'No worries, just enter the email registered to your account and we will send you a password reset link.'
        }}
      </div>
      <div class="p-input-filled">
        <span class="p-float-label p-input-icon-left">
          <InputBox
            v-model="email"
            :error-message="t('account_and_security.email_password_error')"
            :is-error="isEmailError"
            label="Email address"
          />
        </span>
      </div>
      <Button
        class="primary-linear-btn forget-password-btn"
        :disabled="!email"
        @click="submit"
      >
        {{ 'RESEND PASSWORD' }}
      </Button>
      <Button class="p-button-outlined open-account-btn" @click="openAccount">
        <IconBase
          :width="25"
          :height="25"
          viewBox="0 0 25 25"
          icon-color="#C1A14E"
        >
          <IconChat />
        </IconBase>
        {{ 'OPEN ACCOUNT' }}
      </Button>
    </div>
  </CommonDialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import IconBase from '@/components/icons/IconBase.vue';
import IconChat from '@/components/icons/IconChat.vue';
import useSignUpStore from '@/modules/user/Infrastructure/store/signUpStore';
import { forgetPassword } from '@/modules/user/application/forgetPassword';
import CommonDialog from '@/layout/CommonDialog.vue';
import { closeForgetPasswordDialog } from '@/modules/user/application/login';
import { emailValidator } from '@/modules/user/application/register';
import InputBox from '@/components/InputBox.vue';
import { usePathName } from '@/core/pathName/usePathName';

const { t } = useI18n();

const signUpStore = useSignUpStore();

const email = ref('');

const isEmailError = ref(false);

function close() {
  email.value = '';
  closeForgetPasswordDialog();
}

function openAccount() {
  close();

  signUpStore.setIsSignUpDialogShown(true);
}

const pathName = usePathName();

async function submit() {
  isEmailError.value = !emailValidator(email.value);

  if (!isEmailError.value) {
    const dto = {
      email: email.value,
      emailLinkUrlPath: `${pathName}/reset-password`,
    };

    await forgetPassword(dto);

    close();
  }
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '../../styles/breakpoints.scss';

.forget-password-dialog {
  width: 480px;
  height: 421px;
  padding: 50px;
  border-radius: 10px;
  max-width: 100%;

  .forget-password-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 0;

    @include mobile {
      width: 22px;
      height: 22px;
    }
  }

  .forget-password-dialog-content {
    background-color: transparent;
  }

  .forget-password-dialog-title {
    margin: 0 0 20px;
    color: var(--primary-color);
    font-size: 26px;
    line-height: 24px;
    text-align: center;

    @include mobile {
      margin: 0 0 8px;
      font-size: 22px;
      line-height: 24px;
    }
  }

  .forget-password-dialog-subtitle {
    margin: 16px 0;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 20px;
    text-align: center;

    @include mobile {
      margin-top: 8px;
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .p-float-label {
    position: relative;
    margin-top: 12px;

    .password-text-hidden-switcher {
      position: absolute;
      top: 20px;
      right: 14px;
    }
  }

  .forget-password-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
    font-weight: 500;
    font-style: normal;
    font-size: 14px;
    line-height: 18px;

    @include mobile {
      margin-top: 16px;
    }
  }

  .open-account-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-top: 12px;
    font-size: 14px;
    line-height: 18px;

    svg {
      margin-right: 12px;
    }

    @include mobile {
      margin-top: 8px;
    }
  }

  .forget-password-link {
    float: right;
    margin-top: 20px;
    color: var(--text-primary);
    font-size: 12px;
    line-height: 16px;
  }

  @include mobile {
    height: auto;
    padding: 32px 20px;
  }
}
</style>
