<template>
  <Container class="deposit-container">
    <Heading :title="t('payment.deposit.title')" />
    <Collapse
      v-for="({ id, paymentMerchantId }, index) of paymentMethods"
      :key="id"
      class="collapse"
    >
      <template #header>
        <div class="logo-box">
          <img
            :src="`${imagePath}${paymentMethods[index].logoUrl}`"
            class="logo"
            :alt="paymentMethods[index].logoUrl"
          />
        </div>
      </template>
      <div class="collapse-content">
        <div class="input-label">
          {{ `${t('payment.deposit.payment_details')}:` }}
        </div>
        <div class="p-input-filled">
          <span class="p-float-label">
            <InputText v-model="amountToDeposit[index]" />
            <label>{{ t('payment.deposit.amount_to_deposit') }}</label>
          </span>
        </div>
        <Button
          class="primary-linear-btn"
          :disabled="
            !amountToDeposit[index] ||
            amountToDeposit[index] < paymentMethods[index].minAmount ||
            (paymentMethods[index].maxAmount !== 0 &&
              amountToDeposit[index] > paymentMethods[index].maxAmount)
          "
          @click="clickDeposit(index, paymentMerchantId)"
        >
          {{ t('payment.deposit.deposit') }}
        </Button>

        <div class="limit-wrapper">
          <span class="limit-type">{{ t('common.min') }}</span>
          <span class="limit-value">
            {{ `$${paymentMethods[index].minAmount.toLocaleString()}` }}
          </span>
          <div class="vertical-divider" />
          <span class="limit-type">{{ t('common.max') }}</span>
          <span class="limit-value">
            {{
              paymentMethods[index].maxAmount
                ? `$${paymentMethods[index].maxAmount.toLocaleString()}`
                : t('common.unlimited')
            }}
          </span>
        </div>
      </div>
    </Collapse>
  </Container>

  <DepositThirdPartyDialog
    v-if="isThirdPartyDialogShown"
    :iframe-url="urlOf3rdParty"
    @close="closeThirdPartyDialog"
    @complete="completeThirdPartyDialog"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import { onMounted, ref, onUnmounted } from 'vue';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import Collapse from '@/components/Collapse.vue';
import { getDepositPaymentMethod } from '@/modules/deposit/application/depositPaymentMethod';
import { DepositPaymentMethod } from '@/modules/deposit/domain/paymentMethods';
import { createPaymentOrder } from '@/modules/deposit/application/createPaymentOreder';
import DepositThirdPartyDialog from './DepositThirdPartyDialog.vue';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';

const { t } = useI18n();
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;

const paymentMethods = ref<DepositPaymentMethod[]>([]);
const amountToDeposit = ref<number[]>([]);
const router = useRouter();
let timeId = 0;

onMounted(async () => {
  paymentMethods.value = await getDepositPaymentMethod();
});

onUnmounted(() => {
  clearTimeout(timeId);
});

// function setAmountToDeposit(index: number, { value }: { value: number }) {
//   amountToDeposit.value[index] = value;
// }

const isThirdPartyDialogShown = ref(false);
const urlOf3rdParty = ref('');

async function clickDeposit(index: number, paymentMerchantId: string) {
  const amount = amountToDeposit.value[index] || 0;

  const path = await createPaymentOrder(amount, paymentMerchantId);
  isThirdPartyDialogShown.value = true;
  urlOf3rdParty.value = path;
  timeId = setTimeout(() => {
    isThirdPartyDialogShown.value = false;
    router.push('/user/payments-history');
  }, 3000);
}
function closeThirdPartyDialog() {
  isThirdPartyDialogShown.value = false;
  urlOf3rdParty.value = '';
}
function completeThirdPartyDialog() {
  closeThirdPartyDialog();
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.deposit-container {
  max-width: 720px;
  padding: 70px 0;

  @include mobile {
    padding: 70px 40px;
  }
}

.logo-box {
  height: 52px;
  width: 90px;
  overflow: hidden;
  .logo {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.collapse {
  margin-bottom: 32px;
}

.collapse-content {
  .input-label {
    height: 20px;
    margin: 8px 0;
    color: var(--primary-color);
    font-size: 16px;
    line-height: 20px;
  }

  .p-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 16px 0;
  }

  .limit-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .limit-type {
      color: var(--primary-color);
      font-size: 16px;
      line-height: 20px;
    }

    .limit-value {
      margin: 0 8px;
      color: var(--text-primary);
      font-size: 16px;
      line-height: 20px;
    }

    .vertical-divider {
      display: inline-block;
      height: 20px;
      margin: 0 16px;
      border-left: 1px solid var(--text-primary);
    }
  }
}
</style>
