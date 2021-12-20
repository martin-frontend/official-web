<template>
  <Container class="container">
    <Heading
      :title="t('paymentshistory.title')"
      class="Heading-title"
      :define="t('paymentshistory.define')"
    />
    <div v-if="isDeposit" class="switch-button-group">
      <Button size="small" class="switch-button">
        {{ 'Deposit' }}
      </Button>
      <Button
        size="small"
        variant="darken-outlined"
        class="switch-button-black"
        @click="clickWithdraw"
      >
        {{ 'Withdraw' }}
      </Button>
    </div>
    <div v-else class="switch-button-group">
      <Button
        size="small"
        class="switch-button-black"
        variant="darken-outlined"
        @click="clickDeposit"
      >
        {{ 'Deposit' }}
      </Button>
      <Button size="small" class="switch-button">
        {{ 'Withdraw' }}
      </Button>
    </div>
    <template v-if="isDeposit">
      <FiltersWrap
        v-model:start-time="startDate"
        v-model:end-time="endDate"
        :date-limits="dateLimits"
        @handleSearch="updateCompletionEvent"
      >
        <FiltersWrapItem>
          <div class="selector">
            <span class="selector-label">
              {{ t('common.type') }}
            </span>
            <select v-model="statusShrink" class="selector-input">
              <option :value="99">
                {{ t('paymentshistory.option.see_all') }}
              </option>
              <option :value="1">
                {{ t('paymentshistory.option.successful') }}
              </option>
              <option :value="-1">
                {{ t('paymentshistory.option.failed') }}
              </option>
              <option :value="0">
                {{ t('paymentshistory.option.Pending') }}
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
      <DataTable
        v-if="isTable"
        :columns="columns"
        :data="resolvedData"
        row-key="id"
      >
        <!-- <template #status="{ record, text }">
          <Text :color="record.status === 'Failed' ? 'error' : 'primary'">
            {{ text }}
          </Text>
        </template> -->
        <template #time="{ record }">
          <Text component="div" size="tiny">{{ record.date }}</Text>
          <Text component="div" size="tiny">{{ record.time }}</Text>
        </template>
        <template #id="{ record }">
          <Text color="success" class="view" @click="openDialog(record)">
            {{ record.id }}
          </Text>
        </template>
      </DataTable>

      <template v-else>
        <OutlineCard>
          <ExpansionPanel
            v-for="(record, index) of resolvedData"
            :key="record.id"
          >
            <template #header>
              <GridExpansionPanelHeader
                :data="record"
                :columns="gridExpansionPanelHeaderColumns"
              >
                <template #order>
                  {{ index + 1 }}
                </template>
                <!-- <template #status="{ text }">
                  <Text
                    size="tiny"
                    :color="record.status === 'Failed' ? 'error' : 'primary'"
                  >
                    {{ text }}
                  </Text>
                </template> -->
              </GridExpansionPanelHeader>
            </template>
            <template #content>
              <DoubleColumnList
                :data="record"
                :columns="expansionPanelListColumns"
              >
                <!-- <template #status="{ text }">
                  <Text
                    device="mobile"
                    :color="record.status === 'Failed' ? 'error' : 'primary'"
                  >
                    {{ text }}
                  </Text>
                </template> -->
                <template #time>
                  <Text component="div" device="mobile" class="time">
                    {{ record.date }}&nbsp;{{ record.time }}
                  </Text>
                </template>
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
    </template>

    <withdrawPaymentsHistory v-else />
  </Container>
  <PaymentsHistoryDetail
    v-model:visible="detail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import Button from '@/components/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import DataTable, { DataTableColumn } from '@/components/DataTable.vue';
import {
  PaymentsHistory,
  SearchCompletedUserEventForm,
  UserInfo,
  PaymentType,
} from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import {
  getPaymentsHitory,
  getPaymentOption,
} from '@/modules/paymentsHistory/infrastructure/paymentsHistory.api';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Typography.vue';
import { toDollarsAmount } from '@/libs/dollars';
import OutlineCard from '@/components/OutlineCard.vue';
import { Device } from '@/core/mediaQuery/device';
import { useDevice } from '@/core/mediaQuery/useDevice';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import Pagination from '@/components/Pagination.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import { PAYMENT_HISTORY_KINE_I18N_KEYS } from '@/modules/paymentsHistory/domain/paymentsHistory.i18n';
import withdrawPaymentsHistory from './withdrawPaymentsHistory.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import PaymentsHistoryDetail from '@/modules/paymentsHistory/ui/PaymentsHistoryDetail.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';
import FiltersWrap from '@/components/FiltersWrap.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';

const { t } = useI18n();
const paymentType = ref<PaymentType[]>([]);

// 表單資料
const columns: DataTableColumn<typeof resolvedData.value[number]>[] = [
  {
    key: 'id',
    header: 'Order number',
    data: 'id',
  },
  {
    key: 'paymentChannel',
    header: 'Method',
    data: 'paymentChannel',
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
  {
    key: 'status',
    header: 'Status',
    data: 'status',
  },
];

const gridExpansionPanelHeaderColumns = [
  {
    key: 'paymentChannel',
    data: 'paymentChannel',
  },
  {
    key: 'time',
    data: 'dateAndTime',
  },
  {
    key: 'amount',
    data: 'amount',
  },
];

const expansionPanelListColumns = [
  {
    key: 'id',
    header: 'Order number',
  },
  {
    key: 'paymentChannel',
    header: 'Method',
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
    key: 'status',
    header: 'Status',
  },
];

// 限制可搜尋之日期區間
const dateLimits = {
  minDate: moment().subtract(3, 'months').toDate(),
  maxDate: new Date(),
};

const searchCompletedForm = new FormGroup<SearchCompletedUserEventForm>({
  startDate: moment().toDate(),
  endDate: new Date(),
  page: 1,
  statusShrink: 99,
});

const { startDate, endDate, statusShrink, page } = searchCompletedForm.refs;

const content = ref<PaymentsHistory[]>([]);
const totalrows = ref(0);
// ------------------------------------點擊search觸發的函式----------------------------------

function updateCompletionEvent() {
  const update = {
    startTime: searchCompletedForm.refs.startDate.value,
    endTime: searchCompletedForm.refs.endDate.value,
    page: page.value - 1,
    size: 20,
    statusShrink: statusShrink.value,
  };

  if (update.statusShrink === 99) {
    delete update.statusShrink;
  }

  getPaymentsHitory(update).then((data) => {
    const dataContent = data.content;
    totalrows.value = data.totalElements;

    content.value = dataContent.map((item) => {
      const found = paymentType.value.find(
        (element) => element.id === item.paymentType
      );
      const paymentTypeOption = found?.name || '';
      return {
        ...item,
        paymentTypeOption,
      };
    });
  });
}
// -----------------------------------------------------------------------------
// function isEmpty(val) {
//   return val === undefined || val == null || val.length <= 0 ? val : '--';
// }

// 轉換資料格式(Deposit)
const resolvedData = computed(() =>
  content.value.map((record) => {
    const time = moment(record.time);
    const payDay = moment(record.payAt);

    const payAtTime =
      record.payAt !== null ? payDay.format('YYYY-MM-DD HH:mm:ss') : '--';
    const depositBank = record.bankCode?.length > 0 ? record.bankCode : '--';
    const depositAccount =
      record.bankAccount.length > 0 ? record.bankAccount : '--';
    const phoneNumber = record.phone !== null ? record.phone : '--';

    return {
      ...record,
      payAtTime,
      depositBank,
      depositAccount,
      phoneNumber,
      status: t(PAYMENT_HISTORY_KINE_I18N_KEYS[record.status]),
      amount: toDollarsAmount(record.amount),
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      day: time.format('MM-DD'),
      dateAndTime: time.format('YYYY-MM-DD HH:mm:ss'),
    };
  })
);

// 切換存提款
const isDeposit = ref(true);
function clickWithdraw() {
  isDeposit.value = false;
  // getWithdrawPaymentsHitory();
}
function clickDeposit() {
  isDeposit.value = true;
}

// -----------------------------------------點擊view打開詳細清單-----------------------------
const detail = ref<PaymentsHistory | null>(null);
function openDialog(record: PaymentsHistory | null) {
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
    updateCompletionEvent();
    // console.log('payment----------', paymentType.value);
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
.Heading-title {
  @include mobile() {
    margin-bottom: 16px;
  }
}
.title {
  color: var(--primary-color);
}
.switch-button-group {
  display: flex;
  margin-bottom: 24px;

  @include mobile() {
    margin-bottom: 16px;
  }
}
.switch-button {
  justify-content: flex-end;
  min-width: 120px;
  margin-right: 16px;
  height: 40px;
  border-radius: 100px;
  background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
  color: white;
  font-size: 16px;
  line-height: 20px;
  &:hover {
    border: 1px solid #edcc5a;
    background: #edcc5a;
  }
  @include mobile() {
    font-size: 12px;
    height: 32px;
    margin-right: 8px;
  }
}
.switch-button-black {
  justify-content: flex-end;
  min-width: 120px;
  margin-right: 16px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid var(--primary-color);
  background: var(--secondary-color);
  color: var(--primary-color);
  font-size: 16px;
  line-height: 20px;
  &:hover {
    background: transparent;
  }
  @include mobile() {
    font-size: 12px;
    height: 32px;
    margin-right: 8px;
  }
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
    display: block;
    width: 100%;
    margin-bottom: 10px;
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
.start-dates {
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
  margin-left: 10px;
  @include mobile() {
    margin-left: 0px;
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

.grid-table {
  --grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  .primary-color-text {
    color: var(--primary-color);
  }

  .danger-color-text {
    color: var(--danger-color);
  }

  .sucess-color-text {
    color: var(--success-color);
  }
}

.title-group {
  grid-template-columns: 1fr 4fr 5fr 2fr;
  width: 100%;
  padding: 1.5rem;
  padding-right: 3rem;
}

.time {
  font-size: 50px;
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
