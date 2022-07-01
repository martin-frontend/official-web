<template>
  <Container>
    <h1 class="page-title">{{ 'Reset Password' }}</h1>
    <div class="page-subtitle">
      {{ 'Ok,let’s set you a new password' }}
    </div>
    <form class="p-input-filled">
      <span class="p-float-label">
        <PasswordInputBox v-model="confirmPassword" label="New password" />
      </span>
      <span class="p-float-label">
        <PasswordInputBox v-model="password" label="Re-enter new password" />
      </span>
      <Button
        class="primary-linear-btn submit-btn"
        :disabled="isSubmitDisabled"
        @click="submitResetPassword"
      >
        {{ 'CONFIRM' }}
      </Button>
    </form>
  </Container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Button from 'primevue/button';
import { useRoute, useRouter } from 'vue-router';
import resetPassword from '@/modules/user/application/resetPassword';
import Container from '@/layout/Container.vue';
import PasswordInputBox from '@/components/PasswordInputBox.vue';

const password = ref('');
const confirmPassword = ref('');

const route = useRoute();

const isSubmitDisabled = computed(() => {
  return (
    password.value &&
    confirmPassword.value &&
    route.query.token &&
    password.value !== confirmPassword.value
  );
});

const router = useRouter();
function submitResetPassword() {
  if (isSubmitDisabled.value) {
    return;
  }
  const token = route.query.token as string;
  resetPassword(password.value, token, router);
}
</script>

<style lang="scss" scoped>
form {
  width: 500px;

  .p-float-label {
    margin: 10px 0;

    .password-text-hidden-switcher {
      position: absolute;
      top: 20px;
      right: 14px;
    }
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
