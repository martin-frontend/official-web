<template>
  <DialogPrimevue :modal="true">
    <div class="signUp-dialog-wrapper">
      <div class="signUp-dialog" @mousedown="onClickDialog">
        <div class="signUp-dialog-close" @click="closeDialog">
          <IconBase
            :width="30"
            :height="30"
            viewBox="0 0 30 30"
            icon-color="#fff"
          >
            <IconClose />
          </IconBase>
        </div>
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
              <InputText v-model="email" type="text" />
              <label>{{ t('sign_up.email_address') }}</label>
            </span>

            <div class="phone-group">
              <span class="p-float-label phone-prefix">
                <Dropdown
                  v-model="phoneNumberPrefix"
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
                <InputText v-model="phoneNumberMain" type="text" />
                <label>{{ t('sign_up.mobile') }}</label>
              </span>
            </div>

            <span class="p-float-label">
              <InputText
                v-model="password"
                :type="isPasswordShown ? 'text' : 'password'"
              />
              <label>{{ t('sign_up.password') }}</label>
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

            <div class="accept-content">
              <Checkbox v-model="privacyPolicyAccepted" :binary="true" />
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
              <InputText v-model="firstname" type="text" />
              <label>{{ t('sign_up.first_name') }}</label>
            </span>
            <span class="p-float-label">
              <InputText v-model="lastname" type="text" />
              <label>{{ t('sign_up.last_name') }}</label>
            </span>
            <div class="birth-title">{{ t('sign_up.date_of_birth') }}</div>
            <div class="birth-select-group">
              <span class="p-float-label">
                <Dropdown
                  v-model="yearOfBirth"
                  :options="birthYearOptions"
                  option-label="label"
                  option-value="value"
                />
                <label>{{ 'YYYY' }}</label>
              </span>
              <span class="p-float-label">
                <Dropdown
                  v-model="monthOfBirth"
                  :options="birthMonthOptions"
                  option-label="label"
                  option-value="value"
                />
                <label>{{ 'MM' }}</label>
              </span>
              <span class="p-float-label">
                <Dropdown
                  v-model="dayOfBirth"
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
                :class="{ 'active-gender': gender === 'M' }"
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
                :class="{ 'active-gender': gender === 'F' }"
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
              <InputText v-model="promoCode" type="text" />
              <label>{{ t('sign_up.promo_code') }}</label>
            </span>
          </div>
          <!-- STEP 3 -->
          <div v-if="step === 3" class="signUp-inputs-group">
            <span class="p-float-label">
              <Dropdown v-model="country" :options="['The U.K', 'Taiwan']" />
              <label>{{ t('sign_up.country') }}</label>
            </span>

            <div class="city-and-currency">
              <span class="p-float-label">
                <InputText v-model="city" />
                <label>{{ t('sign_up.city') }}</label>
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
              <InputText v-model="address" />
              <label>{{ t('sign_up.address') }}</label>
            </span>

            <span class="p-float-label">
              <InputText v-model="zipCode" />
              <label>{{ t('sign_up.zipcode') }}</label>
            </span>

            <div class="accept-content">
              <Checkbox v-model="notificationEnabled" :binary="true" />
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
            <Button variant="block" size="small" @click="clickContinue">
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
    </div>
  </DialogPrimevue>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
// import Button from 'primevue/button';
import Button from '@/components/Button.vue';
import SignUpDialogSteps from './SignUpDialogSteps.vue';
import IconHideInfo from '@/components/icons/IconHideInfo.vue';
import IconShowInfo from '@/components/icons/IconShowInfo.vue';
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
import IconClose from '@/components/icons/IconClose.vue';
import useCurrencyStore from '@/modules/currency/infrastructure/store/currencyStore';
import register from '@/modules/user/application/register';
import { checkUserStatus } from '@/modules/user/application/user';

// use i18n
const { t } = useI18n();

// control open or close sign up dialog

const currencyStore = useCurrencyStore();

const lastTarget = ref<Element | null>(null);

function onClickDialog(event: MouseEvent) {
  lastTarget.value = event.target as Element;
}

// password text show or hide
const isPasswordShown = ref(false);

function togglePasswordShown() {
  isPasswordShown.value = !isPasswordShown.value;
}

// form data
const address = ref('');
const city = ref('');
const country = ref('The U.K');
// const currency = ref('');
const email = ref('');
const firstname = ref('');
const gender = ref<'M' | 'F'>('M');
const lastname = ref('');
const password = ref('');
const promoCode = ref('');
const zipCode = ref('');
const dayOfBirth = ref(1);
const monthOfBirth = ref(1);
const yearOfBirth = ref(new Date().getFullYear() - 18);
const phoneNumberPrefix = ref('');
const phoneNumberMain = ref('');
const notificationEnabled = ref(false);
const privacyPolicyAccepted = ref(false);

const birthYearOptions = ref(getYearsList(18));
const birthMonthOptions = ref(getMonthsList());
const birthDayOptions = computed(() =>
  getDaysList(yearOfBirth.value, monthOfBirth.value)
);

function setGender(value: 'M' | 'F') {
  gender.value = value;
}

// step control
const step = ref(1);
const emit = defineEmits<{
  (e: 'close'): void;
}>();
function closeDialog() {
  address.value = '';
  city.value = '';
  country.value = 'The U.K';
  email.value = '';
  firstname.value = '';
  gender.value = 'M';
  lastname.value = '';
  password.value = '';
  promoCode.value = '';
  zipCode.value = '';
  dayOfBirth.value = 1;
  monthOfBirth.value = 1;
  yearOfBirth.value = new Date().getFullYear() - 18;
  phoneNumberPrefix.value = '';
  phoneNumberMain.value = '';
  notificationEnabled.value = false;
  privacyPolicyAccepted.value = false;
  birthYearOptions.value = getYearsList(18);
  birthMonthOptions.value = getMonthsList();
  step.value = 1;
  emit('close');
}
async function handleRegister() {
  const result = await register({
    address: address.value,
    birthday: getDateTimestamp(
      yearOfBirth.value,
      monthOfBirth.value,
      dayOfBirth.value
    ),
    city: city.value,
    country: country.value,
    // currency: currency.value,
    email: email.value,
    firstname: firstname.value,
    gender: gender.value,
    lastname: lastname.value,
    notificationEnabled: notificationEnabled.value,
    password: password.value,
    privacyPolicyAccepted: privacyPolicyAccepted.value,
    promoCode: promoCode.value,
    phoneNumber: `${phoneNumberPrefix.value}${phoneNumberMain.value}`,
    zipCode: zipCode.value,
  });

  if (result) {
    checkUserStatus();
    closeDialog();
  }
}

function clickContinue() {
  if (step.value === 1) {
    step.value = 2;
    return;
  }
  if (step.value === 2) {
    currencyStore.updateCurrencyOptionsIfEmpty();

    step.value = 3;
    return;
  }
  if (step.value === 3) {
    handleRegister();
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
.signUp-dialog-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.signUp-dialog {
  position: relative;
  display: flex;
  width: 896px;
  border-radius: 5px;
  background: var(--secondary-variants-color);
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);
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
