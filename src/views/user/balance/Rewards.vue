<template>
  <div>
    <div class="bonus-block-group">
      <Heading :define="t('payment.reward.define')" />

      <FiltersWrap
        v-model:start-time="startTime"
        v-model:end-time="endTime"
        :date-limits="dateLimits"
        @handleSearch="onSearchWalletEvents(searchWalletForm.values.value)"
      />
    </div>
    <DataTable v-if="isTable" :data="content" :columns="withdrawColumns">
      <template #order="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
      <template #orderId="{ text, record }">
        <Text color="success" class="view" @click="openDialog(record)">
          {{ text }}
        </Text>
      </template>
      <!-- <template #amount="{ text }">
        <a href="#">
          <Text :color="text >= 0 ? 'primary' : 'error'">{{ text }}</Text>
        </a>
      </template> -->
      <template #time="{ text }">
        {{ formatTime(text, 'YYYY-MM-DD HH:mm:ss') }}
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
                {{ formatTime(text, 'YYYY-MM-DD HH:mm:ss') }}
              </template>
            </GridExpansionPanelHeader>
          </template>
          <template #content>
            <DoubleColumnList
              :data="record"
              :columns="gridExpansionPanelHeaderColumns"
            >
              <template #orderId="{ text }">
                <Text
                  device="mobile"
                  color="success"
                  class="view"
                  @click="openDialog(record)"
                >
                  {{ text }}
                </Text>
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
                {{ formatTime(text, 'YYYY-MM-DD HH:mm:ss') }}
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
  </div>
  <RewardsDetail
    v-model:visible="detail"
    :data="{ ...detail, ...userData }"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';
import FormGroup from 'vue-reactive-form';
import {
  getAchievementCategoriesMapping,
  getAchievementDetail,
  getPaymentTransactionsOther,
} from '@/modules/payment/infrastructure/payment.api';
import { SearchPlayerWalletLogFormOther } from '@/modules/userBalance/infrastructure/api/balanceApi';
import Heading from '@/components/Heading.vue';
import {
  GetPaymentTransactionsDtoOther,
  PaymentTransaction,
  PaymentTransactionType,
  RewardDetail,
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
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import { UserInfo } from '@/modules/paymentsHistory/domain/paymentsHistory.model';
import { REWARD_I18N_KEYS } from '@/modules/payment/domain/payment.i18n';
import FiltersWrap from '@/components/FiltersWrap.vue';
import RewardsDetail from '@/modules/payment/ui/RewardsDetail.vue';

const withdrawColumns = [
  {
    key: 'order',
    header: 'No.',
    data: 'order',
  },
  {
    key: 'item',
    header: 'Type',
    data: 'item',
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
    header: 'Complete',
    data: 'time',
  },
  {
    key: 'remark',
    header: 'Detailed',
    data: 'remark',
  },
];
const withdrawPanelColumns = [
  {
    key: 'item',
    header: 'Type',
    data: 'item',
  },
  {
    key: 'time',
    header: 'Complete',
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
    key: 'item',
    header: 'Type',
    data: 'item',
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
    header: 'Complete',
    data: 'time',
  },
  {
    key: 'remark',
    header: 'Detailed',
    data: 'remark',
  },
];

// use i18n
const { t } = useI18n();

// RWD
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);

// 限制可搜尋之日期區間
const dateLimits = {
  minDate: moment().subtract(1, 'years').toDate(),
  maxDate: new Date(),
};

const searchWalletForm = new FormGroup<SearchPlayerWalletLogFormOther>({
  page: 1,
  size: 20,
  startTime: moment().subtract(3, 'months').toDate(),
  endTime: new Date(),
  type: PaymentTransactionType.REWARD,
});
const { startTime, endTime, page: nowPage } = searchWalletForm.refs;

let queryObject: GetPaymentTransactionsDtoOther = {
  page: 1,
  size: 20,
  startTime: moment().subtract(3, 'months').toDate(),
  endTime: new Date(),
  type: PaymentTransactionType.REWARD,
};

const content = ref<PaymentTransaction[]>([]);
const totalRows = ref<number>(0);

async function updatePlayerWallet({ page }: GetPaymentTransactionsDtoOther) {
  queryObject.page = page;
  const res = await getPaymentTransactionsOther(queryObject);
  const { content: resContent, totalElements } = res.page;
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
  nowPage.value = 1;
  queryObject = { ...rest };
  updatePlayerWallet(searchWalletForm.values.value);
};

const userData = ref<UserInfo | null>(null);

const achievementCategoriesMapping = ref<
  Record<string, Record<string, string>>
>({});

async function updateAchievementCategoriesMapping() {
  const response = await getAchievementCategoriesMapping();

  achievementCategoriesMapping.value = response;
}

onMounted(() => {
  updatePlayerWallet(searchWalletForm.values.value);
  const userStore = useUserStore();
  const { userInfo } = userStore;
  const playerName = `${userInfo?.firstname} ${userInfo?.lastname}`;
  userData.value = { ...userInfo, playerName };

  updateAchievementCategoriesMapping();
});

// -----------------------------------------點擊view打開詳細清單-----------------------------
const detail = ref<RewardDetail | null>(null);
async function openDialog(record: RewardDetail | null) {
  const achievement = {
    achievementId: record?.orderId || '',
  };

  const { achievementDto, playerAchievementDto } = await getAchievementDetail(
    achievement
  );
  const time = moment(playerAchievementDto.rewardReceivedAt);
  const rewardReceivedTime = time.format('YYYY-MM-DD HH:mm:ss');
  const achievementTarget = t(REWARD_I18N_KEYS[achievementDto.target]);
  const achievementTargetType = ref('');

  if (achievementDto.target.toString().length === 1) {
    achievementTargetType.value = t(
      'payment.reward.achievementType.basicAchievement'
    );
  } else if (achievementDto.target.toString()[0] === '1') {
    achievementTargetType.value = t(
      'payment.reward.achievementType.cumulativeAchievement'
    );
  } else if (achievementDto.target.toString()[0] === '2') {
    achievementTargetType.value = t(
      'payment.reward.achievementType.consecutiveAchievement'
    );
  }

  // achievementCategoriesMapping;

  const achievementTargetTypeName = achievementTargetType.value;

  detail.value = {
    ...record,
    ...achievementDto,
    ...playerAchievementDto,
    rewardReceivedTime,
    achievementTarget,
    achievementTargetTypeName,
  };
  // console.log('detail.value-----------------', detail.value);
}
function close() {
  detail.value = null;
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.view:hover {
  cursor: pointer;
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
</style>
