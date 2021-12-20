<template>
  <Container class="container">
    <Heading
      :title="t('loginhistory.title')"
      class="Heading-title"
      :define="t('loginhistory.define')"
    />
    <DataTable
      v-if="isTable"
      :columns="columns"
      :data="resolvedData"
      row-key="id"
    >
      <template #time="{ record }">
        <Text component="div" size="tiny">{{ record.date }}</Text>
        <Text component="div" size="tiny">{{ record.time }}</Text>
      </template>
      <template #detailed>
        <Text color="success">
          {{ 'View' }}
        </Text>
      </template>
    </DataTable>

    <template v-else>
      <OutlineCard>
        <ExpansionPanel v-for="(record, index) of resolvedData" :key="index">
          <template #header>
            <GridExpansionPanelHeader
              :data="record"
              :columns="gridExpansionPanelHeaderColumns"
            >
              <template #time>
                <Text component="div" class="time" device="mobile">
                  {{ record.date }}&nbsp;{{ record.time }}
                </Text>
              </template>
            </GridExpansionPanelHeader>
          </template>
          <template #content>
            <DoubleColumnList
              :data="record"
              :columns="expansionPanelListColumns"
            >
              <template #time>
                <Text component="div" size="tiny" class="time">
                  {{ record.date }}&nbsp;{{ record.time }}
                </Text>
              </template>
            </DoubleColumnList>
          </template>
        </ExpansionPanel>
      </OutlineCard>
    </template>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
// import { getDateBeforeDays } from '@/libs/date';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import DataTable, { DataTableColumn } from '@/components/DataTable.vue';
import { LoginHistory } from '@/modules/loginHistory/domain/loginHistory.model';
import { getLoginHistory } from '@/modules/loginHistory/infrastructure/loginHistory.api';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Typography.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import { Device } from '@/core/mediaQuery/device';
import { useDevice } from '@/core/mediaQuery/useDevice';
import GridExpansionPanelHeader, {
  GridExpansionPanelHeaderColumn,
} from '@/components/GridExpansionPanelHeader.vue';
import DoubleColumnList, {
  DoubleColumnListColumn,
} from '@/components/DoubleColumnList.vue';

const { t } = useI18n();

// 表單資料
const columns: DataTableColumn<typeof resolvedData.value[number]>[] = [
  {
    key: 'time',
    header: 'Date',
    data: 'time',
  },
  {
    key: 'country',
    header: 'Country',
    data: 'country',
  },
  {
    key: 'agent',
    header: 'Browser',
    data: 'agent',
  },
  {
    key: 'ip',
    header: 'IP',
    data: 'ip',
  },
  {
    key: 'visitorId',
    header: 'Visitorld',
    data: 'visitorId',
  },
];

const gridExpansionPanelHeaderColumns: GridExpansionPanelHeaderColumn<LoginHistory>[] =
  [
    {
      key: 'time',
      data: 'day',
    },
    {
      key: 'ip',
      data: 'ip',
    },
  ];

const expansionPanelListColumns: DoubleColumnListColumn<
  typeof resolvedData.value[number]
>[] = [
  {
    key: 'time',
    header: 'Date',
  },
  {
    key: 'country',
    header: 'Country',
  },
  {
    key: 'agent',
    header: 'Browser',
  },
  {
    key: 'ip',
    header: 'IP',
  },
  {
    key: 'visitorId',
    header: 'Visitorld',
  },
];

// 轉換資料格式(Deposit)
const loginData = ref<LoginHistory[]>([]);
const resolvedData = computed(() =>
  loginData.value.map((record) => {
    const time = moment(record.time);
    const day = moment(record.time);

    return {
      ...record,
      date: time.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      day: day.format('MM-DD'),
    };
  })
);
// 串接API
onMounted(() => {
  getLoginHistory({
    startTime: new Date(0),
    endTime: new Date(),
  }).then((data) => {
    loginData.value = data.slice(0, 10);
  });
});

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

.Heading-title {
  @include mobile() {
    margin-bottom: 10px;
  }
}
.title {
  color: var(--primary-color);
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
