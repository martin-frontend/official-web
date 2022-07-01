<template>
  <Container>
    <!-- Payment options -->
    <section class="payments-wrap">
      <Heading
        :title="t('payment.options.title')"
        :define="t('payment.options.define')"
      />
      <div class="payment-options-list">
        <div class="payment-options-list__head">
          <div class="payment-options-list__sign">
            <div>{{ 'Payment method' }}</div>
            <div>{{ '' }}</div>
          </div>
          <div class="payment-options-list__wrap">
            <div class="payment-options-list__block">{{ 'Type' }}</div>
            <div class="payment-options-list__block">{{ 'Fee' }}</div>
            <div class="payment-options-list__block">
              {{ 'Pocessing time' }}
            </div>
            <div class="payment-options-list__block">
              {{ 'Limit per transaction' }}
            </div>
          </div>
        </div>
      </div>
      <div class="payment-options-list__content">
        <template v-for="method of paymentOptions" :key="method.id">
          <OutlineCard>
            <Option :method-data="method">
              <!-- {{ method }} -->
            </Option>
          </OutlineCard>
        </template>
      </div>
    </section>
    <!-- Withdrawal methods -->
    <section class="payments-wrap">
      <Heading
        :title="t('payment.withdrawal_methods.title')"
        :define="t('payment.withdrawal_methods.define')"
      />
      <div class="payment-options-list">
        <div class="payment-options-list__head">
          <div class="payment-options-list__sign">
            <div>{{ 'Payment method' }}</div>
            <div>{{ '' }}</div>
          </div>
          <div class="payment-options-list__wrap">
            <div class="payment-options-list__block">{{ 'Type' }}</div>
            <div class="payment-options-list__block">{{ 'Fee' }}</div>
            <div class="payment-options-list__block">
              {{ 'Pocessing time' }}
            </div>
            <div class="payment-options-list__block">
              {{ 'Limit per transaction' }}
            </div>
          </div>
        </div>
      </div>
      <div class="payment-options-list__content">
        <template v-for="method of withdrawOptions" :key="method.id">
          <OutlineCard>
            <Option :method-data="method">
              <!-- {{ method }} -->
            </Option>
          </OutlineCard>
        </template>
      </div>
    </section>
  </Container>
</template>

<script lang="ts" setup>
// import { computed } from 'vue-demi';
import { useI18n } from 'vue-i18n';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import Option from '@/modules/payment/ui/Option.vue';
import { usePaymentOptions } from '@/modules/payment/application/usePaymentOptions';

const { t } = useI18n();
const { paymentOptions, withdrawOptions } = usePaymentOptions();
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.outline-card {
  overflow: auto;
  & + & {
    margin-top: 16px;
  }
}

.payments-wrap {
  & + & {
    margin-top: 32px;
  }

  @include mobile {
    & + & {
      margin-top: 24px;
    }
  }
}

.payment-options-list {
  &__head {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 24px 26px 24px;
    color: var(--primary-color);
  }

  &__sign {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 252px;
  }

  &__wrap {
    display: flex;
    flex: 3;
    flex-wrap: wrap;
    align-items: center;
  }

  &__block {
    flex: 1;
    box-sizing: border-box;
    text-align: center;
  }

  @include mobile {
    &__head {
      display: none;
    }
  }
}
</style>
