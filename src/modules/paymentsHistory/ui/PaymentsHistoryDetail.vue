<template>
  <ViewDetail :columns="viewDetailListColumns" :detail-title="detailTitle" />
</template>

<script setup lang="ts">
import ViewDetail from '@/modules/paymentsHistory/ui/ViewDetail.vue';

const detailTitle = 'Deposit Record';
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
    key: 'depositBank',
    header: 'Issuing bank',
  },
  {
    key: 'depositAccount',
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
    key: 'dateAndTime',
    header: 'Transaction Date',
  },
  {
    key: 'payAtTime',
    header: 'Completion time',
  },
  {
    key: 'status',
    header: 'Trading status',
  },
];
</script>
