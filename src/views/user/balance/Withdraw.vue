<template>
  <Container>
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.balance_withdraw.title')"
        :define="t('payment.balance_withdraw.define')"
      />

      <FiltersWrap
        v-model:start-time="startTime"
        v-model:end-time="endTime"
        :date-limits="dateLimits"
        @handleSearch="onSearchWalletEvents(searchWalletForm.values.value)"
      >
        <FiltersWrapItem>
          <div class="selector">
            <span class="selector-label">
              {{ t('common.type') }}
            </span>
            <select v-model="kind" class="selector-input">
              <option :value="PaymentTransactionKindOther.SEE_ALL">
                {{ t('payment.transaction.kind.SEE_ALL') }}
              </option>
              <option
                v-for="(type, index) of paymentTransactionKindTypes"
                v-show="
                  type !==
                  PaymentTransactionKindOther[
                    PaymentTransactionKindOther.SEE_ALL
                  ]
                "
                :key="type"
                :value="index"
              >
                {{ t(`payment.transaction.kind.${type}`) }}
                =======
              </option>

              <option :value="PaymentTransactionKindOther.DEPOSIT">
                {{ t('payment.transaction.kind.DEPOSIT') }}
              </option>
              <option :value="PaymentTransactionKindOther.ACCOUNT_ADJUSTMENT">
                {{ t('payment.transaction.kind.ACCOUNT_ADJUSTMENT') }}
              </option>
              <option :value="PaymentTransactionKindOther.GAME">
                {{ t('payment.transaction.kind.GAME') }}
              </option>
              <option :value="PaymentTransactionKindOther.WALLET_TRANSFER">
                {{ t('payment.transaction.kind.WALLET_TRANSFER') }}
              </option>
            </select>
            <IconBase
              :width="20"
              :height="20"
              viewBox="0 0 9 6"
              class="selector-icon"
            >
              <IconFilledArrow />
            </IconBase>
          </div>
        </FiltersWrapItem>
      </FiltersWrap>
    </div>
    <DataTable v-if="isTable" :data="content" :columns="withdrawColumns">
      <template #order="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
      <template #kind="{ record }">
        {{ PaymentTransactionKind[record.kind] }}
      </template>
      <template #orderId="{ record, text }">
        <Text
          class="serialNumber"
          color="success"
          device="mobile"
          @click="openDialog(record)"
        >
          {{ text }}
        </Text>
      </template>
      <!-- <template #amount="{ text }">
        <a href="#">
          <Text :color="text >= 0 ? 'primary' : 'error'">{{ text }}</Text>
        </a>
      </template> -->
      <template #remark="{ record }">
        {{ `${record.item} ${record.remark}` }}
      </template>
      <template #time="{ text }">
        {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
      </template>
    </DataTable>
    <template v-else>
      <OutlineCard>
        <ExpansionPanel v-for="(record, index) of content" :key="record.id">
          <template #header>
            <GridExpansionPanelHeader
              :data="record"
              :columns="withdrawPanelColumns"
            >
              <template #order>
                {{ index + 1 }}
              </template>
              <template #date>
                <Text component="div" size="tiny">{{ record.date }}</Text>
              </template>
              <template #kind>
                {{ PaymentTransactionKind[record.kind] }}
              </template>
              <!-- <template #amount="{ text }">
                <a href="#">
                  <Text
                    device="mobile"
                    :color="text >= 0 ? 'primary' : 'error'"
                  >
                    {{ text }}
                  </Text>
                </a>
              </template> -->
              <template #time="{ text }">
                {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
              </template>
            </GridExpansionPanelHeader>
          </template>
          <template #content>
            <DoubleColumnList
              :data="record"
              :columns="gridExpansionPanelHeaderColumns"
            >
              <template #remark>
                {{ `${record.item} ${record.remark}` }}
              </template>
              <template #kind>
                {{ PaymentTransactionKind[record.kind] }}
              </template>
              <!-- <template #amount="{ text }">
                <a href="#">
                  <Text
                    device="mobile"
                    :color="text >= 0 ? 'primary' : 'error'"
                  >
                    {{ text }}
                  </Text>
                </a>
              </template> -->
              <template #time="{ text }">
                {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
              </template>
              <template #orderId="{ text }">
                <Text
                  class="serialNumber"
                  color="success"
                  device="mobile"
                  @click="openDialog(record)"
                >
                  {{ text }}
                </Text>
              </template>
            </DoubleColumnList>
          </template>
        </ExpansionPanel>
      </OutlineCard>
    </template>
    <Pagination
      v-model:page="nowPage"
      :total-rows="totalRows"
      @update:page="updatePlayerWallet(searchWalletForm.values.value)"
    />

    <PaymentsHistoryDetail
      v-model:visible="openPaymentsHistoryDetail"
      :data="{ ...detail, ...userData }"
      @close="close"
    />

    <GameHistoryDetail
      v-model:visible="openBonusesHistoryDetail"
      :data="{ ...detail, ...userData }"
      @close="close"
    />

    <AccountingAdjustmentDetail
      v-model:visible="openAccountingAdjustmentDetail"
      :data="{ ...detail, ...userData }"
      @close="close"
    />
  </Container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';

import FormGroup from 'vue-reactive-form';
import {
  getAccountingAdjustmentDetail,
  getPaymentsHistoryDetail,
  getPaymentTransactionsOther,
} from '@/modules/payment/infrastructure/payment.api';
import { SearchPlayerWalletLogFormOther } from '@/modules/userBalance/infrastructure/api/balanceApi';
import Container from '@/layout/Container.vue';
import IconBase from '@/components/icons/IconBase.vue';
import Heading from '@/components/Heading.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';
import {
  GetPaymentTransactionsDtoOther,
  PaymentTransaction,
  PaymentTransactionKind,
  PaymentTransactionKindOther,
  PaymentTransactionType,
  WithdrawDetail,
} from '@/modules/payment/domain/payment.model';
import DataTable from '@/components/DataTable.vue';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import Pagination from '@/components/Pagination.vue';
import Text from '@/components/Typography.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import { toDollarsAmount } from '@/libs/dollars';
import { formatTime } from '@/libs/date';
import FiltersWrap from '@/components/FiltersWrap.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';
// import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';
import PaymentsHistoryDetail from '@/modules/paymentsHistory/ui/PaymentsHistoryDetail.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import { getPaymentOption } from '@/modules/paymentsHistory/infrastructure/paymentsHistory.api';
import { PAYMENT_HISTORY_KINE_I18N_KEYS } from '@/modules/paymentsHistory/domain/paymentsHistory.i18n';
import GameHistoryDetail from '@/modules/gameHistory/ui/GameHistoryDetail.vue';
import AccountingAdjustmentDetail from '@/modules/payment/ui/AccountingAdjustmentDetail.vue';
import {
  PaymentType,
  UserInfo,
} from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import { ACCOUNT_ADJUSTIMENT_STATUS_I18N_KEYS } from '@/modules/payment/domain/payment.i18n';

const withdrawColumns = [
  {
    key: 'order',
    header: 'Order',
    data: 'order',
  },
  {
    key: 'kind',
    header: 'Type',
    data: 'kind',
  },
  {
    key: 'beforeAmount',
    header: 'Before',
    data: 'beforeAmount',
  },
  {
    key: 'amount',
    header: 'Amount',
    data: 'amount',
  },
  {
    key: 'afterAmount',
    header: 'After',
    data: 'afterAmount',
  },
  {
    key: 'time',
    header: 'Completed',
    data: 'time',
  },
  {
    key: 'orderId',
    header: 'Serial Number',
    data: 'orderId',
  },
  {
    key: 'remark',
    header: 'Detailed',
    data: 'remark',
  },
];
const withdrawPanelColumns = [
  {
    key: 'kind',
    header: 'Type',
    data: 'kind',
  },
  {
    key: 'time',
    header: 'Completed',
    data: 'time',
  },
  {
    key: 'amount',
    header: 'Amount',
    data: 'amount',
  },
];

const gridExpansionPanelHeaderColumns = [
  {
    key: 'kind',
    header: 'Type',
    data: 'kind',
  },
  {
    key: 'beforeAmount',
    header: 'Before',
    data: 'beforeAmount',
  },
  {
    key: 'amount',
    header: 'Amount',
    data: 'amount',
  },
  {
    key: 'afterAmount',
    header: 'After',
    data: 'afterAmount',
  },
  {
    key: 'time',
    header: 'Completed',
    data: 'time',
  },
  {
    key: 'orderId',
    header: 'Serial Number',
    data: 'orderId',
  },
  {
    key: 'remark',
    header: 'Detailed',
    data: 'remark',
  },
];

// Turn enum into array
// const paymentTransactionKindTypes: (string | PaymentTransactionKindOther)[] =
//   Object.values(PaymentTransactionKindOther).filter(
//     (item) => typeof item === 'string'
//   );

// use i18n
const { t } = useI18n();
const paymentOption = ref<PaymentType[]>([]);
// // RWD
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);

// 限制可搜尋之日期區間
const dateLimits = {
  minDate: moment().subtract(1, 'months').toDate(),
  maxDate: new Date(),
};

const searchWalletForm = new FormGroup<SearchPlayerWalletLogFormOther>({
  page: 1,
  size: 20,
  startTime: moment().subtract(7, 'days').toDate(),
  endTime: new Date(),
  type: PaymentTransactionType.WITHDRAWAL_LIMIT,
  kind: PaymentTransactionKindOther.SEE_ALL,
});
const { startTime, endTime, page: nowPage, kind } = searchWalletForm.refs;

let queryObject: GetPaymentTransactionsDtoOther = {
  page: 1,
  size: 20,
  startTime: moment().subtract(7, 'days').toDate(),
  endTime: new Date(),
  type: PaymentTransactionType.WITHDRAWAL_LIMIT,
  kind: PaymentTransactionKindOther.SEE_ALL,
};

const content = ref<PaymentTransaction[]>([]);
const totalRows = ref<number>(0);

async function updatePlayerWallet({ page }: GetPaymentTransactionsDtoOther) {
  if (queryObject.kind === -1) {
    delete queryObject.kind;
  }

  queryObject.page = page;
  const { content: resContent, totalElements } =
    await getPaymentTransactionsOther(queryObject);
  resContent.forEach((data, index) => {
    resContent[index].amount = toDollarsAmount(Number(data.amount));
    resContent[index].beforeAmount = toDollarsAmount(Number(data.beforeAmount));
    resContent[index].afterAmount = toDollarsAmount(Number(data.afterAmount));
    if (data.amount > 0) {
      resContent[index].amount = `+${data.amount}`;
    }
  });

  totalRows.value = totalElements;
  content.value = resContent;
}

const onSearchWalletEvents = ({ ...rest }: GetPaymentTransactionsDtoOther) => {
  // console.log(rest);
  nowPage.value = 1;
  queryObject = { ...rest };
  updatePlayerWallet(searchWalletForm.values.value);
};

const detail = ref<WithdrawDetail | null>(null);
const openPaymentsHistoryDetail = ref(false);
const openBonusesHistoryDetail = ref(false);
const openAccountingAdjustmentDetail = ref(false);

function openDialog(record: WithdrawDetail | null) {
  if (record?.kind === 1) {
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
  }
  if (record?.kind === 4) {
    openBonusesHistoryDetail.value = true;
  }
  if (record?.kind === 3) {
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
  }

  detail.value = record;
  // console.log(record?.kind);
}
function close() {
  openPaymentsHistoryDetail.value = false;
  openBonusesHistoryDetail.value = false;
  openAccountingAdjustmentDetail.value = false;
}
const userData = ref<UserInfo | null>(null);
onMounted(() => {
  updatePlayerWallet(searchWalletForm.values.value);
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
.serialNumber {
  cursor: pointer;
}
.expansionHeader {
  width: 100%;
  display: grid;
  grid-template-columns: 15fr 1fr;
  align-items: center;
  box-sizing: border-box;
  padding: 18px 28px;

  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  }

  @include mobile {
    padding: 0 16px 18px 16px;
  }
}
.selector {
  position: relative;
  overflow: hidden;

  &-label {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 12px;
    line-height: 16px;
    color: var(--primary-color);
  }

  &-input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 8px 16px;
    padding-top: 24px;
    color: #424242;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: #fff;

    &:focus {
      background-color: #f5f5f5;
      border-color: var(--primary-color);
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &-icon {
    position: absolute;
    top: 20px;
    right: 16px;
  }

  option {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 22px;
    color: var(--primary-color);
  }
}
</style>
