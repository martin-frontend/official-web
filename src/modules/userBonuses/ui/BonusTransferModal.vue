<template>
  <TransferModal @close="cancelClickAll">
    <div class="detail">
      <div class="my-bonus">
        <div class="my-bonus-title">
          {{ t('my_bonuses.transfer_modal.title') }}
        </div>
        <div class="my-bonus-coin">
          <img src="@/assets/icons/Bonuses.png" alt="" />
        </div>
        <div class="my-bonus-amount">{{ balanceStore.bonus }}</div>
      </div>
      <div class="select-all">
        <label class="select-all-wrap">
          <input
            v-model="isCheckAll"
            type="checkbox"
            value="C#"
            class="checkbox"
            @click="checkAll"
          />
          <span class="select-all-text">
            {{ t('my_bonuses.transfer_modal.select_all') }}
          </span>
        </label>
      </div>
      <div class="validity">
        <div class="validity-period">
          {{ t('my_bonuses.transfer_modal.validity_period') }}
        </div>
        <div class="bonuses">{{ t('my_bonuses.transfer_modal.bonuses') }}</div>
      </div>
      <div class="bonus">
        <label
          v-for="record of resolvedData"
          :key="record.id"
          class="checkbox-item"
        >
          <div>
            <input
              v-model="transferItem"
              type="checkbox"
              class="checkbox"
              :value="record"
              @change="updateInput"
            />
          </div>
          <div class="bonus-data">
            <span class="bonus-id-and-data">
              <span class="order-id">{{ record.id }}</span>
              <div class="receive-date">
                {{ record.expiryTimes }}
              </div>
            </span>
            <div class="bonus-amount">
              <div class="my-bonus-coin">
                <img src="@/assets/icons/Bonuses.png" alt="" />
              </div>
              <div class="bonuses-amount">
                {{ record.amount }}
              </div>
            </div>
          </div>
        </label>
        <!-- <label class="checkbox-item">
          <input type="checkbox" value="C#" class="checkbox" />
          <div class="bonus-data">
            <span class="bonus-id-and-data">
              <span class="order-id">{{ 'AZ123546546' }}</span>
              <div class="receive-date">{{ '2021/11/5 12:06:15' }}</div>
            </span>
            <div class="bonus-amount">
              <div class="my-bonus-coin">
                <img src="@/assets/icons/Bonuses.png" alt="" />
              </div>
              <div class="bonuses-amount">{{ '20' }}</div>
            </div>
          </div>
        </label>
        <label class="checkbox-item">
          <input type="checkbox" value="C#" class="checkbox" />
          <div class="bonus-data">
            <span class="bonus-id-and-data">
              <span class="order-id">{{ 'AZ123546546' }}</span>
              <div class="receive-date">{{ '2021/11/5 12:06:15' }}</div>
            </span>
            <div class="bonus-amount">
              <div class="my-bonus-coin">
                <img src="@/assets/icons/Bonuses.png" alt="" />
              </div>
              <div class="bonuses-amount">{{ '200' }}</div>
            </div>
          </div>
        </label> -->
      </div>
    </div>
    <div class="submit">
      <div class="bonus-transfer-description">
        {{ `${bonusTransferAmountDivisionRate}` }}
        {{ t('payment.my_rewards.transfer_modal.points_redeemed') }}
      </div>
      <div class="transfer-box">
        <div class="total">
          <div class="total-text">
            {{ t('payment.my_rewards.transfer_modal.total') }}
          </div>
          <div class="total-amount">{{ transferBonusPoint }}</div>
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
import { ref, computed, defineEmits, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import TransferModal from '@/components/TransferModal.vue';
import Button from '@/components/Button.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import IconTransfer from '@/components/icons/IconTransfer.vue';
import IconBase from '@/components/icons/IconBase.vue';
import useDialogStore from '@/core/shared/dialogStore';
import { getTransferRule } from '@/modules/rewards/infrastructure/api/achievementApi';
import { transferBonuses } from '@/modules/userBalance/infrastructure/api/balanceApi';
import useToastStore, { defaultToast } from '@/core/shared/toastStore';

const { t } = useI18n();

const balanceStore = useBalanceStore();

// 轉換資料格式
const resolvedData = computed(() =>
  balanceStore.bonuses?.map((record) => {
    const time = moment(record.expiryTime);
    return {
      ...record,
      expiryTimes: time.format('YYYY-MM-DD HH:mm:ss'),
    };
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transferItem = ref<any>([]);
const transferOrderIds = ref([]);
const isCheckAll = ref(false);
const disableButton = ref(true);

const transferBonusPoint = ref(0);
const bonusTransferAmountDivisionRate = ref(0);
const bonusTransferRuleWithdrawalLimitRate = ref(0);

function checkAll() {
  isCheckAll.value = !isCheckAll.value;
  if (isCheckAll.value === true) {
    if (resolvedData.value) {
      transferItem.value.push(...resolvedData.value);
    }
    transferOrderIds.value = transferItem.value.map(
      (item: { id: string }) => item.id
    );
    disableButton.value = false;
  } else {
    transferItem.value = [];
    transferOrderIds.value = [];
    disableButton.value = true;
  }
  transferBonusPoint.value = 0;
  for (let i = 0; i < transferItem.value.length; i++) {
    transferBonusPoint.value += transferItem.value[i].amount;
  }
  // console.log('transferOrderIds', transferOrderIds.value);
  // console.log('------------', transferItem.value.length);
}

function updateInput() {
  transferOrderIds.value = transferItem.value.map(
    (item: { id: string }) => item.id
  );
  // console.log('transferOrderIds', transferOrderIds.value);

  /// -----------------------------------

  transferBonusPoint.value = 0;
  for (let i = 0; i < transferItem.value.length; i++) {
    transferBonusPoint.value += transferItem.value[i].amount;
  }
  // console.log('888', transferBonusPointArray.value);
  /// -----------------------------------

  if (transferItem.value.length === balanceStore.bonuses?.length) {
    isCheckAll.value = true;
  } else {
    isCheckAll.value = false;
  }
  if (transferItem.value.length > 0) {
    disableButton.value = false;
  } else {
    disableButton.value = true;
  }
  // console.log('checkbox選取數量', transferItem.value.length);
}

const emit = defineEmits<{
  (e: 'closeTransferModal'): void;
  (e: 'openConfirmDialog'): void;
  (e: 'openToast'): void;
  (e: 'update:mybonusAmount', value: number): void;
}>();

const exchangeAmount = computed(
  () => transferBonusPoint.value / bonusTransferAmountDivisionRate.value
);

function cancelClickAll() {
  isCheckAll.value = false;
  transferItem.value = [];
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

  disableButton.value = true;

  dialogStore.popUp({
    title: 'Are you sure you want to transfer out?',
    message: `Please note: The ratio of transfer back to the balance is ${bonusTransferAmountDivisionRate.value}:1, and the withdrawal limit is doubled of balance.`,
    secondMessage: `That is, the ${
      transferBonusPoint.value
    } bonus is transferred back to the balance, and the balance is increased by ${
      exchangeAmount.value
    }. The withdrawal limit is increased by ${
      exchangeAmount.value * bonusTransferRuleWithdrawalLimitRate.value
    }.`,
    cancelButtonText: 'YES',
    okButtonText: 'NO',
    async onCancel() {
      await transferBonuses(transferOrderIds.value);
      emit('update:mybonusAmount', transferBonusPoint.value);
      openToast();
      transferBonusPoint.value = 0;
      dialogStore.close();
      transferItem.value = [];
      isCheckAll.value = false;
    },
    onOk() {
      dialogStore.close();
      isCheckAll.value = false;
      transferItem.value = [];
    },
  });
}

onMounted(() => {
  getTransferRule().then((data) => {
    bonusTransferAmountDivisionRate.value = data[2].amountDivisionRate;
    bonusTransferRuleWithdrawalLimitRate.value = data[2].withdrawalLimitRate;
  });
  // getBonusApi();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.detail {
  .my-bonus {
    color: #c1a14e;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;

    .my-bonus-coin {
      height: 20px;
      margin-left: 16px;
      display: flex;
      align-items: center;
    }
    .my-bonus-amount {
      margin-left: 2px;
    }
  }
  .select-all {
    padding: 0 16px;
    margin-top: 16px;
    .select-all-text {
      margin-left: 6.5px;
    }
    .select-all-wrap {
      display: flex;
      align-items: center;
    }
  }
  .validity {
    background: #eee;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
    box-shadow: 0px 1px 0px #e0e0e0;
    margin-top: 8px;

    .validity-period {
      margin-left: 44px;
    }
    .bonuses {
      margin-right: 16px;
    }
    .validity-period,
    .bonuses {
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      color: #424242;
    }
  }

  .bonus {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    height: 287px;
    // overflow: scroll;
    overflow-x: auto;

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background: #c1a14e;
    }
    .checkbox-item {
      padding: 8px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      .checkbox {
        // margin: auto 0;
        width: 15px;
        height: 15px;
      }
      // .checkbox[type='checkbox'] {
      //   -webkit-appearance: none;
      //   border: 1px solid var(--text-secondary);
      //   border-radius: 3px;
      // }
      // .checkbox::before {
      //   content: '5';
      //   position: absolute;
      //   top: 0px;
      //   text-align: center;
      //   display: flex;
      //   justify-content: center;
      //   left: 2px;
      //   font-size: 15px;
      //   color: white;
      // }
      // .checkbox:checked {
      //   background-color: var(--success-color);
      //   // outline: 1px solid var(--success-color);
      //   border: 1px solid transparent;
      //   border-radius: 3px;
      // }
      .bonus-data {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // width: 270px;
        .bonus-id-and-data {
          margin-left: 10.5px;
          // width: 189px;
          .order-id {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            word-break: break-all;
          }
          .receive-date {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            color: #9e9e9e;
          }
        }

        .bonus-amount {
          display: flex;
          align-items: center;
          .my-bonus-coin {
            margin-right: 2px;
            display: flex;
          }
          .bonuses-amount {
            font-size: 18px;
            line-height: 20px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
.submit {
  border-top: 1px solid #e0e0e0;
  .bonus-transfer-description {
    font-size: 12px;
    color: #9e9e9e;
    margin-left: 16px;
    margin-top: 4px;
  }
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
        color: #c1a14e;
      }
      .exchange-amount {
        color: #c1a14e;
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
.checkbox {
  width: 15px;
  height: 15px;
}
</style>
