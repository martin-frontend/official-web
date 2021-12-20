<template>
  <Container>
    <h1 class="page-title">{{ 'Reset Password' }}</h1>
    <div class="page-subtitle">
      {{ 'Ok,let’s set you a new password' }}
    </div>
    <form class="p-input-filled">
      <span class="p-float-label">
        <InputText
          v-model="confirmPassword"
          :type="isPasswordShown ? 'text' : 'password'"
        />
        <label>{{ 'New password' }}</label>
        <div class="password-text-hidden-switcher" @click="togglePasswordShown">
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
      <span class="p-float-label">
        <InputText
          v-model="password"
          :type="isConfirmPasswordShown ? 'text' : 'password'"
        />
        <label>{{ 'Re-enter new password' }}</label>
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
            <IconShowInfo v-if="isConfirmPasswordShown" />
            <IconHideInfo v-else />
          </IconBase>
        </div>
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRoute, useRouter } from 'vue-router';
import IconBase from '@/components/icons/IconBase.vue';
import IconHideInfo from '@/components/icons/IconHideInfo.vue';
import IconShowInfo from '@/components/icons/IconShowInfo.vue';
import resetPassword from '@/modules/user/application/resetPassword';
import Container from '@/layout/Container.vue';

const password = ref('');
const confirmPassword = ref('');

const isPasswordShown = ref(false);
function togglePasswordShown() {
  isPasswordShown.value = !isPasswordShown.value;
}
const isConfirmPasswordShown = ref(false);
function toggleConfirmPasswordShown() {
  isConfirmPasswordShown.value = !isConfirmPasswordShown.value;
}

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
