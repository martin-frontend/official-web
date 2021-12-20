<template>
  <TransferModal @close="clearPoints" @cancel-error="cacelError">
    <div class="detail">
      <div class="my-reward">
        <div class="my-reward-title">
          {{ t('payment.my_rewards.transfer_modal.my_rewards') }}
        </div>
        <div class="my-reward-coin">
          <img src="@/assets/icons/coin.png" alt="" />
        </div>
        <div class="my-reward-amount">{{ balanceStore.reward }}</div>
      </div>
      <div class="apply-point-box">
        <div class="use-point-description">
          {{ `${transferPoint}` }}
          {{ t('payment.my_rewards.transfer_modal.points_used') }}
          {{ `${leftPoint}` }}
          {{ t('payment.my_rewards.transfer_modal.points_remained') }}
        </div>
        <div class="apply-box p-input-filled">
          <div class="form-label-group p-float-label p-field">
            <InputNumber
              id="points"
              v-model="transferPoint"
              type="points"
              name="points"
              placeholder=""
              :class="{ errorClass: showAmountError }"
              class="form-control"
              :max="balanceStore.reward"
            />
            <!-- <InputBox
              id="points"
              v-model="transferPoint"
              type="points"
              name="points"
              placeholder=""
              class="form-control"
              :max="balanceStore.reward"
            /> -->
            <label
              :class="{ 'error-label': showAmountError }"
              class="input-label"
              for="points"
            >
              {{ t('payment.my_rewards.transfer_modal.points') }}
            </label>
          </div>

          <Button class="apply-button" @click="applyTransfer">
            {{ t('payment.my_rewards.transfer_modal.apply') }}
          </Button>
        </div>
        <div v-show="showAmountError" id="points-help" class="p-error">
          {{ 'Cannot be greater than the number of points.' }}
        </div>
        <div class="reward-transfer-description">
          {{ `${rewardTransferAmountDivisionRate}` }}
          {{ t('payment.my_rewards.transfer_modal.points_redeemed') }}
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="transfer-box">
        <div class="total">
          <div class="total-text">
            {{ t('payment.my_rewards.transfer_modal.total') }}
          </div>
          <div class="total-amount">{{ applyTransferPoint }}</div>
        </div>
        <div class="exchange">
          <div class="exchange-name">
            {{ t('payment.my_rewards.transfer_modal.exchange_amount') }}
          </div>
          <div class="exchange-amount">{{ exchangeAmount }}</div>
        </div>
        <Button
          v-if="disableButton"
          class="transfer-button"
          component="button"
          size="transfer"
          variant="rounded"
          disabled
          @click="openConfirmDialog"
        >
          <IconBase
            :width="20"
            :height="20"
            viewBox="0 0 24 24"
            icon-color="var(--primary-color)"
          >
            <IconTransfer />
          </IconBase>
          {{ t('payment.my_rewards.transferButton') }}
        </Button>
        <Button
          v-else
          class="transfer-button"
          component="button"
          size="transfer"
          variant="rounded"
          color="success"
          @click="openConfirmDialog"
        >
          <IconBase
            :width="20"
            :height="20"
            viewBox="0 0 24 24"
            icon-color="var(--primary-color)"
          >
            <IconTransfer />
          </IconBase>
          {{ t('payment.my_rewards.transferButton') }}
        </Button>
      </div>
    </div>
  </TransferModal>
</template>

<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';
import { ref, computed, defineEmits, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import TransferModal from '@/components/TransferModal.vue';
import Button from '@/components/Button.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import IconTransfer from '@/components/icons/IconTransfer.vue';
import IconBase from '@/components/icons/IconBase.vue';
import useDialogStore from '@/core/shared/dialogStore';
import {
  getTransferRule,
  transferRewards,
} from '../infrastructure/api/achievementApi';
import useToastStore, { defaultToast } from '@/core/shared/toastStore';
// import InputBox from '@/components/InputBox.vue';
// import { transferRewards } from '../infrastructure/api/achievementApi';
// import RewardTransferConfirmModal from './RewardTransferConfirmModal.vue';

const { t } = useI18n();
const showAmountError = ref(false);
const balanceStore = useBalanceStore();
const transferPoint = ref(0);
const leftPoint = computed(() => balanceStore.reward - transferPoint.value);
const disableButton = ref(true);
const applyTransferPoint = ref(0);
const rewardTransferAmountDivisionRate = ref(0);
const rewardTransferRuleWithdrawalLimitRate = ref(0);

function applyTransfer() {
  applyTransferPoint.value = transferPoint.value;

  if (transferPoint.value >= balanceStore.reward) {
    transferPoint.value = balanceStore.reward;
    showAmountError.value = true;
  } else {
    showAmountError.value = false;
  }

  if (transferPoint.value === 0 || transferPoint.value < 0) {
    disableButton.value = true;
  } else {
    disableButton.value = false;
  }
}

const emit = defineEmits<{
  (e: 'closeTransferModal'): void;
  (e: 'openConfirmDialog'): void;
  (e: 'openToast'): void;
  (e: 'update:myRewardAmount', value: number): void;
}>();

const exchangeAmount = computed(
  () => applyTransferPoint.value / rewardTransferAmountDivisionRate.value
);
function cacelError() {
  showAmountError.value = false;
  applyTransferPoint.value = 0;
  // exchangeAmount = 0;
}
function clearPoints() {
  transferPoint.value = 0;
}
const openConfirm = ref(false);
const dialogStore = useDialogStore();
const toastStore = useToastStore();

function openToast() {
  const toast = { ...defaultToast };
  toast.toastTitle = t('payment.my_rewards.toast.title');
  toast.toastDescription = t('payment.my_rewards.toast.description');
  toast.isIconCheckCircle = true;
  toast.color = 'success';
  toastStore.addToastMessage(toast);
}

function openConfirmDialog() {
  openConfirm.value = true;
  emit('openConfirmDialog');
  emit('closeTransferModal');

  transferPoint.value = 0;
  disableButton.value = true;

  dialogStore.popUp({
    title: 'Are you sure you want to transfer out?',
    message: `Please note: The ratio of transfer back to the balance is ${rewardTransferAmountDivisionRate.value}:1, and the withdrawal limit is doubled of balance.`,
    secondMessage: `That is, the ${
      applyTransferPoint.value
    } reward is transferred back to the balance, and the balance is increased by ${
      exchangeAmount.value
    }. The withdrawal limit is increased by ${
      exchangeAmount.value * rewardTransferRuleWithdrawalLimitRate.value
    }.`,
    cancelButtonText: 'YES',
    okButtonText: 'NO',
    async onCancel() {
      await transferRewards(applyTransferPoint.value);
      emit('update:myRewardAmount', applyTransferPoint.value);
      openToast();
      applyTransferPoint.value = 0;
      dialogStore.close();
    },
    onOk() {
      dialogStore.close();
    },
  });
}

onMounted(() => {
  getTransferRule().then((data) => {
    rewardTransferAmountDivisionRate.value = data[1].amountDivisionRate;
    rewardTransferRuleWithdrawalLimitRate.value = data[1].withdrawalLimitRate;
  });
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';
.detail {
  padding: 8px 16px 16px 16px;
  .my-reward {
    color: var(--primary-color);
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;

    .my-reward-coin {
      display: inline-flex;
      height: 20px;
      margin-left: 16px;
    }
    .my-reward-amount {
      margin-left: 2px;
    }
  }
  .apply-point-box {
    margin-top: 16px;
    .use-point-description {
      font-size: 12px;
      color: #9e9e9e;
      display: flex;
      justify-content: flex-end;
    }
    .apply-box {
      display: flex;
      margin-top: 8px;
      margin-bottom: 8px;

      .form-label-group {
        margin-right: 4px;
      }
      .apply-button {
        height: 56px;
      }
    }
    .p-error {
      font-size: 12px;
      margin-bottom: 8px;
      margin-left: 5px;
    }
    .form-control {
      outline: 1px solid var(--primary-color);
      height: 50px;
    }
    .errorClass {
      outline: 1px solid #be0123;
    }
    .reward-transfer-description {
      font-size: 12px;
      color: #9e9e9e;
      display: flex;
      justify-content: flex-start;
    }
  }
}
.submit {
  border-top: 1px solid #e0e0e0;
  .transfer-box {
    padding: 16px 16px;
    .total {
      display: flex;
      justify-content: space-between;
      .total-text {
        font-size: 16px;
        color: #9e9e9e;
      }
      .total-amount {
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
      }
    }
    .exchange {
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;

      .exchange-name {
        font-size: 10px;
        color: var(--primary-color);
      }
      .exchange-amount {
        color: var(--primary-color);
        margin-left: 4px;
      }
    }
  }
  .transfer-button {
    // background-color: yellow;
    width: 288px;
    height: 40px;
    line-height: 16px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
}
.error-label {
  color: #be0123 !important;
}
</style>
