<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Rebate';
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
    key: 'level',
    header: `Player's Level`,
  },
  {
    key: 'orderId',
    header: 'Rebate Order',
  },
  {
    key: 'gameCategory',
    header: 'Game Category',
  },
  {
    key: 'rebateRate',
    header: 'Rebate Rate',
  },
  {
    key: 'validBet',
    header: 'Bet',
  },
  {
    key: 'amount',
    header: 'Rebate',
  },
  {
    key: 'rebateTime',
    header: 'Completion Time',
  },
];
</script>
