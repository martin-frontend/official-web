<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Withdrawal Record';
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
    key: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    key: 'paymentTypeOption',
    header: 'Transaction Type',
  },
  {
    key: 'withdrawBank',
    header: 'Issuing bank',
  },
  {
    key: 'withdrawAccount',
    header: 'Trans Account',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
  {
    key: 'id',
    header: 'Transaction No.',
  },
  {
    key: 'dateAndTime',
    header: 'Transaction Date',
  },
  {
    key: 'withdrawalId',
    header: 'Review ID',
  },
  {
    key: 'applyStatusM',
    header: 'Review Status',
  },
  {
    key: 'reviewdDateAndTime',
    header: 'Reviewed Time',
  },
  {
    key: 'clientIp',
    header: 'IP',
  },
  {
    key: 'country',
    header: 'Country',
  },
  {
    key: 'device',
    header: 'Device',
  },
  {
    key: 'payAtDay',
    header: 'Completion time',
  },
  {
    key: 'orderStatusM',
    header: 'Trading status',
  },
];
</script>
