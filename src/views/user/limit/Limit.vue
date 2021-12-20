<template>
  <Container>
    <Heading
      :title="t('payment.limits.title')"
      :define="t('payment.limits.define')"
    />

    <hr class="page-divider" />

    <Heading :title="t('payment.limits.type_of_limit.title')" />

    <TypeOfLimit />
    <RealityCheck />
    <ActiveLimitTable />
  </Container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { getAllUserLimit } from '@/modules/userLimit/application/limit';
import Container from '@/layout/Container.vue';
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
</style>
