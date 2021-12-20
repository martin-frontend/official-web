<template>
  <div class="refer-friend-content">
    <div class="title">
      {{ t('refer_friend.title') }}
    </div>
    <div class="define">
      {{ t('refer_friend.define') }}
    </div>
    <div class="refer-img">
      <img src="@/assets/images/refer-friend.png" alt="" />
    </div>

    <div class="button-group">
      <div id="invitationCode" class="invitation-code">
        {{ promoCode }}
      </div>
      <Button @click="handleCopy">{{ t('common.copy') }}</Button>
    </div>

    <a href="#" class="bonus-terms">
      {{ t('refer_friend.bonus_terms') }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { toRefs } from 'vue';
import Button from '@/components/Button.vue';
import useReferFriendStore from '@/modules/referFriend/infrastructure/store/referFriendStore';
import { copyTextToClipboard } from '@/libs/copyText';

const { t } = useI18n();
const referFriendStore = useReferFriendStore();
const { promoCode } = toRefs(referFriendStore);

const handleCopy = () => {
  copyTextToClipboard('invitationCode');
};
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
$tablet-h: 1440px;

@import '@/styles/breakpoints.scss';
.refer-friend-content {
  flex: 1;
  margin: 0 145px;
  text-align: center;

  @media (max-width: #{$tablet-h - 1px}) {
    margin: 0;
  }

  .title {
    font-size: 36px;
    line-height: 42px;
    font-weight: 500;
    margin-bottom: 24px;

    @include mobile() {
      font-size: 22px;
      line-height: 24px;
      margin-bottom: 16px;
    }
  }

  .define {
    text-align: center;
    font-size: 36px;
    line-height: 42px;
    color: var(--primary-color);

    @include mobile() {
      font-size: 22px;
      line-height: 24px;
    }
  }

  .refer-img {
    width: 100%;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  .button-group {
    display: flex;
    width: 500px;
    justify-content: center;
    width: 100%;
    margin-bottom: 24px;

    @include mobile() {
      margin-bottom: 16px;
    }
    .invitation-code {
      display: flex;
      flex: 1;
      max-width: 248px;
      height: 50px;
      align-items: center;
      background: #f5f5f5;
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      padding-left: 16px;
      font-size: 16px;
      line-height: 20px;
      color: #424242;
      text-align: left;
      margin-right: 20px;
    }
  }

  .bonus-terms {
    font-size: 16px;
    line-height: 20px;
    color: #99c2ec;
    text-decoration-line: underline;

    @include mobile() {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
