<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

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
    key: 'bonusIdsOrderId',
    header: 'Order No.',
  },
  {
    key: 'activityName',
    header: 'Event Name',
  },
  {
    key: 'activityType',
    header: '活動類型',
  },
  {
    key: 'activityTarget',
    header: '活動目標',
  },
  {
    key: 'acceptedTime',
    header: '玩家活動領取時間',
  },
  {
    key: 'activityEndTime',
    header: '玩家活動結束時間',
  },
  {
    key: 'orderId',
    header: 'Bonus ID',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'expiryDate',
    header: 'Expiry Date',
  },
];
</script>
