<template>
  <CommonDialog @close="closeDialog">
    <div class="signUp-dialog" @mousedown="onClickDialog">
      <div class="signUp-dialog-content p-input-filled">
        <div class="signUp-logo">
          <img src="@/assets/images/sign-up-text-logo.png" />
        </div>
        <div class="signUp-steps-wrapper">
          <SignUpDialogSteps :total-steps="3" :current-step="step" />
        </div>
        <!-- STEP 1 -->
        <div v-if="step === 1" class="signUp-inputs-group">
          <span class="p-float-label">
            <InputBox
              v-model="form.email"
              :label="t('sign_up.email_address')"
              :error-message="t('account_and_security.email_password_error')"
              :is-error="isFormError.email"
            />
          </span>

          <div class="phone-group">
            <span class="p-float-label phone-prefix">
              <Dropdown
                v-model="form.phoneNumberPrefix"
                :options="[
                  { label: '+886', value: '+886' },
                  { label: '+86', value: '+86' },
                ]"
                option-label="label"
                option-value="value"
              />
              <label>{{ t('sign_up.prefix') }}</label>
            </span>
            <span class="p-float-label phone-number">
              <InputBox
                v-model="form.phoneNumberMain"
                :error-message="t('form_message.phnoe_number')"
                :is-error="isFormError.phoneNumberMain"
                :label="t('sign_up.mobile')"
              />
            </span>
          </div>

          <span class="p-float-label">
            <PasswordInputBox
              v-model="form.password"
              :label="t('sign_up.password')"
              :error-message="`${t(
                'account_and_security.new_password_error1'
              )} (@#$%^&+=?!:~_-).`"
              :is-error="isFormError.password"
            />
          </span>

          <div class="accept-content">
            <Checkbox v-model="form.privacyPolicyAccepted" :binary="true" />
            <div class="accept-content-text">
              {{
                'By checking this box I accept the Terms and Conditions, Privacy policy and confirm that I am over 18 years of age. *'
              }}
            </div>
          </div>
        </div>
        <!-- STEP 2 -->
        <div v-if="step === 2" class="signUp-inputs-group">
          <span class="p-float-label">
            <InputBox
              v-model="form.firstname"
              :label="t('sign_up.first_name')"
              type="text"
              :error-message="t('form_message.required')"
              :is-error="isFormError.firstname"
            />
          </span>
          <span class="p-float-label">
            <InputBox
              v-model="form.lastname"
              :label="t('sign_up.last_name')"
              type="text"
              :error-message="t('form_message.required')"
              :is-error="isFormError.lastname"
            />
          </span>
          <div class="birth-title">{{ t('sign_up.date_of_birth') }}</div>
          <div class="birth-select-group">
            <span class="p-float-label">
              <Dropdown
                v-model="form.yearOfBirth"
                :options="birthYearOptions"
                option-label="label"
                option-value="value"
              />
              <label>{{ 'YYYY' }}</label>
            </span>
            <span class="p-float-label">
              <Dropdown
                v-model="form.monthOfBirth"
                :options="birthMonthOptions"
                option-label="label"
                option-value="value"
              />
              <label>{{ 'MM' }}</label>
            </span>
            <span class="p-float-label">
              <Dropdown
                v-model="form.dayOfBirth"
                :options="birthDayOptions"
                option-label="label"
                option-value="value"
              />
              <label>{{ 'DD' }}</label>
            </span>
          </div>
          <div class="gender-wrapper">
            <div
              class="gender-block"
              :class="{ 'active-gender': form.gender === 'M' }"
              @click="setGender('M')"
            >
              <IconBase
                class="gender-icon"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#424242"
              >
                <IconMale />
              </IconBase>
              {{ 'Male' }}
            </div>
            <div
              class="gender-block"
              :class="{ 'active-gender': form.gender === 'F' }"
              @click="setGender('F')"
            >
              <IconBase
                class="gender-icon"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#424242"
              >
                <IconFemale />
              </IconBase>
              {{ 'Female' }}
            </div>
          </div>
          <span class="p-float-label p-input-icon-left promo-code-input">
            <IconBase
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="#424242"
              class="promo-code-icon"
            >
              <IconPriceTag />
            </IconBase>
            <InputText v-model="form.promoCode" type="text" />
            <label>{{ t('sign_up.promo_code') }}</label>
          </span>
        </div>
        <!-- STEP 3 -->
        <div v-if="step === 3" class="signUp-inputs-group">
          <span class="p-float-label">
            <Dropdown v-model="form.country" :options="['The U.K', 'Taiwan']" />
            <label>{{ t('sign_up.country') }}</label>
          </span>

          <div class="city-and-currency">
            <span class="p-float-label">
              <InputBox
                v-model="form.city"
                :label="t('sign_up.city')"
                :error-message="t('form_message.required')"
                :is-error="isFormError.city"
              />
            </span>

            <!-- <span class="p-float-label">
                <Dropdown
                  v-model="currency"
                  :options="currencyStore.currencyOptions"
                  option-label="code"
                  option-value="code"
                />
                <label>{{ 'Currency' }}</label>
              </span> -->
          </div>

          <span class="p-float-label">
            <InputBox
              v-model="form.address"
              :label="t('sign_up.address')"
              :error-message="t('form_message.required')"
              :is-error="isFormError.address"
            />
          </span>

          <span class="p-float-label">
            <InputBox
              v-model="form.zipCode"
              :label="t('sign_up.zipcode')"
              :error-message="t('form_message.required')"
              :is-error="isFormError.zipCode"
            />
          </span>

          <div class="accept-content">
            <Checkbox v-model="form.notificationEnabled" :binary="true" />
            <div class="accept-content-text">
              {{ 'Don’t send me bouns offer, news, or service updates.' }}
            </div>
          </div>
        </div>
        <div class="signUp-dialog-buttons">
          <div v-if="step !== 1" class="back-button" @click="clickBack">
            <IconBase
              :width="16"
              :height="16"
              viewBox="0 0 16 16"
              icon-color="#fff"
            >
              <IconBackArrow />
            </IconBase>
          </div>
          <Button
            :disabled="!form.privacyPolicyAccepted"
            variant="block"
            size="small"
            @click="clickContinue"
          >
            {{ t('common.continue') }}
          </Button>
        </div>
      </div>
      <div class="signUp-banner">
        <picture>
          <source
            srcset="@/assets/images/sign-up-banner-phones.jpg"
            media="(max-width: 767px)"
          />
          <source
            srcset="@/assets/images/sign-up-banner-phones.jpg"
            media="(max-width: 359px)"
          />
          <img src="@/assets/images/sign-up-banner.jpg" />
        </picture>
      </div>
    </div>
  </CommonDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from '@/components/Button.vue';
import SignUpDialogSteps from './SignUpDialogSteps.vue';
import IconBase from '@/components/icons/IconBase.vue';
import {
  getMonthsList,
  getDaysList,
  getDateTimestamp,
  getYearsList,
} from '@/libs/date';
import IconFemale from '@/components/icons/IconFemale.vue';
import IconMale from '@/components/icons/IconMale.vue';
import IconPriceTag from '@/components/icons/IconPriceTag.vue';
import IconBackArrow from '@/components/icons/IconBackArrow.vue';
// import useCurrencyStore from '@/modules/currency/infrastructure/store/currencyStore';
import register, { useRegisterForm } from '@/modules/user/application/register';
import { checkUserStatus } from '@/modules/user/application/user';
import CommonDialog from '@/layout/CommonDialog.vue';
import PasswordInputBox from '@/components/PasswordInputBox.vue';
import InputBox from '@/components/InputBox.vue';
import { closeSignUpDialog } from '@/modules/user/application/login';
import { usePathName } from '@/core/pathName/usePathName';

// use i18n
const { t } = useI18n();

// control open or close sign up dialog

// const currencyStore = useCurrencyStore();

const lastTarget = ref<Element | null>(null);

function onClickDialog(event: MouseEvent) {
  lastTarget.value = event.target as Element;
}

// step control
const step = ref(1);

const { form, isFormError, formValidator } = useRegisterForm();

const birthYearOptions = ref(getYearsList(18));
const birthMonthOptions = ref(getMonthsList());
const birthDayOptions = computed(() =>
  getDaysList(form.yearOfBirth, form.monthOfBirth)
);

function closeDialog() {
  step.value = 1;

  form.email = '';
  form.phoneNumberPrefix = '+886';
  form.phoneNumberMain = '';
  form.password = '';
  form.privacyPolicyAccepted = false;
  form.firstname = '';
  form.lastname = '';
  form.yearOfBirth = new Date().getFullYear() - 18;
  form.monthOfBirth = 1;
  form.dayOfBirth = 1;
  form.gender = 'M';
  form.promoCode = '';
  form.country = 'The U.K';
  form.city = '';
  form.address = '';
  form.zipCode = '';
  form.notificationEnabled = false;

  birthYearOptions.value = getYearsList(18);

  birthMonthOptions.value = getMonthsList();

  closeSignUpDialog();
}

function setGender(value: 'M' | 'F') {
  form.gender = value;
}

const pathName = usePathName();

async function handleRegister() {
  const {
    phoneNumberPrefix,
    phoneNumberMain,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth,
    ...arg
  } = form;

  const result = await register({
    ...arg,
    phoneNumber: `${phoneNumberPrefix}${phoneNumberMain}`,
    birthday: getDateTimestamp(yearOfBirth, monthOfBirth, dayOfBirth),
    emailLinkUrlPath: `${pathName}/email-verification`,
  });

  if (result) {
    checkUserStatus();
    closeDialog();
  }
}

function clickContinue() {
  if (step.value === 1) {
    if (formValidator(step.value)) {
      step.value = 2;
    }

    return;
  }
  if (step.value === 2) {
    // currencyStore.updateCurrencyOptionsIfEmpty();
    if (formValidator(step.value)) {
      step.value = 3;
    }

    return;
  }
  if (step.value === 3) {
    if (formValidator(step.value)) {
      handleRegister();
    }
  }
}

function clickBack() {
  if (step.value === 2) {
    step.value = 1;
    return;
  }
  if (step.value === 3) {
    step.value = 2;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.signUp-dialog {
  display: flex;
  width: 896px;
  .signUp-dialog-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(66, 66, 66, 0.8);
    cursor: pointer;
  }
  .signUp-dialog-content {
    box-sizing: border-box;
    width: 496px;
    padding: 56px;
  }
  .signUp-logo {
    width: 230px;
    height: 60px;
    margin: 0 auto;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .signUp-steps-wrapper {
    margin: 24px 0;
  }
  .signUp-inputs-group {
    flex-shrink: 0;
    .p-float-label {
      margin: 16px 0 0;

      > .p-component {
        width: 100%;
      }
    }

    // step1
    .phone-group {
      display: flex;

      .phone-prefix {
        width: 100px;
        margin-right: 8px;

        ::v-deep(.p-dropdown-trigger) {
          width: 25px;
        }
      }

      .phone-number {
        flex-grow: 1;
        width: auto;
      }
    }
    // step2
    .birth-title {
      margin-top: 16px;
      font-size: 16px;
      line-height: 20px;
      color: var(--text-primary);
    }
    .birth-select-group {
      display: flex;
      gap: 8px;

      .p-float-label {
        flex: 1;

        ::v-deep(.p-dropdown-trigger) {
          width: 25px;
        }
      }
    }

    .gender-wrapper {
      display: flex;
      gap: 8px;
      margin-top: 16px;

      .gender-block {
        display: flex;
        flex-grow: 1;
        align-items: center;
        box-sizing: border-box;
        height: 56px;
        border: 1px solid #fff;
        border-radius: 5px;
        background: #f5f5f5;
        color: #424242;
        font-size: 16px;
        line-height: 20px;
        cursor: pointer;

        .gender-icon {
          margin-right: 12px;
          margin-left: 16px;
        }

        &.active-gender {
          border: 1px solid var(--primary-color);
          background: #fff4cb;
          box-shadow: 0 0 0 2px rgba(255, 226, 116, 0.4);
        }
      }
    }
    .promo-code-input {
      width: 100%;
    }
    .city-and-currency {
      display: flex;
      gap: 8px;
      .p-float-label {
        flex-grow: 1;
        width: 0;
      }
    }
  }
  .accept-content {
    display: flex;
    margin-top: 16px;

    ::v-deep(.p-checkbox-box.p-highlight) {
      border-color: var(--sucess-color);
      background: var(--sucess-color);
    }

    .accept-content-text {
      margin-left: 8px;
      color: #9698a1;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .signUp-dialog-buttons {
    display: flex;
    margin-top: 24px;
  }
  .signUp-banner {
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .back-button {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    border: 1px solid #9698a1;
    border-radius: 5px;
    cursor: pointer;
  }

  @include mobile {
    width: 320px;
    flex-direction: column-reverse;
    .signUp-banner {
      width: 100%;
      height: 150px;
    }
    .signUp-steps-wrapper {
      height: 12px;
      margin: 5px 0 16px 0;
    }
    .signUp-dialog-content {
      width: 100%;
      padding: 10px 20px 20px;
    }
    .signUp-inputs-group {
      .p-float-label {
        margin: 8px 0 0;
      }
    }
    .accept-content {
      .accept-content-text {
        font-size: 12px;
        line-height: 16px;
      }
    }
    .birth-title {
      font-size: 12px;
      line-height: 16px;
    }
    .back-button {
      margin-right: 8px;
    }
  }
}
.password-text-hidden-switcher {
  position: absolute;
  top: 15px;
  right: 14px;
}
</style>

<i18n locale="en" src="@/core/locales/en.json"></i18n>
