<template>
  <Heading
    :title="t('payment.limits.active_limits.title')"
    :define="t('payment.limits.active_limits.define')"
  />

  <ul class="limit-description">
    <li>
      {{
        'If you have more than one limit in place, the lowest limit will be valid. Example: If you have a limit of 500 a month and 200 a day, you will not be able to deposit more than 200 a day and also no more than 500 a month.'
      }}
    </li>
    <li>
      {{
        "If you want to reduce your limit, it will be done immediately. However if you wish to increase it, you will need to wait 24 hours for this to take effect. The date of the change in limits will be visible in 'Pending Limits'"
      }}
    </li>
  </ul>
  <DataTable
    v-if="isTable"
    :data="limitStore.userLimits"
    :columns="tableHeaderColumns"
  >
    <template #status="{ text }">
      <Text :color="text === 'Active' ? 'success' : 'error'">
        {{ text }}
      </Text>
    </template>
    <template #currentAmount="{ text }">
      <Text :color="text >= 0 ? 'primary' : 'error'">{{ text }}</Text>
    </template>
    <template #use="{ text }">
      <p class="table-amount">{{ text.useAmount }}</p>
      <p class="table-time">{{ text.useTime }}</p>
    </template>
  </DataTable>
  <template v-else>
    <OutlineCard>
      <ExpansionPanel v-for="record of limitStore.userLimits" :key="record.id">
        <template #header>
          <GridExpansionPanelHeader
            :data="record"
            :columns="doubleColumnListHeaderColumns"
          >
            <template #use="{ text }">
              {{ text.useAmount }}
            </template>
          </GridExpansionPanelHeader>
        </template>

        <template #content>
          <DoubleColumnList
            :data="record"
            :columns="doubleColumnListContentColumns"
          >
            <template #use="{ text }">
              <p class="card-amount">
                {{ text.useAmount }}
              </p>
              <p class="card-time">{{ text.useTime }}</p>
            </template>
          </DoubleColumnList>
        </template>
      </ExpansionPanel>
    </OutlineCard>
  </template>
</template>

<script lang="ts" setup>
// import { useI18n } from 'vue-i18n';
import { computed } from 'vue-demi';
import { useI18n } from 'vue-i18n';
import DataTable from '@/components/DataTable.vue';
import Text from '@/components/Typography.vue';
import useLimitStore from '@/modules/userLimit/infrastructure/store/limitStore';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import OutlineCard from '@/components/OutlineCard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import GridExpansionPanelHeader from '@/components/GridExpansionPanelHeader.vue';
import DoubleColumnList from '@/components/DoubleColumnList.vue';
import Heading from '@/components/Heading.vue';

const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);
const { t } = useI18n();

const tableHeaderColumns = [
  {
    key: 'typeGroupName',
    header: 'Type',
    data: 'typeGroupName',
  },
  {
    key: 'status',
    header: 'Status',
    data: 'status',
  },
  {
    key: 'newAmount',
    header: 'Amount',
    data: 'newAmount',
  },
  {
    key: 'duration',
    header: 'Duration',
    data: 'duration',
  },
  {
    key: 'use',
    header: 'Use',
    data: 'use',
  },
];

const doubleColumnListHeaderColumns = [
  {
    key: 'typeGroupName',
    header: 'Type',
    data: 'typeGroupName',
  },
  {
    key: 'status',
    header: 'Status',
    data: 'status',
  },
  {
    key: 'use',
    header: 'Use',
    data: 'use',
  },
];

const doubleColumnListContentColumns = [
  {
    key: 'typeGroupName',
    header: 'Type',
    data: 'typeGroupName',
  },
  {
    key: 'status',
    header: 'Status',
    data: 'status',
  },
  {
    key: 'newAmount',
    header: 'Amount',
    data: 'newAmount',
  },
  {
    key: 'duration',
    header: 'Duration',
    data: 'duration',
  },
  {
    key: 'use',
    header: 'Use',
    data: 'use',
  },
];
const limitStore = useLimitStore();
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.table-amount {
  font-size: 16px;
  line-height: 20px;
  color: var(--text-primary);
  text-align: left;
  margin-bottom: 4px;
}
.table-time {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-primary);
  text-align: left;
}

.card-amount {
  text-align: right;
  margin-bottom: 8px;
}
.card-time {
  text-align: right;
}
</style>
