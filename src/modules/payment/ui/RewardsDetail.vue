<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Achievements Reward Record';
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
    key: 'orderId',
    header: 'Order No.',
  },
  {
    key: 'item',
    header: 'Event Name',
  },
  {
    key: 'achievementTargetTypeName',
    header: 'Type',
  },
  {
    key: 'achievementTarget',
    header: '成就目標',
  },
  {
    key: 'amount',
    header: 'amonut',
  },
  {
    key: 'rewardReceivedTime',
    header: '領取時間',
  },
];
</script>
