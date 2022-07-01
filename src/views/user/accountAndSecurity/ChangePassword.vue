<template>
  <div>
    <div class="bonus-block-group">
      <Heading
        :title="t('account_and_security.change_password')"
        :define="t('account_and_security.change_password_page_define')"
      />
      <PasswordInputBox
        v-model="oldPassword"
        :label="t('account_and_security.old_password')"
        :error-message="t('account_and_security.old_password_error')"
        :is-error="isOldPasswordError"
      />
      <PasswordInputBox
        v-model="newPassword"
        :label="t('account_and_security.new_password')"
        :is-error="isNewPasswordError"
        :error-message="isNewPasswordErrorMessage"
      />
      <PasswordInputBox
        v-model="confrimPassword"
        :label="t('account_and_security.confirm_new_password')"
        :error-message="t('account_and_security.confirm_new_password_error')"
        :is-error="isConfrimPasswordError"
      />
      <Button
        class="update-button"
        color="primary"
        variant="block"
        :disabled="disabled"
        @click="updatePassword"
      >
        {{ t('common.update_password') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Heading from '@/components/Heading.vue';
import Button from '@/components/Button.vue';
import { modifyPlayerPassword } from '@/modules/changePassword/infrastructure/api/passwordApi';
import useToastStore from '@/core/shared/toastStore';
import { passwordValidator } from '@/modules/changePassword/application/changePassword';
import PasswordInputBox from '@/components/PasswordInputBox.vue';

// use i18n
const { t } = useI18n();
const oldPassword = ref('');
const newPassword = ref('');
const confrimPassword = ref('');
const isOldPasswordError = ref(false);
const isNewPasswordError = ref(false);
const isConfrimPasswordError = ref(false);
const isNewPasswordErrorMessage = ref('');

const toastStore = useToastStore();

const disabled = computed(
  () => !oldPassword.value || !newPassword.value || !confrimPassword.value
);

const confirmInputContentFormat = () => {
  isOldPasswordError.value = !oldPassword.value;

  isNewPasswordError.value =
    !passwordValidator(newPassword.value) ||
    !newPassword.value ||
    oldPassword.value === newPassword.value;

  isConfrimPasswordError.value =
    !(newPassword.value === confrimPassword.value) || !confrimPassword.value;

  if (oldPassword.value === newPassword.value) {
    isNewPasswordErrorMessage.value = t(
      'account_and_security.new_password_error2'
    );
  } else {
    isNewPasswordErrorMessage.value = `${t(
      'account_and_security.new_password_error1'
    )} (@#$%^&+=?!:~_-).`;
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
    await modifyPlayerPassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    toastStore.addToastMessage({
      toastDescription: 'Your password has been revised successfully.',
    });
  } catch (err) {
    isOldPasswordError.value = true;
    console.log(err);
  }
};
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
  text-align: left;
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
