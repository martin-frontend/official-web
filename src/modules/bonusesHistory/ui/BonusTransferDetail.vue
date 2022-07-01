<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle">
    <template #transferedBonusId="{ text }">
      <template v-for="bonusId of text" :key="bonusId">
        <Text class="serialNumber" color="detail" size="detail">
          {{ bonusId }}
          <br />
        </Text>
      </template>
    </template>
  </ViewDetail>
</template>

<script setup lang="ts">
import Text from '@/components/Typography.vue';
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';
// import Text from '@/components/Typography.vue';

const detailTitle = 'Promo Bonus  Record';
const viewDetailListColumns = [
  {
    key: 'email',
    header: `Player's Account`,
  },
  {
    key: 'playerName',
    header: `Player's Name`,
  },
  {
    key: 'transferedBonusId',
    header: 'Bonus ID',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'dateAndTime',
    header: 'Completion Time',
  },
  {
    key: 'item',
    header: 'Detailed',
  },
];
</script>
