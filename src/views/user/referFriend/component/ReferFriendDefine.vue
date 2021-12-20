<template>
  <OutlineCard>
    <div class="bulletin">
      <div class="define-title">
        {{ 'How To Invite Your Friends And Get A The Refer A Friend Bonus:' }}
      </div>
      <div class="describe describe1">
        {{
          '1. Sign up for the offer: To invite your friend(s) just click on the ‘Refer a Friend’ tab and share your code to your friend(s).'
        }}
      </div>
      <div class="describe">
        {{ '2. Your friend(s) register with your prome code.' }}
      </div>
      <div class="describe">
        {{
          `3. You will be receiving an CAD ${reward} reward bonus for every referee if your referee fulfils a deposit requirement of CAD ${requirementBetAmount} within 30 days.`
        }}
      </div>
      <div class="describe describe5">
        {{
          `To qualify for the bonus, deposit $${requirementDepositAmount} and wager through that amount 1x.`
        }}
      </div>
    </div>
  </OutlineCard>
</template>

<script lang="ts" setup>
// import { useI18n } from 'vue-i18n';
import { toRefs } from 'vue';
import OutlineCard from '@/components/OutlineCard.vue';
import useReferFriendStore from '@/modules/referFriend/infrastructure/store/referFriendStore';

// const { t } = useI18n();
// console.log(t);

const referFriendStore = useReferFriendStore();
const { requirementDepositAmount, requirementBetAmount, reward } =
  toRefs(referFriendStore);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.bulletin {
  padding: 32px;
  .define-title {
    font-size: 26px;
    line-height: 26px;
    color: var(--primary-color);

    @include mobile() {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .describe {
    font-size: 16px;
    line-height: 20px;
    color: #9e9e9e;

    @include mobile() {
      font-size: 12px;
      line-height: 16px;
    }
    &.describe5,
    &.describe1 {
      margin-top: 20px;
      @include mobile() {
        margin-top: 15px;
      }
    }
  }
}
</style>
