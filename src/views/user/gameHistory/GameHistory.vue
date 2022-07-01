<template>
  <div>
    <div class="bonus-block-group">
      <Heading :define="t('payment.game_history.define')" />

      <FiltersWrap
        v-model:start-time="startTime"
        v-model:end-time="endTime"
        :date-limits="dateLimits"
        @handleSearch="onSearchWalletEvents(searchGameForm.values.value)"
      >
        <FiltersWrapItem>
          <div class="selector">
            <span class="selector-label">
              {{ t('payment.game_history.button.category') }}
            </span>
            <select v-model="category" class="selector-input">
              <option :value="-1">
                {{ t('payment.game_history.type_option.SEE_ALL') }}
              </option>
              <option
                v-for="name of gameTypeOption"
                v-show="name !== GameTypeOption[GameTypeOption.SEE_ALL]"
                :key="name"
                :value="name"
              >
                {{ t(`payment.game_history.type_option.${name}`) }}
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
        <FiltersWrapItem>
          <AutoComplete
            v-model="queryName"
            :suggestions="filteredGameNames"
            field="name"
            :placeholder="t('payment.game_history.button.search')"
            dropdown-mode="current"
            @complete="searchGameName($event)"
            @clear="clearGameName"
          >
            <template #item="{ item }">
              <div class="country-item">
                <div>{{ item.name }}</div>
              </div>
            </template>
          </AutoComplete>
        </FiltersWrapItem>
      </FiltersWrap>
    </div>

    <DataTable v-if="isTable" :data="content" :columns="gameHistoryColumns">
      <template #order="{ rowIndex }">
        {{ rowIndex + 1 }}
      </template>
      <template #gameId="{ text }">
        {{ filterGameName(text) }}
      </template>
      <template #time="{ text }">
        {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
      </template>
      <template #totalWin="{ record, text }">
        {{ text > 0 ? text : `-${record.bet}` }}
      </template>
      <template #status="{ text }">
        {{ t(`payment.game_history.status_option.${StatusOption[text]}`) }}
      </template>
    </DataTable>
    <template v-else>
      <!-- <div class="expansionHeader">
        <div>
          <Text
            v-for="item of historyPanelColumns"
            :key="item.key"
            component="div"
            color="surface"
            device="mobile"
          >
            {{ item.header }}
          </Text>
        </div>
        <div>{{ '' }}</div>
      </div> -->
      <OutlineCard>
        <ExpansionPanel v-for="(record, index) of content" :key="record.id">
          <template #header>
            <GridExpansionPanelHeader
              :data="record"
              :columns="historyPanelColumns"
            >
              <template #order>
                {{ index + 1 }}
              </template>
              <template #time="{ text }">
                {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
              </template>
              <template #gameId="{ text }">
                {{ filterGameName(text) }}
              </template>
            </GridExpansionPanelHeader>
          </template>
          <template #content>
            <DoubleColumnList
              :data="record"
              :columns="gridExpansionPanelHeaderColumns"
            >
              <template #gameId="{ text }">
                {{ filterGameName(text) }}
              </template>
              <template #time="{ text }">
                {{ formatTime(text, 'YYYY/MM/DD HH:mm:ss') }}
              </template>
              <template #status="{ text }">
                {{
                  t(`payment.game_history.status_option.${StatusOption[text]}`)
                }}
              </template>
            </DoubleColumnList>
          </template>
        </ExpansionPanel>
      </OutlineCard>
    </template>
    <Pagination
      v-model:page="queryObject.page"
      :total-rows="totalRows"
      @update:page="updateGameHistory"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';
import FormGroup from 'vue-reactive-form';
import AutoComplete from 'primevue/autocomplete';
import Heading from '@/components/Heading.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';
// import InputBox from '@/components/InputBox.vue';
import { formatTime } from '@/libs/date';
import DataTable from '@/components/DataTable.vue';
// import Text from '@/components/Typography.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import Pagination from '@/components/Pagination.vue';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
// import { getPaymentTransactions } from '@/modules/payment/infrastructure/payment.api';
// import { toDollarsAmount } from '@/libs/dollars';
import {
  getPaginatedBets,
  SearchGetPaginatedBetsLogForm,
  getGameType,
} from '@/modules/gameHistory/infrastructure/api/gameHistory.api';
import {
  GameType,
  GameTypeOption,
  GameTypesObject,
  GetPaginatedBets,
  PaginatedBetsContent,
  ProvidersObject,
  StatusOption,
} from '@/modules/gameHistory/domain/gameHistory.model';
import FiltersWrap from '@/components/FiltersWrap.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';

// Turn enum into array
const gameTypeOption: (string | GameTypeOption)[] = Object.values(
  GameTypeOption
).filter((item) => typeof item === 'string');

const dateLimits = {
  minDate: moment().subtract(1, 'months').toDate(),
  maxDate: new Date(),
};

const gameHistoryColumns = [
  {
    key: 'order',
    header: 'Order',
    data: 'order',
  },
  {
    key: 'gameId',
    header: 'Game Name',
    data: 'gameId',
  },
  {
    key: 'transactionId',
    header: 'Oder No',
    data: 'transactionId',
  },
  {
    key: 'bet',
    header: 'Bet',
    data: 'bet',
  },
  {
    key: 'totalWin',
    header: 'Win',
    data: 'totalWin',
  },
  {
    key: 'time',
    header: 'Date',
    data: 'time',
  },
  {
    key: 'status',
    header: 'State',
    data: 'status',
  },
];
const historyPanelColumns = [
  {
    key: 'gameId',
    header: 'Game Name',
    data: 'gameId',
  },
  {
    key: 'time',
    header: 'Date',
    data: 'time',
  },
  {
    key: 'totalWin',
    header: 'Win',
    data: 'totalWin',
  },
];

const gridExpansionPanelHeaderColumns = [
  {
    key: 'gameId',
    header: 'Game Name',
    data: 'gameId',
  },
  {
    key: 'transactionId',
    header: 'Oder No',
    data: 'transactionId',
  },
  {
    key: 'time',
    header: 'Date',
    data: 'time',
  },
  {
    key: 'bet',
    header: 'Bet',
    data: 'bet',
  },
  {
    key: 'totalWin',
    header: 'Win',
    data: 'totalWin',
  },
  {
    key: 'status',
    header: 'State',
    data: 'status',
  },
];

// use i18n
const { t } = useI18n();

// // RWD
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);
const searchGameForm = new FormGroup<SearchGetPaginatedBetsLogForm>({
  page: 1,
  size: 20,
  startTime: moment().subtract(7, 'd').toDate(),
  endTime: new Date(),
  category: GameTypeOption.SEE_ALL,
});
const { startTime, endTime, page: nowPage, category } = searchGameForm.refs;

const queryObject = ref<GetPaginatedBets>({
  page: 1,
  size: 20,
  startTime: moment().subtract(7, 'd').toDate(),
  endTime: new Date(),
  category: GameTypeOption.SEE_ALL,
});

const content = ref<PaginatedBetsContent[]>([]);
const totalRows = ref<number>(0);
const gameTypes = ref<GameTypesObject[]>([]);
const providers = ref<ProvidersObject[]>([]);
const queryName = ref<GameTypesObject | string>('');
const filteredGameNames = ref<GameTypesObject[]>([]);
const autoCompleteQuery = ref<string>('');

async function updateGameHistory() {
  if (queryObject.value.category === -1) {
    delete queryObject.value.category;
  }

  const { bets } = await getPaginatedBets(queryObject.value);
  const { content: resContent, totalElements } = bets;
  totalRows.value = totalElements;
  content.value = resContent;
  // console.log(content.value);
}

const filterGameName = (gameId: number): string => {
  const findObj = gameTypes.value.find(({ id }) => gameId === id);
  if (findObj !== undefined) {
    return findObj.name;
  }
  return '';
};

const searchGameName = (event: { originalEvent: Event; query: string }) => {
  autoCompleteQuery.value = event.query;
  setTimeout(() => {
    console.log(event);
    if (!event.query.trim().length) {
      filteredGameNames.value = [...gameTypes.value];
    } else {
      filteredGameNames.value = gameTypes.value.filter((game) => {
        return game.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const clearGameName = () => {
  queryName.value = '';
};

const gameNamefuzzySearch = () => {
  return filteredGameNames.value.map(({ id }) => id);
};

const onSearchWalletEvents = ({ ...rest }: GetPaginatedBets) => {
  nowPage.value = 1;
  queryObject.value = { ...rest };

  if (queryName.value) {
    if (typeof queryName.value === 'object') {
      queryObject.value.gameIds = [queryName.value.id];
    } else {
      queryObject.value.gameIds = gameNamefuzzySearch();

      if (queryObject.value.gameIds.length === 0) {
        content.value = [];
        queryObject.value.page = 1;
        totalRows.value = 0;
        return;
      }
    }
  } else {
    delete queryObject.value.gameIds;
  }

  // console.log(queryObject.value);
  updateGameHistory();
};

const initGameHistory = async () => {
  const res: GameType = await getGameType();
  gameTypes.value = res.gameTypes;
  providers.value = res.providers;
  // console.log(gameTypes.value, providers.value);
  updateGameHistory();
};

onMounted(() => {
  initGameHistory();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
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
.search-input {
  @include desktop {
    width: 248px;
  }
}

.selector {
  position: relative;
  overflow: hidden;

  .selector-label {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 12px;
    line-height: 16px;
    color: var(--primary-color);
  }

  .selector-input {
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

  .selector-icon {
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
