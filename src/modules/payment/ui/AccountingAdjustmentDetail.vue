<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Account Adjustment';
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
    header: 'Serial Number',
  },
  {
    key: 'beforeAmount',
    header: 'Before',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'afterAmount',
    header: 'After',
  },
  {
    key: 'adjustmentTime',
    header: 'Completion Time',
  },
  {
    key: 'adjustmentStatus',
    header: 'Accounting Adjustments Confirm',
  },
  {
    key: 'adjustmentReason',
    header: 'Detailed',
  },
];
</script>
