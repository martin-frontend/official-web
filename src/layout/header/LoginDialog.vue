<template>
  <div
    v-show="loginStore.isLoginDialogShown"
    class="login-dialog-wrapper"
    @mousedown="closeDialog"
  >
    <div class="login-dialog" @mousedown.stop>
      <Button
        class="
          primary-linear-btn
          p-button-icon-only p-button-rounded
          login-close-button
        "
        @click="closeDialog"
      >
        <IconBase
          :width="12"
          :height="12"
          viewBox="9 9 12 12"
          icon-color="#171927"
        >
          <IconClose />
        </IconBase>
      </Button>
      <h2 class="login-dialog-title">{{ 'Welcome back' }}</h2>
      <div class="p-input-filled">
        <span class="p-float-label">
          <InputText v-model="loginStore.email" type="text" />
          <label>{{ 'Email address' }}</label>
        </span>
        <span class="p-float-label">
          <InputText
            v-model="loginStore.password"
            :type="isPasswordShown ? 'text' : 'password'"
            @keyup.enter="clickLogin"
          />
          <label>{{ 'Password' }}</label>
          <div
            class="password-text-hidden-switcher"
            @click="togglePasswordShown"
          >
            <IconBase
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="black"
            >
              <IconShowInfo v-if="isPasswordShown" />
              <IconHideInfo v-else />
            </IconBase>
          </div>
        </span>
      </div>
      <Button class="primary-linear-btn login-btn" @click="clickLogin">
        {{ 'LOG IN' }}
      </Button>
      <Button
        class="p-button-outlined open-account-btn"
        @click="openSignUpDialog"
      >
        {{ 'OPEN ACCOUNT' }}
      </Button>
      <span class="forget-password-link" href="#" @click="openForgetPassword">
        {{ 'Lost your password?' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconHideInfo from '@/components/icons/IconHideInfo.vue';
import IconShowInfo from '@/components/icons/IconShowInfo.vue';
import useLoginStore from '@/modules/user/Infrastructure/store/loginStore';
import {
  closeLoginDialog,
  login,
  openSignUpDialog,
  openForgetPasswordDialog,
} from '@/modules/user/application/login';

const loginStore = useLoginStore();

function closeDialog() {
  closeLoginDialog();
}

function clickLogin() {
  login();
}

function openForgetPassword() {
  openForgetPasswordDialog();
}

const isPasswordShown = ref(false);

function togglePasswordShown() {
  isPasswordShown.value = !isPasswordShown.value;
}
</script>

<style lang="scss" scoped>
@import '../../styles/breakpoints.scss';

.login-dialog-wrapper {
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

  .login-dialog {
    position: relative;
    flex-direction: row;
    width: 480px;
    height: 421px;
    margin: 20px;
    padding: 50px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    background: #323232;
    box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);

    .login-close-button {
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

    .login-dialog-content {
      background-color: transparent;
    }

    .login-dialog-title {
      margin: 0 0 20px;
      color: var(--primary-color);
      font-size: 26px;
      line-height: 24px;
      text-align: center;
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

    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 24px;
      font-weight: 500;
      font-style: normal;
      font-size: 14px;
      line-height: 18px;
    }

    .open-account-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 12px;
      font-size: 14px;
      line-height: 18px;
    }

    .forget-password-link {
      float: right;
      margin-top: 20px;
      color: var(--text-primary);
      font-size: 12px;
      line-height: 16px;
      cursor: pointer;
    }

    @include mobile {
      padding: 50px 20px;
    }
  }
}
</style>
