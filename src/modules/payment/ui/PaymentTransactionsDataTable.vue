<template>
  <DataTable v-if="isTable" :columns="columns" :data="resolvedData">
    <template #order="{ rowIndex }">
      {{ rowIndex + 1 }}
    </template>
    <!-- <template #amount="{ record, text }">
      <Typography :color="record.isAmountNonNegative ? 'primary' : 'error'">
        {{ text }}
      </Typography>
    </template> -->
    <template #time="{ record }">
      <Typography component="div" size="tiny">{{ record.date }}</Typography>
      <Typography component="div" size="tiny">{{ record.time }}</Typography>
    </template>
    <template #orderId="{ record }">
      <Typography
        color="success"
        class="view"
        device="mobile"
        @click="openDialog(record)"
      >
        {{ record.orderId }}
      </Typography>
    </template>
    <template #amount="{ record }">
      <Typography v-if="record.amount.toString().includes('-')">
        {{ record.amount }}
      </Typography>
      <Typography v-else>
        {{ `+${record.amount}` }}
      </Typography>
    </template>
  </DataTable>
  <template v-else>
    <!-- <div class="expansionHeader">
      <div>
        <Typography
          v-for="text of texts"
          :key="text"
          component="div"
          color="surface"
        >
          {{ text }}
        </Typography>
      </div>
    </div> -->
    <OutlineCard>
      <ExpansionPanel v-for="(record, index) of resolvedData" :key="record.id">
        <div>{{ record }}</div>
        <template #header>
          <GridExpansionPanelHeader
            :data="record"
            :columns="gridExpansionPanelHeaderColumns"
          >
            <template #order>
              {{ index + 1 }}
            </template>
            <!-- <template #amount="{ text }">
              <Typography
                size="sm"
                :color="record.isAmountNonNegative ? 'primary' : 'error'"
              >
                {{ text }}
              </Typography>
            </template> -->
            <template #amount>
              <Typography v-if="record.amount.toString().includes('-')">
                {{ record.amount }}
              </Typography>
              <Typography v-else>
                {{ `+${record.amount}` }}
              </Typography>
            </template>
          </GridExpansionPanelHeader>
        </template>
        <template #content>
          <DoubleColumnList :data="record" :columns="expansionPanelListColumns">
            <!-- <template #amount="{ text }">
              <Typography
                size="sm"
                :color="record.isAmountNonNegative ? 'primary' : 'error'"
              >
                {{ text }}
              </Typography>
            </template> -->
            <template #amount>
              <Typography
                v-if="record.amount.toString().includes('-')"
                device="mobile"
              >
                {{ record.amount }}
              </Typography>
              <Typography v-else device="mobile">
                {{ `+${record.amount}` }}
              </Typography>
            </template>
            <template #time>
              <Typography component="span" size="sm">
                {{ record.date }}&nbsp;{{ record.time }}
              </Typography>
            </template>
            <template #orderId>
              <Typography
                color="success"
                class="view"
                device="mobile"
                @click="openDialog(record)"
              >
                {{ record.orderId }}
              </Typography>
            </template>
          </DoubleColumnList>
        </template>
      </ExpansionPanel>
    </OutlineCard>
  </template>
  <PaymentsHistoryDetail
    v-model:visible="openPaymentsHistoryDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
  <GameHistoryDetail
    v-model:visible="openGameHistoryDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
  <WithdrawPaymentsHistoryDetail
    v-model:visible="openWithdrawPaymentsHistoryDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
  <AccountingAdjustmentDetail
    v-model:visible="openAccountingAdjustmentDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
  <RebateDetail
    v-model:visible="openRebateDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
  <BonusTransferDetail
    v-model:visible="openBonusTransferDetail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import {
  computed,
  defineProps,
  toRefs,
  withDefaults,
  ref,
  onMounted,
} from 'vue';
import DataTable, { DataTableColumn } from '@/components/DataTable.vue';
import GridExpansionPanelHeader, {
  GridExpansionPanelHeaderColumn,
} from '@/components/GridExpansionPanelHeader.vue';
import { toDollarsAmount } from '@/libs/dollars';
import {
  PAYMENT_TRANSACTION_KINE_I18N_KEYS,
  ACCOUNT_ADJUSTIMENT_STATUS_I18N_KEYS,
} from '../domain/payment.i18n';
import {
  PaymentTransaction,
  PaymentTransactionDetails,
  PaynentTransactionsDetail,
  UserInfo,
} from '../domain/payment.model';
import DoubleColumnList, {
  DoubleColumnListColumn,
} from '@/components/DoubleColumnList.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import Typography from '@/components/Typography.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import PaymentsHistoryDetail from '@/modules/paymentsHistory/ui/PaymentsHistoryDetail.vue';
import GameHistoryDetail from '@/modules/gameHistory/ui/GameHistoryDetail.vue';
import {
  getAccountingAdjustmentDetail,
  getPaymentsHistoryDetail,
  getRebateDetail,
  getWithdrawPaymentsHistoryDetail,
} from '../infrastructure/payment.api';
import { PAYMENT_HISTORY_KINE_I18N_KEYS } from '@/modules/paymentsHistory/domain/paymentsHistory.i18n';
import {
  PaymentType,
  WithdrawalOrderObject,
  WithdrawPaymentsHistory,
} from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import { getPaymentOption } from '@/modules/paymentsHistory/infrastructure/paymentsHistory.api';
import WithdrawPaymentsHistoryDetail from '@/modules/paymentsHistory/ui/WithdrawPaymentsHistoryDetail.vue';
import AccountingAdjustmentDetail from '@/modules/payment/ui/AccountingAdjustmentDetail.vue';
import RebateDetail from './RebateDetail.vue';
import BonusTransferDetail from '@/modules/bonusesHistory/ui/BonusTransferDetail.vue';
import { BonusesHistoryDetails } from '@/modules/bonusesHistory/domain/bounusesHistory.model';

const { t } = useI18n();
const paymentOption = ref<PaymentType[]>([]);

// const texts: readonly string[] = ['Order', 'Type', 'Time', 'Amount', 'After'];

// DataTable
const columns: DataTableColumn<typeof resolvedData.value[number]>[] = [
  {
    key: 'order',
    header: 'No.',
  },
  {
    key: 'kind',
    header: 'Type',
    data: 'kind',
  },
  {
    key: 'orderId',
    header: 'Serial Number',
    data: 'orderId',
  },
  {
    key: 'before',
    header: 'Before',
    data: 'before',
  },
  {
    key: 'amount',
    header: 'Amount',
    data: 'amount',
  },
  {
    key: 'after',
    header: 'After',
    data: 'after',
  },
  {
    key: 'time',
    header: 'Complete',
  },
  {
    key: 'item',
    header: 'Name',
    data: 'item',
  },
];

const props = withDefaults(
  defineProps<{
    contentData: PaymentTransaction[];
    isTable: boolean;
    walletDetail: PaymentTransactionDetails[];
  }>(),
  {
    contentData: () => [],
    walletDetail: () => [],
    // isTable: false,
  }
);

const { contentData, isTable, walletDetail } = toRefs(props);

const resolvedData = computed(() =>
  contentData.value.map((record) => {
    const time = moment(record.time);
    const amount = record.afterAmount - record.beforeAmount;

    return {
      ...record,
      kind: t(PAYMENT_TRANSACTION_KINE_I18N_KEYS[record.kind]),
      before: toDollarsAmount(record.beforeAmount),
      amount: toDollarsAmount(amount),
      // isAmountNonNegative: amount >= 0,
      after: toDollarsAmount(record.afterAmount),
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
    };
  })
);
// ExpansionPanel
const gridExpansionPanelHeaderColumns: GridExpansionPanelHeaderColumn<PaymentTransaction>[] =
  [
    {
      key: 'kind',
      data: 'kind',
    },
    {
      key: 'time',
      data: 'date',
    },
    {
      key: 'amount',
      data: 'amount',
    },
  ];

const expansionPanelListColumns: DoubleColumnListColumn<
  typeof resolvedData.value[number]
>[] = [
  {
    key: 'kind',
    header: 'Type',
  },
  {
    key: 'orderId',
    header: 'Serial Number',
  },
  {
    key: 'before',
    header: 'Before',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'after',
    header: 'After',
  },
  {
    key: 'time',
    header: 'Complete',
  },
  {
    key: 'item',
    header: 'Name',
  },
];

// -----------------------------------------點擊view打開詳細清單-----------------------------
const openPaymentsHistoryDetail = ref(false);
const openGameHistoryDetail = ref(false);
const openWithdrawPaymentsHistoryDetail = ref(false);
const openAccountingAdjustmentDetail = ref(false);
const openRebateDetail = ref(false);
const openBonusTransferDetail = ref(false);

const detail = ref<PaynentTransactionsDetail | null>(null);
const bonusTransferDetailData = ref<BonusesHistoryDetails[]>([]);
function openDialog(record: PaynentTransactionsDetail | null) {
  if (record?.kind === 'Deposit') {
    getPaymentsHistoryDetail({ orderId: record.orderId }).then((data) => {
      const payAtTime =
        data.payAt !== null
          ? moment(record.payAt).format('YYYY-MM-DD HH:mm:ss')
          : '--';
      const dateAndTime = moment(data.time).format('YYYY-MM-DD HH:mm:ss');
      const depositAccount =
        data.bankAccount.length > 0 ? record.bankAccount : '--';
      const depositBank = data.bankCode?.length > 0 ? record.bankCode : '--';
      const paymentTypeOptionData = paymentOption.value.find(
        (element) => element.id === data.paymentType
      );
      const paymentTypeOption = paymentTypeOptionData?.name;

      detail.value = {
        ...data,
        payAtTime,
        dateAndTime,
        depositAccount,
        depositBank,
        paymentTypeOption,
        status: t(PAYMENT_HISTORY_KINE_I18N_KEYS[data.status]),
      };
      openPaymentsHistoryDetail.value = true;
    });
  } else if (record?.kind === 'Withdraw') {
    getWithdrawPaymentsHistoryDetail({ applyId: record.orderId }).then(
      (data: WithdrawPaymentsHistory) => {
        const withdrawBank =
          data.withdrawalApply.bankName?.length > 0
            ? data.withdrawalApply.bankName
            : '--';
        const withdrawAccount =
          data.withdrawalApply.bankAccount?.length > 0
            ? data.withdrawalApply.bankAccount
            : '--';
        const { device, clientIp, amount, id } = data.withdrawalApply;
        const reviewdDateAndTime =
          data.withdrawalApply.reviewedAt > 0
            ? moment(data.withdrawalApply.reviewedAt).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            : '--';
        const dateAndTime =
          data.withdrawalApply.time > 0
            ? moment(data.withdrawalApply.time).format('YYYY-MM-DD HH:mm:ss')
            : '--';

        const paymentTypeOptionData = paymentOption.value.find(
          (element) => element.id === data.withdrawalApply.withdrawalType
        );
        const paymentTypeOption = paymentTypeOptionData?.name || '--';

        let applyStatusM;

        if (data.withdrawalApply.status === 0) {
          applyStatusM = 'Apply Processing';
        } else if (data.withdrawalApply.status === 1) {
          applyStatusM = 'Apply pass';
        } else {
          applyStatusM = 'Apply Failed';
        }

        let orderStatusM;

        if (data.withdrawalApply.lastOrderStatus === 0) {
          orderStatusM = 'Withdraw Processing';
        } else if (data.withdrawalApply.lastOrderStatus === 1) {
          orderStatusM = 'Withdraw Successed';
        } else if (data.withdrawalApply.lastOrderStatus < 0) {
          orderStatusM = 'Withdraw Failed';
        } else {
          orderStatusM = '--';
        }

        const orderMap = ref<WithdrawalOrderObject[]>([]);
        orderMap.value = data.withdrawalOrders;

        const found = orderMap.value.find(
          (element) => element.applyId === data.withdrawalOrders.id
        );
        const withdrawalId = found ? found.id : '--';
        const payAtDay = found
          ? moment(found.payAt).format('YYYY-MM-DD HH:mm:ss')
          : '--';

        detail.value = {
          ...data,
          withdrawBank,
          withdrawAccount,
          device,
          clientIp,
          reviewdDateAndTime,
          amount,
          id,
          dateAndTime,
          applyStatusM,
          orderStatusM,
          paymentTypeOption,
          payAtDay,
          withdrawalId,
        };
        openWithdrawPaymentsHistoryDetail.value = true;
      }
    );
  } else if (record?.kind === 'Game') {
    const { item, amount, orderId } = record;
    detail.value = {
      item,
      amount,
      orderId,
    };
    openGameHistoryDetail.value = true;
  } else if (record?.kind === 'Account Adjustment') {
    getAccountingAdjustmentDetail({ orderNo: record.orderId }).then((data) => {
      const adjustmentReason = data.accountingAdjustment.applyReason;
      const { amount, beforeAmount, afterAmount, orderId } = record;
      const adjustmentTime =
        data.accountingAdjustment.reviewedAt !== null
          ? moment(data.accountingAdjustment.reviewedAt).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          : '--';
      detail.value = {
        ...data,
        amount,
        beforeAmount,
        afterAmount,
        adjustmentTime,
        orderId,
        adjustmentReason,
        adjustmentStatus: t(
          ACCOUNT_ADJUSTIMENT_STATUS_I18N_KEYS[data.accountingAdjustment.status]
        ),
      };
      openAccountingAdjustmentDetail.value = true;
    });
  } else if (record?.kind === 'Rebate') {
    getRebateDetail({ id: record.orderId }).then((data) => {
      const { amount, orderId } = record;
      const rebateTime =
        data.createAt !== null
          ? moment(data.createAt).format('YYYY-MM-DD HH:mm:ss')
          : '--';

      const rebateRate = `${Math.round(data.rate * 100) / 100.0}%`;
      detail.value = {
        ...data,
        orderId,
        amount,
        rebateTime,
        rebateRate,
      };
      openRebateDetail.value = true;
    });
  } else if (record?.kind === 'Wallet Transfer') {
    const dateAndTime = `${record.date} ${record.time}`;
    bonusTransferDetailData.value = walletDetail.value;
    const found = bonusTransferDetailData.value.filter(
      (element) => element.logId === record.id
    );
    const transferedBonusId = found.map((element) => element.orderId);
    detail.value = { ...record, transferedBonusId, dateAndTime };
    openBonusTransferDetail.value = true;
  }
}
function close() {
  openPaymentsHistoryDetail.value = false;
  openGameHistoryDetail.value = false;
  openWithdrawPaymentsHistoryDetail.value = false;
  openAccountingAdjustmentDetail.value = false;
  openRebateDetail.value = false;
  openBonusTransferDetail.value = false;
}

const userData = ref<UserInfo | null>(null);
onMounted(() => {
  getPaymentOption().then((data) => {
    paymentOption.value = data;
  });
  const userStore = useUserStore();

  const { userInfo } = userStore;
  const playerName = `${userInfo?.firstname} ${userInfo?.lastname}`;
  userData.value = { ...userInfo, playerName };
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.view:hover {
  cursor: pointer;
}
</style>
