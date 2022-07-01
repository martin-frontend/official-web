<template>
  <div class="user-dropdown-arrow" @click="openUserMenu">
    <IconBase :width="20" :height="20" viewBox="0 0 20 20">
      <IconArrow />
    </IconBase>
  </div>

  <teleport to="#app">
    <Transition name="fade">
      <Mask
        v-if="userPopStore.isUserPopShown"
        background="unset"
        @click.self="closeUserMenu"
      />
    </Transition>

    <Transition name="fade">
      <div v-if="userPopStore.isUserPopShown" class="container">
        <div class="back" @click="closeUserMenu">
          <i class="pi pi-angle-left" />
          <p>{{ ' Back' }}</p>
        </div>

        <div class="user">
          <p>
            {{
              `Hey ${userStore.userInfo?.firstname || ''} ${
                userStore.userInfo?.lastname || ''
              }！`
            }}
          </p>
          <WalletAmount class="wallet" @click="closeUserMenu" />
        </div>

        <div class="vip">
          <div class="wrap">
            <p class="header">
              {{ 'VIP Progress' }}
            </p>

            <p class="describe">
              {{ 'See how much of this level you’ve completed' }}
            </p>
          </div>

          <CircularProgressBar :level-rage="levelStore.levelProgress">
            <div class="circle-content">
              <p>{{ `${userStore.userInfo?.level}LV` }}</p>
              <p>{{ `${levelStore.levelProgress}%` }}</p>
            </div>
          </CircularProgressBar>
        </div>

        <RouteMenu :list="routeList" class="router" @close="closeUserMenu" />

        <div class="logout" @click="clickLogout">
          <i class="pi pi-sign-out" />

          {{ 'Log out' }}
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import { userLogout } from '@/core/auth/userLogin';
import useUserPopStore from '@/modules/theHeader/infrastructure/store/userPop';
import CircularProgressBar from '@/components/CircularProgressBar.vue';
import RouteMenu from '@/layout/header/userPop/RouteMenu.vue';
import { routeList } from '@/modules/userPop/userPop';
import WalletAmount from '@/layout/header/WalletAmount.vue';
import Mask from '@/components/Mask.vue';
import {
  initLevelOptions,
  updateLevelStatistic,
} from '@/modules/level/application/level';
import useLevelStore from '@/modules/level/infrastructure/store/levelStore';

const userStore = useUserStore();

const userPopStore = useUserPopStore();
const levelStore = useLevelStore();

function closeUserMenu() {
  userPopStore.setIsUserPopShown(false);
}

function openUserMenu() {
  userPopStore.setIsUserPopShown(!userPopStore.isUserPopShown);
}

const router = useRouter();
function clickLogout() {
  userLogout();
  // closeUserMenu();
  router.push('/');
}

onMounted(() => {
  initLevelOptions();
  updateLevelStatistic();
});
</script>

<style lang="scss" scoped>
@import '@/styles/transition.scss';
@import '@/styles/breakpoints.scss';

.user-dropdown-arrow {
  margin: 0 17px;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 65px;
  right: 25px;
  box-sizing: border-box;
  width: 318px;
  height: auto;
  padding: 8px 0;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: #323232;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);
  z-index: 11;

  @include mobile {
    top: 0;
    right: 0;
    overflow: auto;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
    padding: 8px;
  }

  .back {
    display: none;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding-left: 12px;
    font-size: 16px;
    font-family: var(--font-family);
    cursor: pointer;
    color: var(--primary-color);
    text-align: center;
    position: relative;

    i {
      position: absolute;
      left: 8px;
    }

    @include mobile {
      display: flex;
    }
  }

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    color: var(--primary-color);
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 20px;
    .wallet {
      display: none;
    }
    @include mobile {
      padding: 16px 24px 16px 10px;
      border-bottom: 1px solid var(--primary-color);
      .wallet {
        display: block;
      }
    }
  }

  .vip {
    padding: 16px 24px;
    background: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--primary-color);
    @include mobile {
      display: none;
    }

    .wrap {
      flex: 1;
    }

    .header {
      line-height: 20px;
      font-size: 16px;
      color: var(--primary-color);
      margin-bottom: 4px;
    }
    .describe {
      line-height: 16px;
      font-size: 14px;
      color: var(--text-black);
    }

    .circle-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      line-height: 16px;
      font-size: 14px;
    }
  }

  .router {
    max-height: 668px;
    border-bottom: 1px solid var(--primary-color);
    padding: 35px 20px 35px 30px;
    overflow: auto;
    @include mobile {
      padding: 30px 20px 30px 20px;
      flex: 1;
      max-height: unset;
    }
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 21px 26px;
    color: var(--primary-color);
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s all;
    background-color: transparent;

    &:hover {
      background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
      color: #000;
    }

    i {
      margin-right: 10px;
    }
  }
}
</style>
