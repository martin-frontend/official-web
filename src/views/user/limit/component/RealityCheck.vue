<template>
  <Heading
    :title="t('payment.limits.reality_check.title')"
    :define="t('payment.limits.reality_check.define')"
    :other-define="t('payment.limits.reality_check.other_define')"
    other-define-color="success"
  />
  <form class="limit-input-group">
    <Dropdown
      v-model="realityCheckHours"
      placeholder="Please select..."
      :options="realityCheckHourOptions"
      option-label="label"
      option-value="value"
      class="dropdwon-box"
    />
    <Button
      :class="!isRealityCheckButtonDisabled ? '' : 'disabled'"
      class="primary-linear-btn"
      @click="onRealityCheckSubmit"
    >
      {{ t('common.submit') }}
    </Button>
  </form>

  <hr class="page-divider" />
  <Heading
    :title="t('payment.limits.active_limits.title')"
    :define="t('payment.limits.active_limits.define')"
  />

  <ul class="limit-description">
    <li>
      {{
        'If you have more than one limit in place, the lowest limit will be valid. Example: If you have a limit of 500 a month and 200 a day, you will not be able to deposit more than 200 a day and also no more than 500 a month.'
      }}
    </li>
    <li>
      {{
        "If you want to reduce your limit, it will be done immediately. However if you wish to increase it, you will need to wait 24 hours for this to take effect. The date of the change in limits will be visible in 'Pending Limits'"
      }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Heading from '@/components/Heading.vue';
import { submitRealityCheck } from '@/modules/userLimit/application/limit';
import { RealityCheckType } from '@/modules/userLimit/domain/limit';

const { t } = useI18n();

// Reality Check
const realityCheckHours = ref<RealityCheckType>();
const realityCheckHourOptions: { label: string; value: RealityCheckType }[] = [
  { label: '1 hours', value: RealityCheckType['1HOURS'] },
  { label: '6 hours', value: RealityCheckType['6HOURS'] },
  { label: '12 hours', value: RealityCheckType['12HOURS'] },
];
const isRealityCheckButtonDisabled = computed(() => {
  return !realityCheckHours.value;
});
function onRealityCheckSubmit() {
  submitRealityCheck(realityCheckHours.value);
  realityCheckHours.value = undefined;
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
ul.limit-description {
  width: 100%;
  margin: 24px 0;
  padding-left: 24px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 20px;
  list-style-type: disc;
}
button.disabled {
  background: #9e9e9e !important;
  cursor: not-allowed;
}
</style>
