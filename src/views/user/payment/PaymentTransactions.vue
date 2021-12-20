<template>
  <Container>
    <Heading
      :title="t('payment.transactions.title')"
      :define="t('payment.transactions.define')"
    />
    <!-- search for type and date -->
    <FiltersWrap
      v-model:start-time="startTime"
      v-model:end-time="endTime"
      :date-limits="dateLimits"
      @handleSearch="searching(searchTransactionsForm.values.value)"
    >
      <FiltersWrapItem>
        <div class="selector">
          <span class="selector-label">
            {{ t('common.type') }}
          </span>
          <select v-model="kind" class="selector-input">
            <option :value="-1">
              {{ t('payment.transaction.kind.SEE_ALL') }}
            </option>
            <option
              v-for="option of transactionType"
              v-show="
                option !==
                PaymentTransactionTypeFilter[
                  PaymentTransactionTypeFilter.SEE_ALL
                ]
              "
              :key="option"
              :value="PaymentTransactionTypeFilter[option]"
            >
              {{ t(`payment.transaction.kind.${option}`) }}
            </option>
          </select>
          <IconBase
            :width="20"
            :height="20"
            viewBox="0 0 9 6"
            class="selector-icon"
          >
            <IconFilledArrow />
          </IconBase>
        </div>
      </FiltersWrapItem>
    </FiltersWrap>

    <PaymentTransactionsDataTable :content-data="content" :is-table="isTable" />

    <Pagination
      v-model:page="queryObject.page"
      :total-rows="totalRows"
      @update:page="updateTransactions"
    />
  </Container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import Pagination from '@/components/Pagination.vue';
import {
  PaymentTransaction,
  PaymentTransactionTypeFilter,
} from '@/modules/payment/domain/payment.model';
import { getPaymentTransactionsOther } from '@/modules/payment/infrastructure/payment.api';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import PaymentTransactionsDataTable from '@/modules/payment/ui/PaymentTransactionsDataTable.vue';
import FiltersWrap from '@/components/FiltersWrap.vue';
import FiltersWrapItem from '@/components/FiltersWrapItem.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';

// use i18n
const { t } = useI18n();

// RWD
const device = useDevice();
const isTable = computed(
  () =>
    device.value !== Device.MOBILE && device.value !== Device.TABLET_VERTICAL
);

const dateLimits = {
  minDate: moment().subtract(3, 'months').toDate(),
  maxDate: new Date(),
};

const transactionType: (string | PaymentTransactionTypeFilter)[] =
  Object.values(PaymentTransactionTypeFilter).filter(
    (item) => typeof item === 'string'
  );

const searchTransactionsForm = new FormGroup({
  startTime: new Date(),
  endTime: new Date(),
  page: 1,
  kind: PaymentTransactionTypeFilter.SEE_ALL,
  size: 20,
  type: 0,
});
const { startTime, endTime, page: nowPage, kind } = searchTransactionsForm.refs;

const queryObject = ref({
  page: 1,
  size: 20,
  startTime: new Date(),
  endTime: new Date(),
  kind: PaymentTransactionTypeFilter.SEE_ALL,
});

const content = ref<PaymentTransaction[]>([]);
const totalRows = ref<number>(0);

function updateTransactions() {
  if (queryObject.value.kind === -1) {
    delete queryObject.value.kind;
  }
  getPaymentTransactionsOther(queryObject.value).then((res) => {
    content.value = res.content;
    totalRows.value = res.totalElements;
  });
}

function searching({ ...rest }) {
  nowPage.value = 1;
  queryObject.value = { ...rest };
  updateTransactions();
}

onMounted(() => {
  updateTransactions();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.expansionHeader {
  width: 100%;
  display: grid;
  grid-template-columns: 15fr 1fr;
  align-items: center;
  box-sizing: border-box;
  padding: 18px 28px;

  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  }

  @include mobile {
    padding: 0 16px 18px 16px;
  }
}
.search-input {
  @include desktop {
    width: 248px;
  }
}

.selector {
  position: relative;
  overflow: hidden;

  .selector-label {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 12px;
    line-height: 16px;
    color: var(--primary-color);
  }

  .selector-input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 8px 16px;
    padding-top: 24px;
    color: #424242;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: #fff;

    &:focus {
      background-color: #f5f5f5;
      border-color: var(--primary-color);
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .selector-icon {
    position: absolute;
    top: 20px;
    right: 16px;
  }

  option {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 22px;
    color: var(--primary-color);
  }
}
</style>
