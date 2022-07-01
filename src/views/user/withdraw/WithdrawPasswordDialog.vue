<template>
  <teleport to="#app">
    <div
      :style="{
        'z-index': zIndex,
      }"
      class="withdraw-password-dialog"
    >
      <transition name="scale">
        <div v-if="isShown" class="dialog">
          <CloseButton @click="onClickCancle" />

          <template v-if="curDialogType === DialogType.WithdrawalInformation">
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
          </template>

          <template v-else-if="curDialogType === DialogType.NewPassword">
            <div class="dialog-title">
              {{ title }}
            </div>
            <div class="dialog-define">
              {{ t('payment.withdraw.dialog.new_password_define') }}
            </div>
            <div class="input-group">
              <div class="p-input-filled">
                <span class="p-float-label">
                  <InputText v-model="newPasswordInput" />
                  <label>{{ t('payment.withdraw.dialog.new_password') }}</label>
                </span>
              </div>
              <div class="p-input-filled">
                <span class="p-float-label">
                  <InputText v-model="confirmNewPasswordInput" />
                  <label>
                    {{
                      t(
                        'payment.withdraw.dialog.confirm_new_password_placeholder'
                      )
                    }}
                  </label>
                </span>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="dialog-title">
              {{ title }}
            </div>

            <div
              v-show="curDialogType === DialogType.VerifyYourMobileNumber"
              class="otp-container"
            >
              <IconBase
                class="icon"
                :width="60"
                :height="60"
                viewBox="0 0 60 60"
              >
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
          </template>

          <Button
            class="confirm-button"
            :disabled="isDisabled"
            @click="onClickConfirm"
          >
            {{ confirmButtonText }}
          </Button>

          <u
            v-show="curDialogType === DialogType.WithdrawPassword"
            class="lost-password"
            @click="showNewPasswordDialog"
          >
            {{ t('payment.withdraw.dialog.lost_your_password') }}
          </u>

          <p
            v-show="curDialogType === DialogType.VerifyYourMobileNumber"
            class="otp-text"
          >
            {{ 'Didn’t receive the verification OTP?' }}
            <u>{{ 'Resend OTP' }}</u>
          </p>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs, ref, defineEmits, computed } from 'vue';
// import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import useWithdrawPasswordStore, {
  DialogType,
} from '@/modules/withdraw/infrastructure/store/withdrawPasswordStroe';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';
import CloseButton from '@/components/CloseButton.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconOTP from '@/components/icons/IconOTP.vue';
import {
  createPaymentApplicationForm,
  setupWithdrawPassword,
  withdrawalPasswordVerification,
} from '@/modules/withdraw/infrastructure/api/getPaymentMethodApi';
import { getOtpLimitation } from '@/modules/otp/infrastracture/otp.api';
import { OtpTiming } from '@/modules/otp/domain/otpTiming';

const { t } = useI18n();
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
const withdrawPasswordStore = useWithdrawPasswordStore();
const passwordInput = ref<string>('');
const cardHolderInput = ref<string>('');
const cardNumberInput = ref<string>('');
const newPasswordInput = ref<string>('');
const confirmNewPasswordInput = ref<string>('');
const errorMessage = ref<string>('');

const {
  title,
  isShown,
  logoUrl,
  // isWithdrawPasswordInputShown,
  // isInformationInputShown,
  // isLostPasswordShown,
  confirmButtonText,
  curDialogType,
  zIndex,
} = toRefs(withdrawPasswordStore);

const isDisabled = computed(() => {
  if (curDialogType.value === DialogType.WithdrawalInformation) {
    return !cardHolderInput.value || !cardNumberInput.value;
  }
  if (curDialogType.value === DialogType.NewPassword) {
    return !newPasswordInput.value || !confirmNewPasswordInput.value;
  }
  return !passwordInput.value;
});

const emit = defineEmits<{
  (e: 'showSuccessDialog'): void;
}>();

const resetValue = () => {
  passwordInput.value = '';
  cardHolderInput.value = '';
  cardNumberInput.value = '';
  newPasswordInput.value = '';
  confirmNewPasswordInput.value = '';
  errorMessage.value = '';
};

const verifyCallback = ref<() => Promise<unknown> | undefined>();

function onClickCancle() {
  withdrawPasswordStore.close();
  resetValue();
}

const setupWithdrawPasswordEvent = () => {
  withdrawPasswordStore.popUp({
    title: t('payment.withdraw.dialog.verify_your_mobile_number'),
    confirmButtonText: t('common.submit'),
    curDialogType: DialogType.VerifyYourMobileNumber,
  });

  getOtpLimitation(OtpTiming.FIRST_SET_PLAYER_WITHDRAWAL_PASSWORD);

  verifyCallback.value = () => {
    return setupWithdrawPassword({
      password: passwordInput.value,
      token: 
    })
  }

  // passwordInput.value = '';
};

const showNewPasswordDialog = () => {
  withdrawPasswordStore.popUp({
    title: t('payment.withdraw.dialog.new_password'),
    confirmButtonText: t('common.confirm'),
    curDialogType: DialogType.NewPassword,
  });

  passwordInput.value = '';
};

const verifyYourMobileNumberEvent = () => {
  // onClickCancle();
  verifyCallback.value?.();
};

const withdrawPasswordEvent = async () => {
  try {
    await withdrawalPasswordVerification(passwordInput.value);
    withdrawPasswordStore.withdrawalPassword = passwordInput.value;

    withdrawPasswordStore.popUp({
      confirmButtonText: t('payment.withdraw.withdraw'),
      curDialogType: DialogType.WithdrawalInformation,
    });
  } catch (err) {
    errorMessage.value = `${err}`;
    passwordInput.value = '';
    console.error(err);
  }
};

const withdrawalInformationEvent = async () => {
  const { amount, id: withdrawalType } = withdrawPasswordStore;
  try {
    // console.log(amount, withdrawalType);
    await createPaymentApplicationForm({
      amount,
      withdrawalType,
      withdrawalPassword: passwordInput.value,
    });

    onClickCancle();
    emit('showSuccessDialog');
  } catch (err) {
    console.error(err);
  }
};

const newPasswordEvent = () => {
  withdrawPasswordStore.popUp({
    title: t('payment.withdraw.dialog.setup_withdraw_password'),
    confirmButtonText: t('common.confirm'),
    curDialogType: DialogType.WithdrawPassword,
  });
  newPasswordInput.value = '';
  confirmNewPasswordInput.value = '';
};

const onClickConfirm = () => {
  switch (withdrawPasswordStore.curDialogType) {
    case DialogType.SetupWithdrawPassword:
      setupWithdrawPasswordEvent();
      break;
    case DialogType.VerifyYourMobileNumber:
      verifyYourMobileNumberEvent();
      break;
    case DialogType.WithdrawPassword:
      withdrawPasswordEvent();
      break;
    case DialogType.WithdrawalInformation:
      withdrawalInformationEvent();
      break;
    case DialogType.NewPassword:
      newPasswordEvent();
      break;
    default:
      break;
  }
};
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.withdraw-password-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  .dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    width: 480px;
    padding: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    background: var(--secondary-variants-color);
    box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);

    @include mobile {
      width: 320px;
      padding: 32px;
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

    .dialog-define {
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      color: #bdbdbd;
      margin-top: -10px;
      margin-bottom: 24px;
      @include mobile {
        font-size: 12px;
        line-height: 16px;
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

    .logo-img {
      display: flex;
      height: 24px;
      width: 100%;
      margin-bottom: 24px;

      @include mobile {
        height: 20px;
        margin-bottom: 16px;
      }

      img {
        // width: 100%;
        height: 100%;
        object-fit: cover;
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
  }
}
</style>
