<template>
  <Container>
    <div class="bonus-block-group">
      <Heading
        :title="t('account_and_security.change_withdraw_password')"
        :define="t('account_and_security.change_withdraw_password_define')"
      />
      <InputBox
        v-model="oldPassword"
        :label="t('account_and_security.old_password')"
        :type="isOldPasswordShown ? 'text' : 'password'"
        :error-message="t('account_and_security.withdraw_old_password_error')"
        :is-error="isOldPasswordError"
        :max-length="6"
      >
        <template #icon>
          <div
            class="password-text-hidden-switcher"
            @click="toggleOldPasswordShown"
          >
            <IconBase
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="black"
            >
              <IconShowInfo v-if="isOldPasswordShown" />
              <IconHideInfo v-else />
            </IconBase>
          </div>
        </template>
      </InputBox>
      <InputBox
        v-model="newPassword"
        :label="t('account_and_security.new_password')"
        :type="isNewPasswordShown ? 'text' : 'password'"
        :is-error="isNewPasswordError"
        :error-message="isNewPasswordErrorMessage"
        :max-length="6"
      >
        <template #icon>
          <div
            class="password-text-hidden-switcher"
            @click="toggleNewPasswordShown"
          >
            <IconBase
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="black"
            >
              <IconShowInfo v-if="isNewPasswordShown" />
              <IconHideInfo v-else />
            </IconBase>
          </div>
        </template>
      </InputBox>
      <InputBox
        v-model="confrimPassword"
        :label="t('account_and_security.confirm_new_password')"
        :type="isConfrimPasswordShown ? 'text' : 'password'"
        :error-message="t('account_and_security.confirm_new_password_error')"
        :is-error="isConfrimPasswordError"
        :max-length="6"
      >
        <template #icon>
          <div
            class="password-text-hidden-switcher"
            @click="toggleConfirmPasswordShown"
          >
            <IconBase
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="black"
            >
              <IconShowInfo v-if="isConfrimPasswordShown" />
              <IconHideInfo v-else />
            </IconBase>
          </div>
        </template>
      </InputBox>
      <Button
        class="update-button"
        color="primary"
        variant="block"
        @click="updatePassword"
      >
        {{ t('common.update_password') }}
      </Button>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconHideInfo from '@/components/icons/IconHideInfo.vue';
import IconShowInfo from '@/components/icons/IconShowInfo.vue';
import Button from '@/components/Button.vue';
import InputBox from '@/components/InputBox.vue';
import { modifyWithdrawalPassword } from '@/modules/changePassword/infrastructure/api/passwordApi';
import useToastStore, { defaultToast } from '@/core/shared/toastStore';

// use i18n
const { t } = useI18n();
// Aa1123456#
const oldPassword = ref('');
const newPassword = ref('');
const confrimPassword = ref('');
const isOldPasswordShown = ref(false);
const isNewPasswordShown = ref(false);
const isConfrimPasswordShown = ref(false);
const isOldPasswordError = ref(false);
const isNewPasswordError = ref(false);
const isConfrimPasswordError = ref(false);
const isNewPasswordErrorMessage = ref('');

const toastStore = useToastStore();

const toggleOldPasswordShown = () => {
  isOldPasswordShown.value = !isOldPasswordShown.value;
};

const toggleNewPasswordShown = () => {
  isNewPasswordShown.value = !isNewPasswordShown.value;
};

const toggleConfirmPasswordShown = () => {
  isConfrimPasswordShown.value = !isConfrimPasswordShown.value;
};

const validator = (value: string) => {
  const regex = /(?=.*\d)[\d]{6,}/;
  return regex.test(value);
};

const confirmInputContentFormat = () => {
  isOldPasswordError.value = !oldPassword.value;

  isNewPasswordError.value =
    !validator(newPassword.value) ||
    !newPassword.value ||
    oldPassword.value === newPassword.value;

  isConfrimPasswordError.value =
    !(newPassword.value === confrimPassword.value) || !confrimPassword.value;

  if (oldPassword.value === newPassword.value) {
    isNewPasswordErrorMessage.value = t(
      'account_and_security.withdraw_new_password_error2'
    );
  } else {
    isNewPasswordErrorMessage.value = t(
      'account_and_security.withdraw_new_password_error1'
    );
  }

  if (
    isOldPasswordError.value ||
    isNewPasswordError.value ||
    isConfrimPasswordError.value
  ) {
    return false;
  }
  return true;
};

const updatePassword = async () => {
  const isOK = confirmInputContentFormat();
  if (!isOK) {
    return;
  }

  try {
    await modifyWithdrawalPassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    const toast = { ...defaultToast };
    toast.toastDescription = 'Your password has been revised successfully.';
    toast.color = 'success';
    toastStore.addToastMessage(toast);
  } catch (err) {
    isOldPasswordError.value = true;
    console.log(err);
  }
};
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.outlineCard {
  overflow: auto;
}
.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}

.password-text-hidden-switcher {
  position: absolute;
  top: 16px;
  right: 14px;
}

.p-input-filled {
  max-width: 500px;
}

.p-input-filled + .p-input-filled {
  margin-top: 10px;
}

.update-button {
  max-width: 500px;
  margin-top: 16px;
}
</style>
