<template>
  <div class="user-dropdown-arrow" @click="openUserMenu">
    <IconBase :width="20" :height="20" viewBox="0 0 20 20">
      <IconArrow />
    </IconBase>
  </div>

  <!-- <div
    v-show="userPopStore.isUserPopShown"
    class="user-dropdown-menu"
    @mouseleave="closeUserMenu"
  > -->
  <teleport to="#app">
    <div
      v-show="userPopStore.isUserPopShown"
      class="user-dropdown-menu"
      @click.self="closeUserMenu"
    >
      <div class="container">
        <div class="back" @click="closeUserMenu">
          <i class="pi pi-angle-left" />
          {{ ' Back' }}
        </div>
        <div class="user-name">
          {{
            `${userStore.userInfo?.firstname || ''} ${
              userStore.userInfo?.lastname || ''
            }`
          }}
        </div>
        <hr class="menu-divider" />
        <router-link
          v-for="{ label, link } of linkList"
          :key="label"
          :to="link"
          class="menu-link"
          @click="closeUserMenu"
        >
          {{ label }}
        </router-link>
        <hr class="menu-divider" />
        <div class="logout" @click="clickLogout">
          <IconBase
            :width="14"
            :height="14"
            viewBox="0 0 14 14"
            icon-color="white"
          >
            <IconPowerOff />
          </IconBase>

          {{ 'Log out' }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconPowerOff from '@/components/icons/IconPowerOff.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import { userLogout } from '@/core/auth/userLogin';
import useNoticePopStore from '@/modules/theHeader/infrastructure/store/noticePop';
import useUserPopStore from '@/modules/theHeader/infrastructure/store/userPop';

const userStore = useUserStore();

const linkList: { label: string; link: string }[] = [
  { label: 'Personal settings', link: '/user/personal-settings' },
  { label: 'Balance', link: '/user/balance' },
  { label: 'Bounses', link: '/user/bonuses' },
  { label: 'Rewards', link: '/user/my-rewards' },
  { label: 'Favorite games', link: '/user/favorite-games' },
  { label: 'Deposit', link: '/user/deposit' },
  { label: 'Withdraw', link: '/user/withdraw' },
  { label: 'Transactions history', link: '/user/payments-history' },
  { label: 'Game history', link: '/user/game-history' },
  { label: 'Login history', link: '/user/login-history' },
];
const noticePopStore = useNoticePopStore();
const userPopStore = useUserPopStore();

function closeUserMenu() {
  userPopStore.setIsUserPopShown(false);
}

function openUserMenu() {
  noticePopStore.setIsNoticePopShown(false);
  userPopStore.setIsUserPopShown(!userPopStore.isUserPopShown);
}

const router = useRouter();
function clickLogout() {
  userLogout();
  // closeUserMenu();
  router.push('/');
}
</script>

<style lang="scss" scoped>
@import '../../styles/breakpoints.scss';

.user-dropdown-arrow {
  margin: 0 17px;
}

.user-dropdown-menu {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11;
}

.container {
  position: absolute;
  top: 60px;
  right: 40px;
  box-sizing: border-box;
  width: 318px;
  height: auto;
  padding: 8px 0;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: #323232;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);

  @include mobile {
    top: 0;
    right: 0;
    overflow: auto;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
  }

  .back {
    display: none;
    align-items: center;
    height: 48px;
    padding-left: 12px;
    font-size: 16px;
    font-family: var(--font-family);
    cursor: pointer;

    i {
      margin-right: 5px;
    }

    @include mobile {
      display: flex;
    }
  }

  .user-name {
    padding: 14px 24px;
    color: var(--text-primary);
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 20px;
  }

  .menu-divider {
    border: 1px solid var(--primary-color);
  }

  .menu-link {
    display: block;
    height: 40px;
    padding: 0 24px;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 40px;
    text-decoration: none;

    &:hover {
      background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
      color: var(--secondary-color);
    }
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 0 24px;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 60px;

    &:hover {
      background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
    }

    svg {
      margin-right: 8px;
    }
  }
}
</style>
