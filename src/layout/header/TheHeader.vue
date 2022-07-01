<template>
  <div class="header-left-area">
    <div class="hamburger" @click="handleShowMenu(!isMenuShown)">
      <IconBase
        class="icon-hamburger"
        :width="24"
        :height="24"
        viewBox="0 0 24 24"
      >
        <component :is="isMenuShown ? IconHamburgerMinus : IconHamburgerPlus" />
      </IconBase>
    </div>

    <div
      class="game"
      @mouseenter="handleShowGameMenu(true)"
      @mouseleave="handleShowGameMenu(false)"
    >
      <IconBase :width="24" :height="24" viewBox="0 0 24 24" icon-color="black">
        <IconGame />
      </IconBase>

      <p>{{ 'GAME' }}</p>

      <IconBase icon-color="black" :width="20" :height="20" viewBox="0 0 20 20">
        <IconArrow />
      </IconBase>

      <GameMenu
        :is-menu-shown="isGameMenuShown"
        @handleShowRecommend="handleShowRecommend"
        @handleShowMenu="handleShowGameMenu"
      />
    </div>
  </div>
  <header>
    <div class="logo-container">
      <router-link to="/" exact class="flex">
        <div class="logo">{{ 'Mirage Tech' }}</div>
      </router-link>
    </div>

    <div v-if="authStore.isAuthenticated" class="user-info-area">
      <WalletAmount class="wallet" />

      <NoticePop />

      <div class="avatar">{{ userNameLetter }}</div>

      <UserPop />
    </div>

    <div v-else class="login-area">
      <Button
        class="p-button-rounded p-button-outlined login-btn"
        label="LOG IN"
        @click="openLoginDialog"
      />
      <Button
        class="p-button-rounded primary-linear-btn sign-in-btn"
        @click="openSignUpDialog"
      >
        <IconBase
          :width="24"
          :height="24"
          viewBox="0 0 24 24"
          icon-color="#000"
        >
          <IconStar />
        </IconBase>
        {{ 'SIGN UP' }}
      </Button>
    </div>
  </header>

  <TheMenu
    :is-menu-shown="isMenuShown"
    @handleShowRecommend="handleShowRecommend"
    @handleShowMenu="handleShowMenu"
  />

  <LoginDialog v-model:visible="loginStore.isLoginDialogShown" />

  <SignUpDialog v-model:visible="signUpStore.isSignUpDialogShown" />

  <ForgetPasswordDialog
    v-model:visible="forgetPasswordStore.isForgetPasswordDialogShown"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { computed, onMounted, ref } from 'vue';
// import { useI18n } from 'vue-i18n';
import IconBase from '@/components/icons/IconBase.vue';
import IconStar from '@/components/icons/IconStar.vue';
import LoginDialog from '@/layout/header/LoginDialog.vue';
import SignUpDialog from '@/layout/header/signUpDialog/SignUpDialog.vue';
import NoticePop from '@/layout/header/NoticePop.vue';
import UserPop from '@/layout/header/userPop/UserPop.vue';
import useAuthStore from '@/core/auth/authStore';
import useLoginStore from '@/modules/user/Infrastructure/store/loginStore';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import useRecommendStore from '@/modules/recommend/infrastructure/store/recommendStore';
import IconArrow from '@/components/icons/IconArrow.vue';
import TheMenu from '@/layout/header/TheMenu.vue';
import ForgetPasswordDialog from '@/layout/header/ForgetPasswordDialog.vue';
import useForgetPasswordStore from '@/modules/user/Infrastructure/store/forgetPasswordStore';
import useSignUpStore from '@/modules/user/Infrastructure/store/signUpStore';
import {
  openSignUpDialog,
  openLoginDialog,
} from '@/modules/user/application/login';
import WalletAmount from '@/layout/header/WalletAmount.vue';
import IconHamburgerPlus from '@/components/icons/IconHamburgerPlus.vue';
import IconHamburgerMinus from '@/components/icons/IconHamburgerMinus.vue';
import IconGame from '@/components/icons/IconGame.vue';
import GameMenu from '@/layout/header/GameMenu.vue';

// use i18n
// const { t } = useI18n();

const signUpStore = useSignUpStore();

const forgetPasswordStore = useForgetPasswordStore();

const loginStore = useLoginStore();

const isShowSubHeader = ref(false);

const authStore = useAuthStore();

const userStore = useUserStore();
const recommendStore = useRecommendStore();
const userNameLetter = computed(() =>
  userStore.userInfo?.firstname?.substring(0, 2)
);

// handle scroll to decide if show subtitle or not
const startScrollY = ref<number>(0);
const endScrollY = ref<number>(0);

const scrollDebounceTimeout = ref<number>();

const isMenuShown = ref<boolean>(false);

const isGameMenuShown = ref<boolean>(false);

function resetScrollY() {
  startScrollY.value = 0;
  endScrollY.value = 0;
}

function initScrollY() {
  if (!startScrollY.value) startScrollY.value = window.scrollY;
}

function updateIsShowSubHeader() {
  const isScrollDown = startScrollY.value < endScrollY.value;
  isShowSubHeader.value = !isScrollDown;
}

function updateScrollState() {
  endScrollY.value = window.scrollY;
  clearTimeout(scrollDebounceTimeout.value);
  scrollDebounceTimeout.value = setTimeout(() => {
    updateIsShowSubHeader();
    resetScrollY();
  }, 100);
}

function scrollHandler() {
  initScrollY();
  updateScrollState();
}

onMounted(() => {
  document.addEventListener('scroll', scrollHandler);
});

const handleShowMenu = (isShow: boolean) => {
  isMenuShown.value = isShow;
  isGameMenuShown.value = false;
};

const handleShowGameMenu = (isShow: boolean) => {
  isGameMenuShown.value = isShow;
  isMenuShown.value = false;
};

const handleShowRecommend = () => {
  recommendStore.popUp();
};
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

header {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 56px;
  background-color: black;
  padding-right: 26px;
  border-bottom: 1px solid var(--primary-color);

  @include mobile {
    padding: 0 18px;
  }
}

.header-left-area {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  height: 56px;
  border-bottom: 1px solid var(--primary-color);

  @include mobile {
    z-index: 11;
  }
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 100%;
    background-color: #323232;
    cursor: pointer;

    @include mobile {
      background-color: transparent;
    }
  }
  .game {
    display: flex;
    align-items: center;
    // justify-content: center;
    width: 176px;
    height: 100%;
    background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
    padding: 0 10px 0 25px;
    cursor: pointer;
    position: relative;

    @include mobile {
      display: none;
    }

    p {
      margin-left: 11px;
      margin-right: auto;
      color: black;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
  }
  .recommend-search-button {
    @include mobile {
      display: none;
    }
  }
}

.logo-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @include mobile {
    left: 64px;
    transform: unset;
  }
  .logo {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 38px;
    font-family: var(--font-family);
    line-height: 56px;

    @include mobile {
      // position: unset;
      // margin-left: 10px;
      color: var(--text-primary);
      font-size: 20px;
    }
  }
}

.lang-area {
  display: flex;
  align-items: center;
  margin-left: 26px;
  cursor: pointer;

  .lang-btn {
    width: 30px;
    min-width: 0;
    height: 18px;
    padding: 0;
    border-radius: 3px;
  }

  .lang-name {
    margin-left: 8px;
    font-weight: 400;
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 20px;
    letter-spacing: -0.04em;
  }

  .icon-dropdown {
    margin-left: 8px;
  }
}

.user-info-area {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  // margin-left: auto;
  // padding-right: 20px;

  @include mobile {
    .wallet {
      display: none;
    }
  }

  .alert-btn.p-button-icon-only {
    overflow: visible;
    width: 40px;
    height: 40px;
    margin-left: 26px;
    padding: 0;
    border: 1px solid #505050;

    .p-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    color: #000;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
    font-family: var(--font-family);
    line-height: 28px;
    text-align: center;
  }
}

.login-area {
  display: flex;
  align-items: center;
  margin-left: auto;

  .login-btn {
    display: flex;
    align-items: center;
    width: 76px;
    height: 40px;
    padding: 0;
    background: #000;
    font-size: 14px;
    font-family: var(--font-family);
    line-height: 18px;

    @include mobile {
      width: 64px;
      height: 36px;
    }
  }

  .sign-in-btn {
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 12px;
    color: #000;
    font-size: 14px;
    font-family: var(--font-family);
    line-height: 18px;
    text-align: center;

    svg {
      margin-right: 12px;
    }

    @include mobile {
      padding: 9.5px;
    }
  }
}

.sub-header {
  position: fixed;
  top: 0;
  z-index: 9;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 56px;
  background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
  transition: 0.3s;
  box-sizing: unset;

  @include mobile {
    height: 48px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .header-box {
    display: flex;
    margin: auto;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 32px;
    margin: 0 4px;
    padding: 0 16px;
    border: 1px solid #171927;
    border-radius: 100px;
    color: #171927;
    font-weight: 500;
    font-size: 16px;
    font-family: var(--font-family);
    line-height: 20px;
    text-align: center;
    white-space: nowrap;

    @include mobile {
      height: 29px;
      margin: 0 4px;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .router-link-exact-active {
    background: #171927;
    color: var(--primary-color);
    font-weight: 400;

    @include mobile {
      background: #000;
    }
  }
}

.show-sub-header {
  top: 56px;
}

.alert-btn.p-button-icon-only {
  overflow: visible;
  width: 40px;
  height: 40px;
  margin-left: 16px;
  padding: 0;
  border: 1px solid #505050;
}

.flex {
  display: flex;
}
</style>
