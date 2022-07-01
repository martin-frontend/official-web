<template>
  <DialogPrimevue :visible="visible" :modal="true">
    <div class="confirmDialog">
      <div class="confirmDialog-top">
        <CloseButton @click="closeConfirmDialog" />
      </div>
      <div class="confirmDialog-main">
        <div class="confirmDialog-title">
          {{ t('personal_settings.verify_your_phone') }}
        </div>
        <div class="confirmDialog-icon">
          <IconBase class="icon" :width="60" :height="60" viewBox="0 0 60 60">
            <IconOTP />
          </IconBase>
        </div>
      </div>
      <div class="confirmDialog-define">
        <div>
          {{ t('personal_settings.otp_expired') }}{{ ' '
          }}{{ mins < 10 ? '0' + mins : mins }}{{ ':'
          }}{{ secs < 10 ? '0' + secs : secs }}
        </div>
        <div>
          {{ t('personal_settings.have_verified_mobile_number') }}
          {{ limitationOg?.times || 0 }}{{ '/'
          }}{{ limitationOg?.maxTimesByDay || 0 }}
          {{ t('personal_settings.this_day') }}
        </div>
      </div>
      <div class="confirmDialog-content">
        <InputBox
          v-model="otpCode"
          class="input"
          label="OTP code"
          :is-error="isOtpErr"
          :error-message="errorMessage"
        />
      </div>
      <div class="confirmDialog-action">
        <Button
          is-component="div"
          variant="block"
          size="medium"
          @click="sendOtpCode"
        >
          {{ t('common.submit') }}
        </Button>
      </div>
      <div class="confirmDialog-hints">
        <div class="confirmDialog-tip">
          {{ t('personal_settings.didnt_receive_otp') }}
        </div>
        <div class="confirmDialog-link" @click="getPhoneNumberOtpLimitation">
          {{ t('personal_settings.resend_otp') }}
        </div>
      </div>
    </div>
    <!--  -->
    <div v-if="displayCorrectDialog" class="confirmDialog">
      <div class="confirmDialog-top">
        <CloseButton @click="closeConfirmDialog" />
      </div>
      <div class="confirmDialog-main">
        <IconBase :width="80" :height="80" viewBox="0 0 60 60">
          <IconCheck />
        </IconBase>
        <div class="confirmDialog-title">
          {{ t('personal_settings.update_contant') }}
        </div>
      </div>
      <div class="confirmDialog-define">
        <div>{{ t('personal_settings.verify_phone_successfully') }}</div>
      </div>
      <div class="confirmDialog-action">
        <Button
          is-component="div"
          variant="rounded"
          size="huge"
          @click="closeConfirmDialog"
        >
          {{ t('common.confirm') }}
        </Button>
      </div>
    </div>
  </DialogPrimevue>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onUnmounted,
  ref,
  watchEffect,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { asyncComputed, useVModel } from '@vueuse/core';
import DialogPrimevue from 'primevue/dialog';
import getPhoneNumberOtpLimitation, {
  verifyPhoneNumber,
} from '@/modules/user/Infrastructure/api/verifyPhone.api';
import IconBase from '@/components/icons/IconBase.vue';
import IconOTP from '@/components/icons/IconOTP.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';
import CloseButton from '@/components/CloseButton.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

export interface VerifyPhoneDialogProps {
  visible: boolean;
  submit?: (code: string) => void;
}

const props = defineProps<VerifyPhoneDialogProps>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const visible = useVModel(props, 'visible', emit);
const { t } = useI18n();

const otpCode = ref('');
const errorMessage = ref('');
const isOtpErr = ref(false);
const displayCorrectDialog = ref(false);

const limitationOg = asyncComputed(async () => {
  if (!visible.value) {
    return null;
  }

  return getPhoneNumberOtpLimitation();
});
const expiresIn = computed(() =>
  visible.value && limitationOg.value ? limitationOg.value.expiresIn : null
);
const expirationCounter = ref<number>(0);
const mins = ref<number>(0);
const secs = ref<number>(0);

watchEffect((onInvalidate) => {
  if (typeof expiresIn.value !== 'number') {
    return;
  }

  expirationCounter.value = expiresIn.value;

  const interval = window.setInterval(() => {
    if (expirationCounter.value) {
      mins.value = Math.floor(expirationCounter.value / 60) % 60;
      secs.value = Math.floor(expirationCounter.value % 60);
    }
    expirationCounter.value -= 1;
    if (expirationCounter.value === 0) {
      mins.value = 0;
      secs.value = 0;
      window.clearInterval(interval);
    }
  }, 1000);

  onInvalidate(() => {
    window.clearInterval(interval);
  });
});

function closeConfirmDialog() {
  emit('close');
  otpCode.value = '';
  errorMessage.value = '';
  isOtpErr.value = false;
}

async function sendOtpCode() {
  isOtpErr.value = false;

  if (typeof props.submit === 'function') {
    try {
      await props.submit(otpCode.value);
    } catch (e) {
      isOtpErr.value = true;
      errorMessage.value = e as string;
    }
    return;
  }

  verifyPhoneNumber(otpCode.value)
    .then(() => {
      displayCorrectDialog.value = true;
    })
    .catch(() => {
      isOtpErr.value = true;
      errorMessage.value = t('personal_settings.incarrect_otp');
    });
}

onUnmounted(() => {
  closeConfirmDialog();
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.confirmDialog {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 480px;
  padding: 40px;
  padding-top: 45px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  background: var(--secondary-variants-color);
  transform: translate(-50%, -50%);

  .confirmDialog-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .confirmDialog-title + .confirmDialog-icon {
    margin-top: 22px;
  }

  .confirmDialog-title {
    margin-top: 16px;
    color: var(--primary-color);
    font-size: 28px;
    line-height: 32px;
  }

  .confirmDialog-define {
    width: 100%;
    margin-top: 16px;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .confirmDialog-content {
    margin-top: 24px;
  }

  .confirmDialog-action {
    margin-top: 16px;
  }

  .confirmDialog-hints {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    font-size: 14px;
    line-height: 12px;
  }

  .confirmDialog-tip {
    color: var(--text-primary);
  }

  .confirmDialog-link {
    margin-left: 8px;
    color: var(--success-color);
    text-decoration: underline;
    cursor: pointer;
  }

  @include mobile {
    width: 320px;
    padding: 32px;

    .confirmDialog-title {
      font-size: 16px;
      line-height: 20px;
    }

    .confirmDialog-hints {
      flex-direction: column;
      font-size: 12px;
      line-height: 16px;
    }

    .confirmDialog-tip {
      margin-left: 0;
    }
  }
}

.isCorrectDialog {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 480px;
  padding: 40px;
  padding-top: 45px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  background: var(--secondary-variants-color);
  transform: translate(-50%, -50%);

  .isCorrectDialog-main {
    width: 100%;
    text-align: center;
  }

  .isCorrectDialog-title {
    margin-top: 16px;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 26px;
    line-height: 28px;
  }

  .isCorrectDialog-content {
    width: 100%;
    margin-top: 16px;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .isCorrectDialog-action {
    margin-top: 32px;
  }
}
</style>

<i18n locale="en" src="@/core/locales/en.json"></i18n>
