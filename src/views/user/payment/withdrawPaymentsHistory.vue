<template>
  <FiltersWrap
    v-model:start-time="startDate"
    v-model:end-time="endDate"
    :date-limits="dateLimits"
    @handleSearch="onSearchWalletEvents"
  >
    <FiltersWrapItem>
      <div class="selector">
        <span class="selector-label">
          {{ t('common.type') }}
        </span>
        <select v-model="lastOrderStatusShrink" class="selector-input">
          <option :value="99">
            {{ t('paymentshistory.option.see_all') }}
          </option>
          <option :value="4">
            {{ t('paymentshistory.option.Apply_Processing') }}
          </option>
          <option :value="3">
            {{ t('paymentshistory.option.Apply_Successed') }}
          </option>
          <option :value="2">
            {{ t('paymentshistory.option.Apply_Failed') }}
          </option>
          <option :value="-1">
            {{ t('paymentshistory.option.Withdraw_Failed') }}
          </option>
          <option :value="0">
            {{ t('paymentshistory.option.Withdraw_Processing') }}
          </option>
          <option :value="1">
            {{ t('paymentshistory.option.Withdraw_Successed') }}
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
  <DataTable v-if="isTable" :columns="columns" :data="resolvedData">
    <!-- <template #newStatus="{ record, text }">
      <Text
        :color="
          record.newStatus.length === 18 ||
          record.newStatus.length === 19 ||
          record.newStatus.length === 16
            ? 'primary'
            : 'error'
        "
      >
        {{ text }}
      </Text>
    </template> -->
    <template #order="{ rowIndex }">
      {{ rowIndex + 1 }}
    </template>
    <template #time="{ record }">
      <Text component="div" size="tiny">{{ record.date }}</Text>
      <Text component="div" size="tiny">{{ record.time }}</Text>
    </template>
    <template #id="{ record }">
      <Text
        color="success"
        device="mobile"
        class="view"
        @click="openDialog(record)"
      >
        {{ record.id }}
      </Text>
    </template>
  </DataTable>
  <template v-else>
    <OutlineCard>
      <ExpansionPanel v-for="(record, index) of resolvedData" :key="record.id">
        <template #header>
          <GridExpansionPanelHeader
            :data="record"
            :columns="gridExpansionPanelHeaderColumns"
          >
            <template #order>
              {{ index + 1 }}
            </template>
            <template #time>{{ record.date }}&nbsp;{{ record.time }}</template>
            <!-- <template #status="{ text }">
              <Text
                size="sm"
                :color="
                  record.newStatus.length === 18 ||
                  record.newStatus.length === 19 ||
                  record.newStatus.length === 16
                    ? 'primary'
                    : 'error'
                "
              >
                {{ text }}
              </Text>
            </template> -->
          </GridExpansionPanelHeader>
        </template>
        <template #content>
          <DoubleColumnList :data="record" :columns="expansionPanelListColumns">
            <!-- <template #newStatus="{ text }">
              <Text
                device="mobile"
                :color="
                  record.newStatus.length === 18 ||
                  record.newStatus.length === 19 ||
                  record.newStatus.length === 16
                    ? 'primary'
                    : 'error'
                "
              >
                {{ text }}
              </Text>
            </template> -->
            <template #time>
              <Text component="span" device="mobile">
                {{ record.date }}&nbsp;{{ record.time }}
              </Text>
            </template>
            <!-- <template #detailed>
              <a href="#">
                <Text
                  color="success"
                  device="mobile"
                  @click="openDialog(record)"
                >
                  {{ t('common.view') }}
                </Text>
              </a>
            </template> -->
            <template #id>
              <Text
                color="success"
                device="mobile"
                class="view"
                @click="openDialog(record)"
              >
                {{ record.id }}
              </Text>
            </template>
          </DoubleColumnList>
        </template>
      </ExpansionPanel>
    </OutlineCard>
  </template>
  <Pagination
    v-model:page="page"
    :total-rows="totalrows"
    @click="updateCompletionEvent"
  />
  <WithdrawPaymentsHistoryDetail
    v-model:visible="detail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import DataTable from '@/components/DataTable.vue';
import {
  WithdrawSearchCompletedUserEventForm,
  WithdrawalOrderObject,
  WithdrawPaymentsHistory,
  UserInfo,
  PaymentType,
  GetWithdrawPaymentsHistoryDto,
} from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import Text from '@/components/Typography.vue';
import {
  getWithdrawPaymentsHitory,
  getPaymentOption,
} from '@/modules/paymentsHistory/infrastructure/paymentsHistory.api';
import { PAYMENT_HISTORY_WITHDRAW_I18N_KEYS } from '@/modules/paymentsHistory/domain/paymentsHistory.i18n';
import { toDollarsAmount } from '@/libs/dollars';
import { Device } from '@/core/mediaQuery/device';
import { useDevice } from '@/core/mediaQuery/useDevice';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import Pagination from '@/components/Pagination.vue';
// import { updateCompletionEvent } from '@/modules/userBonuses/application/bonuses';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import IconBase from '@/components/icons/IconBase.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import WithdrawPaymentsHistoryDetail from '@/modules/paymentsHistory/ui/WithdrawPaymentsHistoryDetail.vue';
import FiltersWrap from '@/components/FiltersWrap.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';

const { t } = useI18n();
const paymentType = ref<PaymentType[]>([]);

const columns = [
  {
    key: 'order',
    header: 'No.',
  },
  {
    key: 'id',
    header: 'Audit number',
    data: 'id',
  },
  {
    key: 'WithdrawalId',
    header: 'Withdrawal number',
    data: 'withdrawalId',
  },
  {
    key: 'time',
    header: 'Date',
    data: 'time',
  },
  {
    key: 'amount',
    header: 'Amount',
    data: 'amount',
  },
  // {
  //   key: 'status',
  //   header: 'applyStatus',
  //   data: 'applyStatusM',
  // },
  // {
  //   key: 'lastOrderStatus',
  //   header: 'lastOrderStatus',
  //   data: 'orderStatusM',
  // },
  {
    key: 'newStatus',
    header: 'Status',
    data: 'newStatus',
  },
];

const gridExpansionPanelHeaderColumns = [
  {
    key: 'Audit number',
    data: 'id',
  },
  {
    key: 'time',
    data: 'day',
  },
  {
    key: 'amount',
    data: 'amount',
  },
  // {
  //   key: 'status',
  //   data: 'newStatus',
  // },
];

const expansionPanelListColumns = [
  {
    key: 'id',
    header: 'Audit number',
  },
  {
    key: 'withdrawalId',
    header: 'Withdrawal number',
  },
  {
    key: 'time',
    header: 'Date',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'newStatus',
    header: 'Status',
  },
];
// 限制可搜尋之日期區間
const dateLimits = {
  minDate: moment().subtract(3, 'months').toDate(),
  maxDate: new Date(),
};
const searchCompletedForm = new FormGroup<WithdrawSearchCompletedUserEventForm>(
  {
    // formData
    startDate: moment().subtract(0, 'months').toDate(),
    endDate: new Date(),
    page: 1,
    lastOrderStatusShrink: 99,
    status: -1,
  }
);
const { startDate, endDate, lastOrderStatusShrink, page } =
  searchCompletedForm.refs;

const totalrows = ref(0);
const orderMap = ref<WithdrawalOrderObject>();
const list = ref<WithdrawPaymentsHistory[]>([]);

// ------------------------------------切換頁面----------------------------------

function updateCompletionEvent() {
  const update: GetWithdrawPaymentsHistoryDto = {
    startTime: searchCompletedForm.refs.startDate.value,
    endTime: searchCompletedForm.refs.endDate.value,
    page: page.value - 1,
    size: 20,
    lastOrderStatusShrink: lastOrderStatusShrink.value,
  };
  if (update.lastOrderStatusShrink === 99) {
    delete update.lastOrderStatusShrink;
  }

  if (update.lastOrderStatusShrink === 4) {
    delete update.lastOrderStatusShrink;
    update.status = 0;
  } else if (update.lastOrderStatusShrink === 2) {
    delete update.lastOrderStatusShrink;
    update.status = 2;
  } else if (update.lastOrderStatusShrink === 3) {
    delete update.lastOrderStatusShrink;
    update.status = 1;
  }

  // ----------------------------------優化靈感(Hung)---------------------------------
  // // apply.status
  // if (stausOptions === 0) update.status = -1;
  // if (stausOptions === 1) update.status = 1;
  // if (stausOptions === 2) update.status = 2;

  // // order
  // if (stausOptions === 3) update.lastOrderStatusShrink = -1;
  // if (stausOptions === 4) update.lastOrderStatusShrink = 0;
  // if (stausOptions === 5) update.lastOrderStatusShrink = 1;

  // 選擇時觸發
  // funtion statusOptionChangeLinstner() {

  // // apply.status
  //   if(stausOptions ==3 )
  //       formData.lastOrderStatusShrink = -1;

  // // order
  //     if(stausOptions ==3 )
  //       formData.lastOrderStatusShrink = -1;
  // if(stausOptions ==4 )
  //       formData.lastOrderStatusShrink = 0;
  //     if(stausOptions ==3 )
  //       formData.lastOrderStatusShrink = 1;

  // }

  getWithdrawPaymentsHitory(update).then(
    ({ withdrawalApplies, withdrawalOrders }) => {
      list.value = withdrawalApplies.content;
      totalrows.value = withdrawalApplies.totalElements;

      orderMap.value = withdrawalOrders;

      list.value = withdrawalApplies.content.map((item) => {
        const found = orderMap.value?.find(
          (element: { applyId: string }) => element.applyId === item.id
        );
        const foundPaymentType = paymentType.value.find(
          (element) => element.id === item.withdrawalType
        );
        const paymentTypeOption = foundPaymentType?.name || '--';
        // console.log('555555555555', paymentTypeOption);

        let applyStatusM;

        if (item.status === 0) {
          applyStatusM = 'Apply Processing';
        } else if (item.status === 1) {
          applyStatusM = 'Apply Successed';
        } else {
          applyStatusM = 'Apply Failed';
        }

        let orderStatusM;

        if (item.lastOrderStatus === 0) {
          orderStatusM = 'Withdraw Processing';
        } else if (item.lastOrderStatus === 1) {
          orderStatusM = 'Withdraw Successed';
        } else if (item.lastOrderStatus < 0) {
          orderStatusM = 'Withdraw Failed';
        } else {
          orderStatusM = '--';
        }

        let newStatus;
        if (item.lastOrderStatus != null) {
          newStatus = orderStatusM;
        } else {
          newStatus = applyStatusM;
        }

        const withdrawalStatus =
          item.status === 1 ? item.lastOrderStatus : item.status;

        const withdrawalId = found ? found.id : '--';
        const payTime = found ? found.payAt : null;

        return {
          ...item,
          payTime,
          withdrawalId,
          withdrawalStatus,
          newStatus,
          applyStatusM,
          orderStatusM,
          paymentTypeOption,
        };
      });

      // console.log('list', list);
    }
  );
}
// ----------------------------------綁在搜尋---onSearchWalletEvents---------------------------------------------------
const onSearchWalletEvents = () => {
  page.value = 1;
  updateCompletionEvent();
};
// -----------------------------------------點擊view打開詳細清單-----------------------------
const detail = ref<WithdrawPaymentsHistory | null>(null);
function openDialog(record: WithdrawPaymentsHistory | null) {
  detail.value = record;
  // console.log('detail.value-----------------', detail.value);
}
function close() {
  detail.value = null;
}
// 感應裝置大小
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);
// ---------------------------------------串接API-------------------------------
const userData = ref<UserInfo | null>(null);

onMounted(() => {
  getPaymentOption().then((data) => {
    paymentType.value = data;
    // console.log('payment----------', paymentType.value);
    updateCompletionEvent();
  });

  const userStore = useUserStore();

  const { userInfo } = userStore;
  const playerName = `${userInfo?.firstname} ${userInfo?.lastname}`;
  userData.value = { ...userInfo, playerName };
});

// 轉換資料格式(Withdraw)
const resolvedData = computed(() =>
  list.value.map((record) => {
    const time = moment(record.time);
    const reviewdDay = moment(record.reviewedAt);
    const payDay = moment(record.payTime);
    const payAtDay =
      record.payTime !== null ? payDay.format('YYYY-MM-DD HH:mm:ss') : '--';
    const withdrawBank = record.bankName?.length > 0 ? record.bankName : '--';
    const withdrawAccount =
      record.bankAccount?.length > 0 ? record.bankAccount : '--';
    const reviewdDateAndTime =
      record.reviewedAt > 0 ? reviewdDay.format('YYYY-MM-DD HH:mm:ss') : '--';

    return {
      ...record,
      payAtDay,
      withdrawBank,
      withdrawAccount,
      status: t(PAYMENT_HISTORY_WITHDRAW_I18N_KEYS[record.status]),
      amount: toDollarsAmount(record.amount),
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      day: time.format('MM-DD'),
      dateAndTime: time.format('YYYY-MM-DD HH:mm:ss'),
      reviewdDateAndTime,
    };
  })
);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.view:hover {
  cursor: pointer;
}
.search-input-group {
  display: flex;
  margin-bottom: 20px;

  @include tablet-v() {
    width: 100%;
  }

  @include mobile() {
    flex-direction: column;
    margin-bottom: 24px;
  }
}

.input-group {
  display: flex;

  @include mobile() {
    margin-bottom: 10px;
    display: block;
    width: 100%;
  }
}

.input-search {
  width: 260px;
  margin-right: 10px;

  @include tablet-h() {
    width: 232px;
  }

  @include tablet-v() {
    width: 162.67px;
  }

  @include mobile() {
    width: 320px;
    width: 100%;
    margin-bottom: 10px;
  }
}

.input-date {
  display: flex;
}
.start-date {
  margin-right: 10px;
}
.p-input-filled {
  width: 260px;
  width: 100%;
  height: 56px;

  @include tablet-h() {
    width: 100%;
    max-width: 232px;
  }

  @include tablet-v() {
    width: 100%;
    max-width: 162.67px;
  }

  @include mobile() {
    width: 360px;
  }
}

.input-search .p-input-filled {
  width: 100%;
}
//按鈕區塊
.button-group {
  display: flex;
  margin-left: 16px;

  @include tablet-h() {
    margin-left: 12px;
  }

  @include tablet-v() {
    margin-left: 10px;
  }

  @include mobile() {
    margin-left: 0;
  }
}
//按鈕
.primary-linear-btn,
.p-button-outlined {
  width: 100px;
  height: 56px;
  @include tablet-v() {
    width: 100%;
    min-width: 80px;
  }

  @include mobile() {
    width: 100%;
    max-width: 360px;
  }
}
.primary-linear-btn {
  margin-right: 10px;
  &:hover {
    border: 1px solid #edcc5a;
    background: #edcc5a;
  }
}

.p-button {
  justify-content: center;
  height: 56px;

  @include tablet-v() {
    width: 80px;
  }

  @include mobile() {
    width: 360px;
    height: 39px;
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
