<template>
  <Container class="container">
    <Heading
      :title="t('bonusesHistory.title')"
      :define="t('bonusesHistory.define')"
      class="Heading-title"
    />
    <FiltersWrap
      v-model:start-time="startDate"
      v-model:end-time="endDate"
      :date-limits="dateLimits"
      @handleSearch="updateCompletionEvent"
    />
    <DataTable
      v-if="isTable"
      :columns="columns"
      :data="resolvedData"
      row-key="id"
    >
      <template #order="{ rowIndex }">
        {{ rowIndex + 1 + 20 * (page - 1) }}
      </template>
      <template #time="{ record }">
        <Text component="div" size="tiny">{{ record.date }}</Text>
        <Text component="div" size="tiny">{{ record.time }}</Text>
      </template>
      <template #item="{ record }">
        <Text component="div" size="tiny">{{ record.item }}</Text>
        <Text component="div" size="tiny">{{ record.remark }}</Text>
      </template>
      <!-- <template #amount="{ record }">
        <Text :color="record.amount < 0 ? 'error' : 'primary'">
          {{ record.amount }}
        </Text>
      </template> -->
      <template #orderId="{ record, text }">
        <Text
          color="success"
          device="mobile"
          class="serialNumber"
          @click="openDialog(record)"
        >
          {{ text }}
        </Text>
      </template>
      -->
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
              <!-- <template #amount>
                <Text
                  :color="record.amount < 0 ? 'error' : 'primary'"
                  device="mobile"
                >
                  {{ record.amount }}
                </Text>
              </template> -->
            </GridExpansionPanelHeader>
          </template>
          <template #content>
            <DoubleColumnList
              :data="record"
              :columns="expansionPanelListColumns"
            >
              <template #item>
                <Text component="div" device="mobile">
                  {{ record.item }} {{ record.remark }}
                </Text>
              </template>
              <!-- <template #amount>
                <Text
                  :color="record.amount < 0 ? 'error' : 'primary'"
                  device="mobile"
                >
                  {{ record.amount }}
                </Text>
              </template> -->
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
              <template #time>
                <Text component="div" device="mobile" class="time">
                  {{ record.date }}&nbsp;{{ record.time }}
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
  </Container>
  <BonusesHistoryDetail
    v-model:visible="detail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import DataTable, { DataTableColumn } from '@/components/DataTable.vue';
import {
  BonusesHistory,
  SearchCompletedUserEventForm,
} from '@/modules/bonusesHistory/domain/bounusesHistory.model';
import {
  getBonusesHistory,
  getbonusIds,
  getbonusActivity,
  getbonusLevel,
} from '@/modules/bonusesHistory/infrastructure/bonusesHistory.api';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Typography.vue';
import { toDollarsAmount } from '@/libs/dollars';
import OutlineCard from '@/components/OutlineCard.vue';
import { Device } from '@/core/mediaQuery/device';
import { useDevice } from '@/core/mediaQuery/useDevice';
import GridExpansionPanelHeader, {
  GridExpansionPanelHeaderColumn,
} from '@/components/GridExpansionPanelHeader.vue';
import Pagination from '@/components/Pagination.vue';
import DoubleColumnList, {
  DoubleColumnListColumn,
} from '@/components/DoubleColumnList.vue';
import { BONUSES_HISTORY_KINE_I18N_KEYS } from '@/modules/bonusesHistory/domain/bonusesHistory.i18n';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import { UserInfo } from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import BonusesHistoryDetail from '@/modules/bonusesHistory/ui/BonusesHistoryDetail.vue';
import FiltersWrap from '@/components/FiltersWrap.vue';

const { t } = useI18n();

// 表單資料
const columns: DataTableColumn<typeof resolvedData.value[number]>[] = [
  {
    key: 'order',
    header: 'No',
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
    key: 'item',
    header: 'Detailed',
  },
];

const gridExpansionPanelHeaderColumns: GridExpansionPanelHeaderColumn<BonusesHistory>[] =
  [
    {
      key: 'Type',
      data: 'kind',
    },
    {
      key: 'Time',
      data: 'dateAndTime',
    },
    {
      key: 'amount',
      data: 'amount',
    },
  ];

const expansionPanelListColumns: DoubleColumnListColumn<
  typeof content.value[number]
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
    key: 'beforeAmount',
    header: 'Before',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'afterAmount',
    header: 'After',
  },
  {
    key: 'time',
    header: 'Completed',
  },
  {
    key: 'item',
    header: 'Detailed',
  },
];
// -----------------------------------------搜尋函式的參數-----------------------------

const searchCompletedForm = new FormGroup<SearchCompletedUserEventForm>({
  startDate: moment().subtract(1, 'months').toDate(),
  endDate: new Date(),
  page: 1,
});
const { startDate, endDate, page } = searchCompletedForm.refs;
const content = ref<BonusesHistory[]>([]);
const totalrows = ref<number>(0);

// ------------------------------------點擊search觸發的函式----------------------------------
function updateCompletionEvent() {
  const update = {
    startTime: searchCompletedForm.refs.startDate.value,
    endTime: searchCompletedForm.refs.endDate.value,
    page: page.value - 1,
    size: 20,
    type: 1,
  };
  getBonusesHistory(update).then((bonusesHistories) => {
    totalrows.value = bonusesHistories.totalElements;
    const serialNumbers = bonusesHistories.content.map((item) => item.orderId);
    // console.log('serialNumbers', serialNumbers);
    if (serialNumbers.length !== 0) {
      getbonusIds({ ids: serialNumbers }).then((bonusIds) => {
        content.value = bonusesHistories.content.map((item) => {
          const bonusId = bonusIds.find(
            (element: { id: string }) => element.id === item.orderId
          );
          const bonusIdsKind = bonusId?.kind || '';

          const bonusIdsOrderId = bonusId?.orderId || '';

          const expiryDate = moment(bonusId?.expiryTime).format(
            'YYYY-MM-DD HH:mm:ss'
          );

          return {
            ...item,
            bonusIdsKind,
            bonusIdsOrderId,
            expiryDate,
          };
        });
      });
    } else {
      content.value = [];
    }
  });
}
// 限制可搜尋之日期區間
const dateLimits = {
  minDate: moment().subtract(3, 'months').toDate(),
  maxDate: new Date(),
};
// ---------------------------------------串接API-------------------------------
const userData = ref<UserInfo | null>(null);
onMounted(() => {
  updateCompletionEvent();

  const userStore = useUserStore();
  const { userInfo } = userStore;
  const playerName = `${userInfo?.firstname} ${userInfo?.lastname}`;
  userData.value = { ...userInfo, playerName };
});
// ----------------------------------------------------------------------------
// 轉換資料格式(Deposit)
const resolvedData = computed(() =>
  content.value.map((record) => {
    const time = moment(record.time);
    const day = moment(record.time);
    return {
      ...record,
      kind: t(BONUSES_HISTORY_KINE_I18N_KEYS[record.kind]),
      amount: toDollarsAmount(record.amount),
      beforeAmount: toDollarsAmount(record.beforeAmount),
      afterAmount: toDollarsAmount(record.afterAmount),
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      day: day.format('MM-DD'),
      dateAndTime: time.format('YYYY-MM-DD HH:mm:ss'),
    };
  })
);
// -----------------------------------------點擊view打開詳細清單-----------------------------
const detail = ref<BonusesHistory | null>(null);

// const bonusActivityData = ref([]);
function openDialog(record: BonusesHistory) {
  const recordOrderId = record.bonusIdsOrderId;
  if (record?.bonusIdsKind === 1) {
    getbonusActivity({ id: recordOrderId }).then((bonusActivityData) => {
      const acceptedTime = moment(
        bonusActivityData.playerActivityDto.acceptedAt
      ).format('YYYY-MM-DD HH:mm:ss');
      const activityEndTime = moment(
        bonusActivityData.playerActivityDto.completedAt
      ).format('YYYY-MM-DD HH:mm:ss');
      const activityData = bonusActivityData.activityDto;
      const activityName = bonusActivityData.activityDto.title
        ? bonusActivityData.activityDto.title
        : '-';
      let activityType;
      let activityTarget;
      if (
        activityData.betAmount === 0 &&
        activityData.betConsecutiveTimes === 0 &&
        activityData.winAmount === 0 &&
        activityData.winConsecutiveTimes === 0 &&
        activityData.cumulativeBetAmount === 0 &&
        activityData.cumulativeWinAmount === 0
      ) {
        if (activityData.consecutiveDays !== 0) {
          activityType = t('bonusesHistory.activityType.Open_Game_Consecutive');
          activityTarget = t('bonusesHistory.activityTarget.Consecutive');
        } else {
          activityType = t('bonusesHistory.activityType.Open_Game');
          activityTarget = t('bonusesHistory.activityTarget.Open_Game');
        }
      } else if (activityData.consecutiveDays !== 0) {
        activityType = t('bonusesHistory.activityType.Bet_Consecutive');
        activityTarget = t('bonusesHistory.activityTarget.Consecutive');
      } else {
        activityType = t('bonusesHistory.activityType.Bet');
        activityTarget = t('bonusesHistory.activityTarget.Bet');
      }
      detail.value = {
        ...record,
        activityName,
        acceptedTime,
        activityEndTime,
        activityType,
        activityTarget,
      };
    });
  }

  if (record?.bonusIdsKind === 2) {
    getbonusLevel({ level: recordOrderId });
    // const activityName = '遊戲升級';
    // detail.value = { ...record, activityName };
  }

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
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.serialNumber {
  cursor: pointer;
}
.orderIdClass {
  color: var(--success-color);
}
.Heading-title {
  @include mobile() {
    margin-bottom: 10px;
  }
}
.title {
  color: var(--primary-color);
}

.search-input-group {
  display: flex;
  margin-bottom: 24px;

  @include tablet-v() {
    width: 100%;
  }

  @include mobile() {
    flex-direction: column;
    margin-bottom: 30px;
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
// type
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
.input-date .p-input-filled {
  width: 100%;
}
//按鈕區塊
.button-group {
  display: flex;
  margin-left: 16px;

  @include tablet-h() {
    margin-left: 10px;
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
</style>
