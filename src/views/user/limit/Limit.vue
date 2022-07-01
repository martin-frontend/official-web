<template>
  <div class="limit">
    <Heading :define="t('payment.limits.define')" />

    <TypeOfLimit />
    <RealityCheck />
    <ActiveLimitTable />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { getAllUserLimit } from '@/modules/userLimit/application/limit';
import Heading from '@/components/Heading.vue';
import ActiveLimitTable from './component/ActiveLimitTable.vue';
import RealityCheck from './component/RealityCheck.vue';
import TypeOfLimit from './component/TypeOfLimit.vue';

const { t } = useI18n();
onMounted(() => {
  getAllUserLimit();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
::v-deep(.p-dropdown-trigger) {
  display: none;
}
.limit {
  text-align: left;
}
</style>
