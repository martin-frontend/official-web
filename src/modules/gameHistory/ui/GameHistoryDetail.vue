<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Game  History';
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
    header: 'Game  Name',
  },
  //   {
  //     key: 'item',
  //     header: 'Game Type',
  //   },
  //   {
  //     key: 'amount',
  //     header: 'sa',
  //   },
  //   {
  //     key: 'id',
  //     header: 'Bet',
  //   },
  {
    key: 'amount',
    header: 'Win',
  },
];
</script>
