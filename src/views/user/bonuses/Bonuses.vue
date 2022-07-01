<template>
  <div>
    <div class="bonus-block-group">
      <Heading
        :title="t('my_bonuses.title')"
        :define="t('my_bonuses.define')"
      />
      <OutlineCard>
        <div class="my-bonuses">
          <div class="bulletin">
            <div class="bulletin-item">
              {{ t('common.bonuses') }}{{ '：' }}{{ balanceStore.bonus }}{{ ' '
              }}{{ t('common.points') }}
            </div>
            <div class="bulletin-item">
              {{ t('common.expiring') }}{{ '：' }}{{ balanceStore.expiringBonus
              }}{{ ' ' }}{{ t('common.points') }}
            </div>
          </div>
          <div class="transferButton">
            <Button
              class="transfer-button"
              component="button"
              size="transfer"
              variant="rounded"
              color="success"
              @click="openDialog"
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
      </OutlineCard>
    </div>
    <div class="bonus-block-group">
      <Heading
        :title="t('my_bonuses.in_progress.title')"
        :define="t('my_bonuses.in_progress.define')"
      />
      <DataTable
        v-if="isTable"
        :data="userEventResolvedData"
        :columns="columns"
      >
        <template #detailed>
          <a href="#">
            <Text color="success">{{ t('common.view') }}</Text>
          </a>
        </template>
        <template #activityId="{ record }">
          <Text color="success" class="view" @click="openPromotion(record)">
            {{ record.activityId }}
          </Text>
        </template>
        <template #acceptedAt="{ record }">
          <Text component="div" size="tiny">{{ record.date }}</Text>
          <Text component="div" size="tiny">{{ record.time }}</Text>
        </template>
        <template #dueDate="{ record }">
          <Text component="div" size="tiny">{{ record.dueDay }}</Text>
          <Text component="div" size="tiny">{{ record.dueTime }}</Text>
        </template>
      </DataTable>
      <template v-else>
        <OutlineCard>
          <ExpansionPanel
            v-for="record of userEventResolvedData"
            :key="record.id"
          >
            <template #header>
              <GridExpansionPanelHeader
                :data="record"
                :columns="gridExpansionPanelHeaderColumns"
              />
            </template>
            <template #content>
              <DoubleColumnList :data="record" :columns="columns">
                <!-- <template #detailed>
                  <a href="#">
                    <Text color="success" size="sm">
                      {{ t('common.view') }}
                    </Text>
                  </a>
                </template> -->
                <template #activityId>
                  <Text
                    color="success"
                    class="view"
                    @click="openPromotion(record)"
                  >
                    {{ record.activityId }}
                  </Text>
                </template>
                <template #date>
                  <Text component="div" size="tiny">{{ record.date }}</Text>
                </template>
              </DoubleColumnList>
            </template>
          </ExpansionPanel>
        </OutlineCard>
      </template>
      <!-- <UserEventsTable :user-events="userEventStore.inProgressUserEvent" /> -->
    </div>
    <div class="bonus-block-group">
      <Heading
        :title="t('my_bonuses.activity_history.title')"
        :define="t('my_bonuses.activity_history.define')"
      />
      <FiltersWrap
        v-model:start-time="startDate"
        v-model:end-time="endDate"
        :date-limits="dateLimits"
        @handleSearch="updateCompletionEvent(searchCompletedForm.values.value)"
      >
        <FiltersWrapItem>
          <div class="selector">
            <span class="selector-label">
              {{ t('common.state') }}
            </span>
            <select v-model="playerActivityStatus" class="selector-input">
              <option value="0">{{ t('my_bonuses.state.all') }}</option>
              <option value="1">{{ t('my_bonuses.state.expired') }}</option>
              <option value="2">{{ t('my_bonuses.state.completed') }}</option>
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
        <FiltersWrapItem>
          <InputBox v-model="title" :label="t('common.search')" />
        </FiltersWrapItem>
      </FiltersWrap>

      <DataTable
        v-if="isTable"
        :data="userEventHistoryResolvedData"
        :columns="historyColumns"
      >
        <template #isReceived="{ record }">
          <div v-if="record.isCompleted">
            <Text v-if="record.isReceived" color="secondary">
              {{ t('my_bonuses.state.completed') }}
            </Text>
            <Text v-else-if="record.isExpired" color="secondary">
              {{ t('my_bonuses.state.expired') }}
            </Text>
            <Button
              v-else
              color="success"
              size="small"
              @click="receiveBonuses(record.id)"
            >
              {{ t('my_bonuses.state.received') }}
            </Button>
          </div>
          <div v-else>
            <Text v-if="record.isActivityExpired" color="secondary">
              {{ t('my_bonuses.state.expired') }}
            </Text>
          </div>
        </template>
        <template #activityId="{ record }">
          <Text color="success" class="view" @click="openPromotion(record)">
            {{ record.activityId }}
          </Text>
        </template>
        <template #acceptedAt="{ record }">
          <Text component="div" size="tiny">{{ record.date }}</Text>
          <Text component="div" size="tiny">{{ record.time }}</Text>
        </template>
        <template #dueDate="{ record }">
          <Text component="div" size="tiny">{{ record.dueDay }}</Text>
          <Text component="div" size="tiny">{{ record.dueTime }}</Text>
        </template>
      </DataTable>
      <template v-else>
        <OutlineCard>
          <ExpansionPanel
            v-for="record of userEventHistoryResolvedData"
            :key="record.id"
          >
            <template #header>
              <GridExpansionPanelHeader
                :data="record"
                :columns="historyPanelColumns"
              >
                <template #date>
                  <Text component="div" device="mobile">
                    {{ record.date }}
                  </Text>
                </template>
                <template #isReceived>
                  <div v-if="record.isCompleted">
                    <Text v-if="record.isReceived" color="secondary">
                      {{ t('my_bonuses.state.completed') }}
                    </Text>
                    <Text v-else-if="record.isExpired" color="secondary">
                      {{ t('my_bonuses.state.expired') }}
                    </Text>
                    <Button
                      v-else
                      color="success"
                      size="small"
                      @click="receiveBonuses(record.id)"
                    >
                      {{ t('my_bonuses.state.received') }}
                    </Button>
                  </div>
                  <div v-else>
                    <Text v-if="record.isActivityExpired" color="secondary">
                      {{ t('my_bonuses.state.expired') }}
                    </Text>
                  </div>
                </template>
              </GridExpansionPanelHeader>
            </template>
            <template #content>
              <DoubleColumnList :data="record" :columns="historyColumns">
                <template #isReceived>
                  <div v-if="record.isCompleted">
                    <Text v-if="record.isReceived" color="secondary">
                      {{ t('my_bonuses.state.completed') }}
                    </Text>
                    <Text v-else-if="record.isExpired" color="secondary">
                      {{ t('my_bonuses.state.expired') }}
                    </Text>
                    <Button
                      v-else
                      color="success"
                      size="small"
                      @click="receiveBonuses(record.id)"
                    >
                      {{ t('my_bonuses.state.received') }}
                    </Button>
                  </div>
                  <div v-else>
                    <Text v-if="record.isActivityExpired" color="secondary">
                      {{ t('my_bonuses.state.expired') }}
                    </Text>
                  </div>
                </template>
                <template #activityId>
                  <Text
                    color="success"
                    class="view"
                    @click="openPromotion(record)"
                  >
                    {{ record.activityId }}
                  </Text>
                </template>
              </DoubleColumnList>
            </template>
          </ExpansionPanel>
        </OutlineCard>
      </template>
    </div>
    <Pagination
      v-model:page="page"
      :total-rows="userEventStore.totalHistoryUserEvents"
      @update:page="updateCompletionEvent(searchCompletedForm.values.value)"
    />
    <BonusTransferModal
      v-model:visible="openTransfer"
      :transfer-title="transferTitle"
      @close="closeBonusTransferModal"
      @closeTransferModal="closeTransferModal"
      @update:mybonusAmount="updateBonuses"
    />
    <PromotionDialog
      v-model:visible="displayPromotionModal"
      :is-promotion-page="isPromotionPage"
      :promotion-event="promotion"
      @close="closePromotion"
    />
  </div>
  <ReceivedDialog v-model:visible="displayModal" @close="close" />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import Dropdown from 'primevue/dropdown';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import IconBase from '@/components/icons/IconBase.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
// In Progress Activity data from API
import useUserEventStore from '@/modules/userBonuses/infrastructure/store/userEventStore';
import { SearchCompletedUserEventForm } from '@/modules/userBonuses/domain/userEvent';
import {
  updateCompletionEvent,
  initBonuses,
} from '@/modules/userBonuses/application/bonuses';
import { receiveApiBonus } from '@/modules/userBonuses/infrastructure/api/userEventApi';
import Pagination from '@/components/Pagination.vue';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import Button from '@/components/Button.vue';
import DataTable from '@/components/DataTable.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import Text from '@/components/Typography.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';
import InputBox from '@/components/InputBox.vue';
import ReceivedDialog from '@/modules/userBonuses/ui/ReceivedDialog.vue';
import IconTransfer from '@/components/icons/IconTransfer.vue';
// import Toast from '@/components/Toast.vue';
import BonusTransferModal from '@/modules/userBonuses/ui/BonusTransferModal.vue';
import PromotionDialog from '@/modules/promotions/ui/PromotionDialog.vue';
import { updatePromotions } from '@/modules/promotions/application/promotions';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import FiltersWrap from '@/components/FiltersWrap.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';
// use i18n
const { t } = useI18n();
const isPromotionPage = false;

// RWD
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);
// confirm dialog
const displayModal = ref(false);
function close() {
  displayModal.value = false;
}
// ---------------------promotion modal---------------------------
const displayPromotionModal = ref(false);
const promotion = ref<PromotionEvent | null>(null);

function openPromotion(record: PromotionEvent) {
  displayPromotionModal.value = true;
  promotion.value = record;
}

function closePromotion() {
  displayPromotionModal.value = false;
  promotion.value = null;
}

// in-progress activity DataTable
const columns = [
  {
    key: 'activityId',
    header: 'Activity Number',
    data: 'activityId',
  },
  {
    key: 'name',
    header: 'Activity Name',
    data: 'name',
  },
  {
    key: 'acceptedAt',
    header: 'Receiving Time',
    data: 'acceptedAt',
  },
  {
    key: 'bonus',
    header: 'Bonuses',
    data: 'bonus',
  },
  {
    key: 'dueDate',
    header: 'Deadline',
    data: 'dueDate',
  },
  {
    key: 'inprogress',
    header: 'Achieved',
    data: 'inprogress',
  },
  // {
  //   key: 'consecutiveDays',
  //   header: '條件連續幾天',
  //   data: 'consecutiveDays',
  // },
  // {
  //   key: 'userConsecutiveDayN',
  //   header: '共下注天數',
  //   data: 'userConsecutiveDayN',
  // },
  // {
  //   key: 'userConsecutiveDayY',
  //   header: '已連續天數',
  //   data: 'userConsecutiveDayY',
  // },
  // {
  //   key: 'betAmount',
  //   header: '下注',
  //   data: 'betAmount',
  // },
  // {
  //   key: 'betConsecutiveTimes',
  //   header: '連下',
  //   data: 'betConsecutiveTimes',
  // },
  // {
  //   key: 'winAmount',
  //   header: '贏錢',
  //   data: 'winAmount',
  // },
  // {
  //   key: 'winConsecutiveTimes',
  //   header: '連贏',
  //   data: 'winConsecutiveTimes',
  // },
  // {
  //   key: 'cumulativeBetAmount',
  //   header: '累下$',
  //   data: 'cumulativeBetAmount',
  // },
  // {
  //   key: 'cumulativeWinAmount',
  //   header: '累贏錢',
  //   data: 'cumulativeWinAmount',
  // },

  // {
  //   key: 'betFulfill',
  //   header: 'betFulfill',
  //   data: 'betFulfill',
  // },
  // {
  //   key: 'winFulfill',
  //   header: 'winFulfill',
  //   data: 'winFulfill',
  // },
  // {
  //   key: 'completed',
  //   header: 'completed',
  //   data: 'completed',
  // },
  // {
  //   key: 'currentCumulativeBetAmount',
  //   header: '已下',
  //   data: 'currentCumulativeBetAmount',
  // },
  // {
  //   key: 'currentCumulativeWinAmount',
  //   header: '已贏',
  //   data: 'currentCumulativeWinAmount',
  // },
  // {
  //   key: 'detailed',
  //   header: 'Detailed',
  // },
];
// in-progress activity ExpansionPanel
const gridExpansionPanelHeaderColumns = [
  {
    key: 'name',
    header: 'Activity Name',
    data: 'name',
  },
  {
    key: 'dueDay',
    header: 'Deadline',
    data: 'dueDayAndTime',
  },
  {
    key: 'inprogress',
    header: 'Achieved',
    data: 'inprogress',
  },
];
// activity history DataTable
const historyColumns = [
  {
    key: 'activityId',
    header: 'Activity Number',
    data: 'activityId',
  },
  {
    key: 'name',
    header: 'Activity Name',
    data: 'name',
  },
  {
    key: 'acceptedAt',
    header: 'Receiving Time',
    data: 'acceptedAt',
  },
  {
    key: 'bonus',
    header: 'Bonuses',
    data: 'bonus',
  },
  {
    key: 'dueDate',
    header: 'Deadline',
    data: 'dueDate',
  },
  // {
  //   key: 'progress',
  //   header: 'Achieved',
  //   data: 'progress',
  // },
  {
    key: 'isReceived',
    header: 'State',
    data: 'isReceived',
  },
];
// activity history ExpansionPanel header
const historyPanelColumns = [
  {
    key: 'name',
    header: 'Activity Name',
    data: 'name',
  },
  {
    key: 'dueDay',
    header: 'Deadline',
    data: 'dueDayAndTime',
  },
  {
    key: 'isReceived',
    header: 'State',
    data: 'isReceived',
  },
];

const balanceStore = useBalanceStore();
const userEventStore = useUserEventStore();

const userEventResolvedData = computed(() =>
  [...userEventStore.inProgressUserEvent].reverse().map((record) => {
    const time = moment(record.acceptedAt);
    const dueTime = moment(record.dueDate);
    return {
      ...record,
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      dueDay: dueTime.format('YYYY-MM-DD'),
      dueTime: dueTime.format('HH:mm:ss'),
      dueDayAndTime: dueTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  })
);
const userEventHistoryResolvedData = computed(() =>
  [...userEventStore.historyUserEvents].reverse().map((record) => {
    // console.log('7', record);
    const time = moment(record.acceptedAt);
    const dueTime = moment(record.dueDate);
    return {
      ...record,
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      dueDay: dueTime.format('YYYY-MM-DD'),
      dueTime: dueTime.format('HH:mm:ss'),
      dueDayAndTime: dueTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  })
);

const dateLimits = {
  minDate: moment().subtract(3, 'months').toDate(),
  maxDate: new Date(),
};

const searchCompletedForm = new FormGroup<SearchCompletedUserEventForm>({
  title: '',
  startDate: moment().subtract(1, 'week').toDate(),
  endDate: moment().toDate(),
  page: 1,
  playerActivityStatus: 0,
});

const { title, startDate, endDate, page, playerActivityStatus } =
  searchCompletedForm.refs;

function receiveBonuses(e: number) {
  receiveApiBonus(e)
    .then(() => {
      displayModal.value = true;
      initBonuses(searchCompletedForm.values.value);
    })
    .catch((err) => {
      console.log(err);
    });
}
// ----------------------------------紅利轉出----------------------------------
const transferTitle = t('my_bonuses.transfer_title');
const openTransfer = ref(false);
function openDialog() {
  openTransfer.value = true;
}

const openConfirm = ref(false);

function closeBonusTransferModal() {
  openTransfer.value = false;
  openConfirm.value = false;
}

function closeTransferModal() {
  openTransfer.value = false;
}
function updateBonuses() {
  initBonuses(searchCompletedForm.values.value);
}
onMounted(() => {
  updatePromotions();
  initBonuses(searchCompletedForm.values.value);
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}
.my-bonuses {
  display: flex;
  flex-direction: row;
  padding: 28px 20px;
  justify-content: space-between;
  align-items: center;

  @include mobile {
    padding: 20px 20px;
    align-items: stretch;
  }
  .bulletin {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 32px;

    &-item {
      padding: 0 32px;
      font-size: 22px;
      line-height: 32px;
      color: var(--text-primary);
      border-left: 1px solid #fff;

      &:first-child {
        padding-left: 0;
        border-left: none;
      }
    }

    @include mobile {
      height: auto;
      align-items: stretch;
      flex-direction: column;

      &-item {
        padding: 0;
        font-size: 16px;
        line-height: 20px;
        border: none;
        @include mobile {
          margin-bottom: 16px;
        }

        & + & {
          margin-top: 12px;
        }
      }
    }
  }
  @include mobile {
    flex-direction: column;
  }
}

.transferButton {
  display: flex;
  align-items: center;
  .transfer-button {
    display: flex;
    align-items: center;
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
    border: 1px solid var(--text-primary);
    background-color: var(--text-primary);

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
.buttons-wrap {
  display: flex;

  &-item {
    margin-left: 10px;
  }

  @include mobile {
    margin-top: 10px;

    &-item {
      width: 100%;
      margin-left: 0;

      & + & {
        margin-left: 8px;
      }
    }
  }
}
.view {
  cursor: pointer;
}
</style>
