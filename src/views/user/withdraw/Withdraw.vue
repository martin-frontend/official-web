<template>
  <div class="withdraw-container">
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.withdraw.title')"
        :define="t('payment.withdraw.define')"
      />

      <OutlineCard>
        <div class="bulletin">
          <div class="bulletin-item">
            {{ `${t('payment.withdraw.balance')}：$${balance}` }}
          </div>
        </div>
      </OutlineCard>
    </div>
    <div class="bonus-block-group">
      <Heading :title="t('payment.deposit.title')" />
      <Collapse
        v-for="({ id }, index) of paymentMethods"
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
            {{ `${t('payment.withdraw.payment_details')}:` }}
          </div>
          <div class="p-input-filled">
            <span class="p-float-label">
              <InputText v-model="amountToWithdraw[index]" />
              <label>{{ t('payment.withdraw.amount_to_withdraw') }}</label>
            </span>
          </div>
          <Button
            class="primary-linear-btn"
            :disabled="
              !amountToWithdraw[index] ||
              amountToWithdraw[index] < paymentMethods[index].minAmount ||
              (paymentMethods[index].maxAmount !== 0 &&
                amountToWithdraw[index] > paymentMethods[index].maxAmount)
            "
            @click="setWithdrawPasswordDialog(index)"
          >
            {{ t('payment.withdraw.withdraw') }}
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
    </div>
  </div>
  <!-- <SetupWithdrawPasswordDialog v-model:visible="dialog" /> -->
  <!-- <WithdrawPasswordDialog v-model:visible="dialog" /> -->
  <!-- <VerifyYourMobileNumberDialog v-model:visible="dialog" /> -->
  <!-- <NewPasswordDialog v-model:visible="dialog" /> -->
  <WithdrawalInformationDialog v-model:visible="dialog" />
  <!-- <WithdrawPasswordDialog @showSuccessDialog="setSuccessDialog" /> -->
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Collapse from '@/components/Collapse.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import useDialogStore from '@/core/shared/dialogStore';
import { updateBalance } from '@/modules/userBalance/application/balance';
import { getWithdrawalPaymentMethod } from '@/modules/withdraw/application/withdrawPaymentMethod';
import { WithdrawalPaymentMethod } from '@/modules/withdraw/domain/paymentMethods';
import useWithdrawPasswordStore, {
  DialogType,
} from '@/modules/withdraw/infrastructure/store/withdrawPasswordStroe';
// import WithdrawPasswordDialog from './WithdrawPasswordDialog.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
// import SetupWithdrawPasswordDialog from '@/modules/withdraw/ui/SetupWithdrawPasswordDialog.vue';
// import WithdrawPasswordDialog from '@/modules/withdraw/ui/WithdrawPasswordDialog.vue';
// import VerifyYourMobileNumberDialog from '@/modules/withdraw/ui/VerifyYourMobileNumberDialog.vue';
// import NewPasswordDialog from '@/modules/withdraw/ui/NewPasswordDialog.vue';
import WithdrawalInformationDialog from '@/modules/withdraw/ui/WithdrawalInformationDialog.vue';

const dialogStore = useDialogStore();
const withdrawPasswordStore = useWithdrawPasswordStore();

const dialog = ref(true);

const { t } = useI18n();
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;

const balanceStore = useBalanceStore();

const balance = computed(
  () => balanceStore.amount - (balanceStore.withdrawalLimit || 0)
);

const userStore = useUserStore();

const paymentMethods = ref<WithdrawalPaymentMethod[]>([]);
const amountToWithdraw = ref<number[]>([]);

const setWithdrawPasswordDialog = (index: number) => {
  const amount = amountToWithdraw.value[index];
  amountToWithdraw.value.splice(index, 1);
  if (paymentMethods.value[index]) {
    withdrawPasswordStore.setValue(paymentMethods.value[index]);
  }

  if (userStore.userInfo?.hasWithdrawalPasswordBeenSet === false) {
    withdrawPasswordStore.popUp({
      title: t('payment.withdraw.dialog.setup_withdraw_password'),
      confirmButtonText: t('common.confirm'),
      curDialogType: DialogType.SetupWithdrawPassword,
      amount,
    });
    return;
  }

  withdrawPasswordStore.popUp({
    title: t('payment.withdraw.dialog.withdraw_password'),
    confirmButtonText: t('common.confirm'),
    curDialogType: DialogType.WithdrawPassword,
    amount,
  });
};

// function setAmountToWithdraw(index: number, { value }: { value: number }) {
//   amountToWithdraw.value[index] = value;
// }

const setSuccessDialog = () => {
  dialogStore.popUp({
    title: 'SUCCESS',
    message:
      'We have received your withdrawal request and we will process it for you as soon as possible.',
    cancelButtonText: 'CONFIRM',
    onCancel() {
      dialogStore.close();
      updateBalance();
    },
    isOkButtonShown: false,
    isCheckShown: true,
  });
};

onMounted(async () => {
  updateBalance();
  paymentMethods.value = await getWithdrawalPaymentMethod();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.withdraw-container {
  max-width: 720px;
  // padding: 70px 0;

  // @include mobile {
  //   padding: 70px 40px;
  // }
}
.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}
.bulletin {
  box-sizing: border-box;
  display: flex;
  padding: 28px 20px;

  &-item {
    padding: 0 32px;
    font-size: 22px;
    line-height: 24px;
    color: var(--text-primary);
    border-left: 1px solid var(--text-primary);

    &:first-child {
      padding-left: 0;
      border-left: none;
    }
  }

  @include mobile {
    padding: 20px;
    flex-direction: column;

    &-item {
      padding: 0;
      font-size: 16px;
      line-height: 20px;
      border: none;

      & + & {
        margin-top: 12px;
      }
    }
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
    text-align: left;
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
