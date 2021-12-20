<template>
  <OutlineCard class="total-referrals">
    <div class="total-title">
      {{ t('refer_friend.total_referrals') }}
    </div>
    <div class="total-content">
      <div class="reward">
        <div class="reward-title">
          {{ t('refer_friend.reward') }}
        </div>
        <div class="reward-amount">
          {{ totalReceivedReward }}
        </div>
      </div>
      <div class="common-group">
        <div class="common-wrap">
          <div class="name">
            {{ t('refer_friend.invitation') }}
          </div>
          <div class="count">
            {{ completedCount }}
          </div>
        </div>
        <div class="common-wrap">
          <div class="name">
            {{ t('refer_friend.panding') }}
          </div>
          <div class="count">
            {{ notCompletedCount }}
          </div>
        </div>
      </div>
    </div>
  </OutlineCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { toRefs } from 'vue';
import OutlineCard from '@/components/OutlineCard.vue';
import useReferFriendStore from '@/modules/referFriend/infrastructure/store/referFriendStore';

const { t } = useI18n();

const referFriendStore = useReferFriendStore();

const { completedCount, notCompletedCount, totalReceivedReward } =
  toRefs(referFriendStore);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

$tablet-h: 1440px;
.total-referrals {
  width: 100%;
  max-width: 250px;
  height: 400px;
  background: #323232;
  border-radius: 10px;
  margin-left: auto;
  padding: 24px 29px;
  color: #c1a14e;
  text-align: center;

  @media (max-width: #{$tablet-h - 1px}) {
    max-width: unset;
    height: auto;
    margin-top: 24px;
    margin-left: 0;
  }

  @include tablet-v() {
    padding: 32px;
  }

  @include mobile() {
    margin-top: 16px;
    padding: 16px;
  }

  .total-title {
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--primary-color);

    @include mobile() {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .total-content {
    @media (max-width: #{$tablet-h - 1px}) {
      margin: 30px 0;
      display: flex;
    }
    .reward {
      padding: 10px 0;
      text-align: center;
      @media (max-width: #{$tablet-h - 1px}) {
        flex: 1;
      }
      .reward-title {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 10px;

        @include mobile() {
          font-size: 12px;
          line-height: 16px;
        }
      }

      .reward-amount {
        font-size: 36px;
        line-height: 42px;
        color: #fff;

        @include mobile() {
          font-size: 22px;
          line-height: 24px;
        }
      }
    }

    .common-group {
      flex: 1;
    }

    .common-wrap {
      display: flex;
      padding: 10px 0;
      border-top: 1px solid #c1a14e;
      justify-content: space-between;
      font-size: 16px;
      line-height: 20px;

      @media (max-width: #{$tablet-h - 1px}) {
        &:first-child {
          border-top: 0px;
        }
      }

      @include mobile() {
        font-size: 12px;
        line-height: 16px;
      }
      .count {
        color: #fff;
      }
    }
  }
}
</style>
