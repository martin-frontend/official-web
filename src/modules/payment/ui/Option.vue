<template>
  <div class="optionItem">
    <div class="optionItem__sign">
      <div class="optionItem__img">
        <div class="optionItem__logo">
          <img
            :src="`${imagePath}${methodData?.logoUrl}`"
            :alt="methodData?.name"
          />
        </div>
      </div>
      <div class="optionItem__name">
        <div class="optionItem__title">{{ 'Payment method' }}</div>
        <div>{{ methodData?.name }}</div>
      </div>
    </div>
    <div class="optionItem__wrap">
      <div class="optionItem__block">
        <div class="optionItem__title">{{ 'Type' }}</div>
        <span v-if="methodData?.kind == 0">{{ 'Bank Card' }}</span>
        <span v-else-if="methodData?.kind == 1">{{ 'Card Deposit' }}</span>
        <span v-else>{{ 'Cryptocurrency Wallet' }}</span>
      </div>
      <div class="optionItem__block">
        <div class="optionItem__title">{{ 'Fee' }}</div>
        <Typography color="success" device="mobile" component="div">
          {{ 'Free' }}
        </Typography>
      </div>
      <div class="optionItem__block">
        <div class="optionItem__title">{{ 'Processing time' }}</div>
        <Typography
          v-if="
            methodData?.minProcessingTime === 0 &&
            methodData?.processingTime === 0
          "
          color="success"
          device="mobile"
          component="div"
        >
          {{ 'Instant' }}
        </Typography>
        <span v-else>
          {{ methodData?.minProcessingTime }}{{ '-'
          }}{{ methodData?.processingTime }}{{ ' days' }}
        </span>
      </div>
      <div class="optionItem__block">
        <div class="optionItem__title">{{ 'Limit per transaction' }}</div>
        <div>
          <span>
            {{ 'Min' }} {{ methodData?.minAmount ? methodData?.minAmount : 0 }}
          </span>
          <span>{{ ' / ' }}</span>
          <span>
            {{ 'Max' }} {{ methodData?.maxAmount ? methodData?.maxAmount : 0 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, toRefs } from 'vue';
import { PaymentOption } from '@/modules/payment/domain/payment.model';
import Typography from '@/components/Typography.vue';

const props = withDefaults(
  defineProps<{ methodData: PaymentOption | null }>(),
  {
    methodData: () => null,
  }
);

const { methodData } = toRefs(props);
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.optionItem {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  color: var(--text-primary);

  &__sign {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 252px;
  }

  &__img {
    margin-right: 20px;
    padding-right: 24px;
    border-right: 1px solid var(--primary-color);
  }

  &__logo {
    overflow: hidden;
    width: 90px;
    height: 52px;
    border-radius: 5px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
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

  &__title {
    display: none;
    color: var(--primary-color);
    text-align: left;
  }

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;

    &__img {
      margin-bottom: 16px;
      padding-right: 0;
      border-right: none;
    }

    &__sign {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    &__name {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 12px;
    }

    &__wrap {
      flex-direction: column;
      width: 100%;
    }

    &__block {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 8px;
      padding: 0;
      font-size: 12px;
      text-align: right;
    }

    &__title {
      display: block;
    }
  }
}
</style>
