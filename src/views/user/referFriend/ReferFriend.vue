<template>
  <div>
    <div class="refer-friend-wrap">
      <ReferFriendContent />
      <ReferFriendTotal />
    </div>
    <ReferFriendDefine />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import ReferFriendContent from './component/ReferFriendContent.vue';
import ReferFriendTotal from './component/ReferFriendTotal.vue';
import ReferFriendDefine from './component/ReferFriendDefine.vue';
import { updateReferralDetails } from '@/modules/referFriend/application/referFriend';

onMounted(() => {
  updateReferralDetails();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

$tablet-h: 1440px;
.refer-friend-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  @media (max-width: #{$tablet-h - 1px}) {
    flex-direction: column;
  }
}
</style>
