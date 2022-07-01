<template>
  <Heading :title="t('payment.limits.type_of_limit.title')" />
  <h2 class="limit-type-title">
    {{ t('payment.limits.time_limit') }}
  </h2>
  <form class="limit-input-group">
    <Dropdown
      v-model="dailyTimeLimit"
      placeholder="Please select..."
      :options="dailyTimeLimitOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <Button
      :class="!isDailyTimeLimitButtonDisabled ? '' : 'disabled'"
      @click="onDailyTimeLimitSubmit"
    >
      {{ t('common.submit') }}
    </Button>
  </form>

  <h2 class="limit-type-title">{{ t('payment.limits.take_a_break') }}</h2>
  <form class="limit-input-group">
    <Dropdown
      v-model="takeABreakDays"
      placeholder="Please select..."
      :options="takeABreakDaysOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <InputNumber
      v-if="takeABreakDays === TakeABreakType.SINGLESETTING"
      v-model="takeABreakDaysSingleSetting"
      placeholder="Days"
      class="input-box"
    />
    <Button
      class="primary-linear-btn"
      :class="!isTakeABreakButtonDisabled ? '' : 'disabled'"
      @click="onTakeABreakSubmit"
    >
      {{ t('common.submit') }}
    </Button>
  </form>

  <h2 class="limit-type-title">{{ t('payment.limits.deposit_limits') }}</h2>
  <form class="limit-input-group">
    <Dropdown
      v-model="depositLimitType"
      placeholder="Please select..."
      :options="depositLimitTypeOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <InputNumber
      v-if="depositLimitType !== DepositLimitType.CANCEL"
      v-model="depositLimitAmount"
      :placeholder="depositLimitType === 'dailyTimes' ? 'Times' : 'Amount'"
      class="input-box"
    />
    <InputNumber
      v-if="depositLimitType === DepositLimitType.SINGLESETTING"
      v-model="depositLimitDays"
      placeholder="Days"
      class="input-box"
    />
    <Button
      :class="!isDepositLimitButtonDisabled ? '' : 'disabled'"
      class="primary-linear-btn"
      @click="onDepositLimitSubmit"
    >
      {{ t('common.submit') }}
    </Button>
  </form>

  <h2 class="limit-type-title">
    {{ t('payment.limits.autoplay_controls') }}
  </h2>
  <form class="limit-input-group">
    <Dropdown
      v-model="autoPlayControlType"
      placeholder="Please select..."
      :options="autoPlayControlTypeOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <InputNumber
      v-if="autoPlayControlType !== AutoPlayControlsType.CANCEL"
      v-model="autoPlayControlAmount"
      class="input-box"
      placeholder="Amount"
    />
    <InputNumber
      v-if="autoPlayControlType === AutoPlayControlsType.SINGLESETTING"
      v-model="autoPlayControlDays"
      placeholder="Days"
      class="input-box"
    />
    <Button
      :class="!isAutoPlayControlButtonDisabled ? '' : 'disabled'"
      class="primary-linear-btn"
      @click="onAutoPlayControlSubmit"
    >
      {{ t('common.submit') }}
    </Button>
  </form>

  <!-- <h2 class="limit-type-title">{{ 'Single Settings' }}</h2> -->
  <!-- <form class="limit-input-group">
    <Dropdown
      v-model="singleSettingType"
      placeholder="Please select..."
      :options="singleSettingTypeOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <InputNumber
      v-model="singleSettingDays"
      class="input-box"
      placeholder="Days"
    />
    <InputNumber
      v-if="singleSettingType !== 'takeABreak'"
      v-model="singleSettingAmount"
      placeholder="Amount"
      class="input-box"
    />
    <Button class="primary-linear-btn" @click="onSingleSettingSubmit">
      {{ t('common.submit') }}
    </Button>
  </form> -->

  <div class="hint">
    {{ 'Please contact' }}
    <span class="hint-emphasized">{{ 'Support' }}</span>
    {{ 'if you feel you need to Self Exclude your account' }}
  </div>

  <hr class="page-divider" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import {
  submitAutoPlayControlLimit,
  submitDailyTimeLimit,
  submitDepositLimit,
  //   submitSingleSettingLimit,
  submitTakeABreak,
} from '@/modules/userLimit/application/limit';
import {
  AutoPlayControlsType,
  DepositLimitType,
  TakeABreakType,
  TimeLimitType,
} from '@/modules/userLimit/domain/limit';
import Heading from '@/components/Heading.vue';

const { t } = useI18n();

// daily time limit
const dailyTimeLimit = ref<TimeLimitType>();
const dailyTimeLimitOptions: { label: string; value: TimeLimitType }[] = [
  { label: '4 hours', value: TimeLimitType['4HOURS'] },
  { label: '6 hours', value: TimeLimitType['6HOURS'] },
  { label: '8 hours', value: TimeLimitType['8HOURS'] },
  { label: '12 hours', value: TimeLimitType['12HOURS'] },
  { label: 'Cancel', value: TimeLimitType.CANCEL },
];
const isDailyTimeLimitButtonDisabled = computed(() => {
  return !dailyTimeLimit.value;
});
function onDailyTimeLimitSubmit() {
  if (isDailyTimeLimitButtonDisabled.value) {
    return;
  }

  submitDailyTimeLimit(dailyTimeLimit.value);
  dailyTimeLimit.value = undefined;
}

// Take a break
const takeABreakDays = ref<TakeABreakType>();
const takeABreakDaysSingleSetting = ref<number>();
const takeABreakDaysOptions: { label: string; value: TakeABreakType }[] = [
  { label: '24 hours', value: TakeABreakType['24HOURS'] },
  { label: '3 days', value: TakeABreakType['3DAYS'] },
  { label: '1 week', value: TakeABreakType['1WEEK'] },
  { label: '1 month', value: TakeABreakType['1MONTH'] },
  { label: 'Single Setting', value: TakeABreakType.SINGLESETTING },
  { label: 'Deactivate Account', value: TakeABreakType.DEACTIVATEACCOUNT },
];
const isTakeABreakButtonDisabled = computed(() => {
  if (
    !takeABreakDays.value ||
    (takeABreakDays.value === TakeABreakType.SINGLESETTING &&
      !takeABreakDaysSingleSetting.value)
  ) {
    return true;
  }
  return false;
});
function onTakeABreakSubmit() {
  if (isTakeABreakButtonDisabled.value) {
    return;
  }
  submitTakeABreak(takeABreakDays.value, takeABreakDaysSingleSetting.value);
  takeABreakDays.value = undefined;
  takeABreakDaysSingleSetting.value = undefined;
}

// Deposit Limit
const depositLimitType = ref<DepositLimitType>();
const depositLimitAmount = ref<number>();
const depositLimitDays = ref<number>();
const depositLimitTypeOptions: { label: string; value: DepositLimitType }[] = [
  { label: '24 hours', value: DepositLimitType.DAILY },
  { label: 'Times in 24 hours', value: DepositLimitType.DAILYTIMES },
  { label: '1 month', value: DepositLimitType.MONTHLY },
  { label: 'Single Setting', value: DepositLimitType.SINGLESETTING },
  { label: 'Cancel', value: DepositLimitType.CANCEL },
];
const isDepositLimitButtonDisabled = computed(() => {
  if (depositLimitType.value === DepositLimitType.CANCEL) {
    return false;
  }

  if (
    !depositLimitType.value ||
    !depositLimitAmount.value ||
    (depositLimitType.value === DepositLimitType.SINGLESETTING &&
      !depositLimitDays.value)
  ) {
    return true;
  }

  return false;
});
function onDepositLimitSubmit() {
  if (isDepositLimitButtonDisabled.value) {
    return;
  }
  submitDepositLimit(
    depositLimitType.value,
    depositLimitAmount.value || 0,
    depositLimitDays.value
  );
  depositLimitType.value = undefined;
  depositLimitAmount.value = undefined;
  depositLimitDays.value = undefined;
}

// Autoplay Controls
const autoPlayControlType = ref<AutoPlayControlsType>();
const autoPlayControlAmount = ref<number>();
const autoPlayControlDays = ref<number>();
const autoPlayControlTypeOptions: {
  label: string;
  value: AutoPlayControlsType;
}[] = [
  { label: 'Daily Amount Limit', value: AutoPlayControlsType.DAILYAMOUNTLIMIT },
  { label: 'Single Setting', value: AutoPlayControlsType.SINGLESETTING },
  { label: 'Cancel', value: AutoPlayControlsType.CANCEL },
];
const isAutoPlayControlButtonDisabled = computed(() => {
  if (autoPlayControlType.value === AutoPlayControlsType.CANCEL) {
    return false;
  }

  if (
    !autoPlayControlType.value ||
    !autoPlayControlAmount.value ||
    (autoPlayControlType.value === AutoPlayControlsType.SINGLESETTING &&
      !autoPlayControlDays.value)
  ) {
    return true;
  }
  return false;
});
function onAutoPlayControlSubmit() {
  if (isAutoPlayControlButtonDisabled.value) {
    return;
  }
  submitAutoPlayControlLimit(
    autoPlayControlType.value,
    autoPlayControlAmount.value || 0,
    autoPlayControlDays.value
  );
  autoPlayControlType.value = undefined;
  autoPlayControlAmount.value = undefined;
  autoPlayControlDays.value = undefined;
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.p-inputwrapper {
  @include mobile {
    margin-bottom: 10px;
  }
  &.p-dropdown,
  > ::v-deep(.p-component) {
    border: 1px solid var(--primary-color);
    background: var(--secondary-variants-color);
    color: white;
    margin-right: 16px;
    @include mobile {
      margin-right: 0px;
    }
  }

  ::v-deep(.p-placeholder) {
    color: var(--text-secondary);
  }

  ::v-deep(.p-dropdown-label:not(.p-placeholder)) {
    color: var(--text-primary);
  }

  ::placeholder {
    color: var(--text-secondary);
  }
}

button.disabled {
  background: #9e9e9e !important;
  cursor: not-allowed;
}

.limit-type-title {
  margin: 24px 0 8px;
  color: var(--primary-color);
  font-weight: 500;
  font-size: 26px;
  line-height: 34px;
  @include mobile {
    font-size: 22px;
    line-height: 24px;
  }
}
.limit-input-group {
  display: flex;
  @include mobile {
    flex-direction: column;
  }

  .p-button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    @include mobile {
      width: 100%;
    }
  }

  .dropdwon-box,
  .input-box {
    max-width: 248px;
    width: 100%;
    @include mobile {
      max-width: unset;
    }
  }

  .dropdwon-box {
    margin-right: 16px;
  }
}

.hint {
  position: static;
  top: 0;
  margin: 16px 16px 0;
  color: #9698a1;
  font-size: 16px;
  line-height: 20px;

  span.hint-emphasized {
    color: var(--primary-color);
  }
}
</style>
