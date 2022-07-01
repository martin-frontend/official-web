<template>
  <div class="side-bar">
    <div class="level-container">
      <p class="header">
        {{ 'Level' }}
      </p>

      <p class="level">
        {{ authStore.userInfo?.level }}
      </p>

      <div class="hint">
        <!-- <p>
          {{ 'Next Level' }}
        </p>
        <IconBase class="icon" :width="8" :height="12" viewBox="0 0 8 12">
          <IconEexclamationMark />
        </IconBase> -->
      </div>

      <div class="progress">
        <span class="rate">{{ `${levelStore.levelProgress}%` }}</span>
        <span class="bar">
          <div
            class="schedule"
            :style="{ width: `${levelStore.levelProgress}%` }"
          />
        </span>
      </div>
    </div>

    <div class="money-container">
      <div class="balance">
        <p class="header">{{ 'Balance' }}</p>
        <p class="amount">{{ `$ ${balanceStore.amount.toLocaleString()}` }}</p>
      </div>

      <div class="bonus">
        <p class="header">{{ 'Bonus' }}</p>
        <p class="amount">{{ `${balanceStore.bonus} Points` }}</p>
      </div>
    </div>

    <div class="menu">
      <router-link
        v-for="{ name, path, icon, image } of menuOptions"
        :key="name"
        v-slot="{ isActive }"
        :to="path"
      >
        <div class="wrap">
          <div v-if="icon" class="icon">
            <IconBase
              :icon-color="isActive ? 'black' : 'white'"
              class="icon"
              :width="40"
              :height="40"
              viewBox="0 0 40 40"
            >
              <component :is="icon" />
            </IconBase>
          </div>

          <div v-if="image" class="image">
            <img :src="image" alt="" />
          </div>

          <div class="name">{{ name }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
// import IconEexclamationMark from '@/components/icons/IconEexclamationMark.vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import IconWallet from '@/components/icons/IconWallet.vue';
import IconDeposit from '@/components/icons/IconDeposit.vue';
import IconMenuHistory from '@/components/icons/IconMenuHistory.vue';
import IconReferFriend from '@/components/icons/IconReferFriend.vue';
import IconFavourite from '@/components/icons/IconFavourite.vue';
import coin from '@/assets/icons/coin.png';
import MenuBonuses from '@/assets/icons/MenuBonuses.png';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import useLevelStore from '@/modules/level/infrastructure/store/levelStore';
// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();
// console.log(t);

const balanceStore = useBalanceStore();

const authStore = useUserStore();

const levelStore = useLevelStore();

const menuOptions = computed(() => [
  {
    path: '/user/my-account',
    icon: IconAccount,
    name: 'My Account',
  },
  {
    path: '/user/balance',
    icon: IconWallet,
    name: 'Wallet',
  },
  {
    path: '/user/bonuses',
    image: MenuBonuses,
    name: 'Bonuses',
  },
  {
    path: '/user/my-rewards',
    image: coin,
    name: 'Rewards',
  },
  {
    path: '/user/deposit',
    icon: IconDeposit,
    name: 'Deposit',
  },
  {
    path: '/user/history',
    icon: IconMenuHistory,
    name: 'History',
  },
  {
    path: '/user/refer-friend',
    icon: IconReferFriend,
    name: 'Refer Friend',
  },
  {
    path: '/user/favorite-games',
    icon: IconFavourite,
    name: 'Favourite',
  },
]);
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.side-bar {
  display: none;
  width: 224px;
  min-width: 224px;
  background-color: black;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  margin-right: 24px;
  padding: 24px 16px;
  color: var(--primary-color);

  @include desktop {
    display: inline;
  }

  .level-container {
    text-align: center;
    margin-bottom: 20px;
    .header {
      line-height: 24px;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .level {
      line-height: 42px;
      font-size: 42px;
      color: white;
      margin-bottom: 4px;
    }
    .hint {
      display: flex;
      line-height: 12px;
      font-size: 12px;
      text-decoration-line: underline;
      color: #9e9e9e;
      cursor: pointer;
      margin-bottom: 6px;
      align-items: center;
      p {
        margin-left: auto;
      }
      .icon {
        display: inline;
        margin-left: 6px;
      }
    }

    .progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rate {
        font-size: 12px;
        color: #99c2ec;
        margin-right: 4px;
      }
      .bar {
        flex: 1;
        height: 20px;
        background: #323232;
        border: 0.5px solid #99c2ec;
        border-radius: 100px;
        .schedule {
          width: 0;
          height: 100%;
          background: #99c2ec;
          border-radius: 100px;
        }
      }
    }
  }
  .money-container {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #c1a14e;
    margin-bottom: 16px;
    text-align: left;
    .header {
      line-height: 16px;
      font-size: 12px;
      margin-bottom: 2px;
    }
    .amount {
      line-height: 20px;
      font-size: 16px;
      color: white;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .bonus,
    .balance {
      width: 50%;
    }
    .bonus {
      padding-left: 5px;
    }
  }

  .menu {
    display: grid;
    grid-template: 90px 90px 90px 90px / 90px 90px;
    grid-row-gap: 12px;
    justify-content: space-between;
    .wrap {
      padding: 10px;
      border: 1px solid #c1a14e;
      border-radius: 10px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      .image {
        width: 40px;
        height: 40px;
        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin-top: 5px;
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
      }
    }
    .router-link-active {
      .wrap {
        background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
        color: black;
      }
    }
  }
}
</style>
