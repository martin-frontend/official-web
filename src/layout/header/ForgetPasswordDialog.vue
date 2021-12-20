<template>
  <div
    v-show="forgetPasswordStore.isForgetPasswordDialogShown"
    class="forget-password-dialog-wrapper"
    @click="closeDialog"
  >
    <div class="forget-password-dialog" @click.stop>
      <CloseButton @click="closeDialog" />
      <h2 class="forget-password-dialog-title">{{ 'Lost your password?' }}</h2>
      <div class="forget-password-dialog-subtitle">
        {{
          'No worries, just enter the email registered to your account and we will send you a password reset link.'
        }}
      </div>
      <div class="p-input-filled">
        <span class="p-float-label p-input-icon-left">
          <IconBase
            :width="24"
            :height="24"
            viewBox="0 0 24 24"
            icon-color="#424242"
          >
            <IconMail />
          </IconBase>
          <InputText v-model="email" type="text" />
          <label>{{ 'Email address' }}</label>
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
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconChat from '@/components/icons/IconChat.vue';
import useForgetPasswordStore from '@/modules/user/Infrastructure/store/forgetPasswordStore';
import useSignUpStore from '@/modules/user/Infrastructure/store/signUpStore';
import { forgetPassword } from '@/modules/user/application/forgetPassword';
import CloseButton from '@/components/CloseButton.vue';

const forgetPasswordStore = useForgetPasswordStore();
const signUpStore = useSignUpStore();

function closeDialog() {
  forgetPasswordStore.setIsForgetPasswordDialogShown(false);
}

function openAccount() {
  forgetPasswordStore.$reset();
  signUpStore.setIsSignUpDialogShown(true);
}

const email = ref('');

function submit() {
  forgetPassword(email.value);
}
</script>

<style lang="scss" scoped>
@import '../../styles/breakpoints.scss';

.forget-password-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .forget-password-dialog {
    position: relative;
    flex-direction: row;
    width: 480px;
    height: 421px;
    margin: 0 20px;
    padding: 50px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    background: var(--secondary-variants-color);
    box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);

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
}
</style>
