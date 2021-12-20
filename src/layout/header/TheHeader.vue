<template>
  <header>
    <!-- 
    <div class="lang-area">
      <Button class="lang-btn primary-linear-btn">
        <IconBase :width="30" :height="19" viewBox="0 0 30 19">
          <IconEarth />
        </IconBase>
      </Button>

      <span class="lang-name">{{ 'English' }}</span>

      <IconBase
        :width="9"
        :height="6"
        icon-color="#fff"
        viewBox="0 0 9 6"
        class="icon-dropdown"
      >
        <IconFilledArrow />
      </IconBase>
    </div> -->

    <div class="header-left-area">
      <IconBase
        class="icon-hamburger"
        :width="24"
        :height="24"
        viewBox="0 0 24 24"
        icon-color="#000"
        @click="handleShowMenu(true)"
      >
        <IconHamburger />
      </IconBase>

      <div class="recommend-search-button">
        <Button
          class="
            p-button-rounded p-button-icon-only p-button-outlined
            alert-btn
          "
          @click="handleShowRecommend"
        >
          <IconBase
            :width="16"
            :height="16"
            viewBox="0 0 16 16"
            icon-color="#000"
          >
            <IconSearch />
          </IconBase>
        </Button>
      </div>
    </div>

    <div class="logo-container">
      <router-link to="/" exact>
        <div class="logo">{{ 'LOGO' }}</div>
      </router-link>
    </div>

    <div v-if="authStore.isAuthenticated" class="user-info-area">
      <router-link to="/user/balance">
        <div class="wallet-amount">
          <Button
            class="p-button-rounded p-button-icon-only primary-linear-btn"
          >
            <IconBase
              :width="12"
              :height="12"
              viewBox="0 0 12 12"
              icon-color="#000"
            >
              <IconPlus />
            </IconBase>
          </Button>
          <span>{{ balanceStore.amount.toLocaleString() }}</span>
        </div>
      </router-link>
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

  <div class="sub-header" :class="{ 'show-sub-header': isShowSubHeader }">
    <div class="header-box">
      <router-link to="/" exact>{{ t('sub_header.home') }}</router-link>
      <template v-if="!isMatchUserPath">
        <!-- <router-link to="/slots">{{ 'Slots' }}</router-link> -->
        <!-- <router-link to="/live-casino">{{ 'Live Casino' }}</router-link> -->
        <!-- <router-link to="/jackpots">{{ 'Jackpots' }}</router-link> -->
        <!-- <router-link to="/table-games">{{ 'Table Games' }}</router-link> -->
        <router-link to="/promotions">
          {{ t('common.promotions') }}
        </router-link>
      </template>
      <template v-else>
        <router-link to="/user/balance">
          {{ t('sub_header.balance') }}
        </router-link>
        <router-link to="/user/my-rewards">
          {{ t('sub_header.rewards') }}
        </router-link>
        <router-link to="/user/bonuses">
          {{ t('sub_header.bonuses') }}
        </router-link>
        <router-link to="/user/game-history">
          {{ t('sub_header.game_history') }}
        </router-link>
        <router-link to="/user/verification">
          {{ t('sub_header.verification') }}
        </router-link>
        <router-link to="/user/limit">
          {{ t('sub_header.responsible_gambling') }}
        </router-link>
        <router-link to="/user/personal-settings">
          {{ t('sub_header.personal_settings') }}
        </router-link>
        <router-link to="/user/login-history">
          {{ t('sub_header.login_history') }}
        </router-link>
        <router-link to="/user/refer-friend">
          {{ t('sub_header.refer_friend') }}
        </router-link>
      </template>
    </div>
  </div>

  <TheMenu
    :is-menu-shown="isMenuShown"
    @handleShowRecommend="handleShowRecommend"
    @handleShowMenu="handleShowMenu"
  />
  <LoginDialog />
  <SignUpDialog v-model:visible="signUpDialog" @close="close" />
  <ForgetPasswordDialog />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import IconBase from '@/components/icons/IconBase.vue';
// import IconMenu from '@/components/icons/IconMenu.vue';
// import IconEarth from '@/components/icons/IconEarth.vue';
// import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconStar from '@/components/icons/IconStar.vue';
import LoginDialog from './LoginDialog.vue';
import SignUpDialog from './signUpDialog/SignUpDialog.vue';
import ForgetPasswordDialog from './ForgetPasswordDialog.vue';
import NoticePop from './NoticePop.vue';
import UserPop from './UserPop.vue';
import useAuthStore from '@/core/auth/authStore';
import useLoginStore from '@/modules/user/Infrastructure/store/loginStore';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import useRecommendStore from '@/modules/recommend/infrastructure/store/recommendStore';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconHamburger from '@/components/icons/IconHamburger.vue';
import TheMenu from './TheMenu.vue';

// use i18n
const { t } = useI18n();
const signUpDialog = ref(false);
const isShowSubHeader = ref(false);

const authStore = useAuthStore();

const userStore = useUserStore();
const recommendStore = useRecommendStore();
const userNameLetter = computed(() =>
  userStore.userInfo?.firstname?.substring(0, 2)
);
const balanceStore = useBalanceStore();

// handle scroll to decide if show subtitle or not
const startScrollY = ref<number>(0);
const endScrollY = ref<number>(0);

const scrollDebounceTimeout = ref<number>();

const isMenuShown = ref<boolean>(false);

function close() {
  signUpDialog.value = false;
}

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

const loginStore = useLoginStore();
function openLoginDialog() {
  loginStore.setIsLoginDialogShown(true);
}

function openSignUpDialog() {
  signUpDialog.value = true;
}

const route = useRoute();

const isMatchUserPath = computed(() => route.path.startsWith('/user'));
// const isMatchGamePlayPath = computed(() => route.path.startsWith('/gamePlay'));

const handleShowMenu = (isShow: boolean) => {
  isMenuShown.value = isShow;
};

const handleShowRecommend = () => {
  recommendStore.popUp();
};
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '../../styles/breakpoints.scss';

header {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 56px;
  background-color: black;
  padding: 0 26px;

  @include mobile {
    padding: 0 18px;
  }
}

.header-left-area {
  display: flex;
  align-items: center;

  .icon-hamburger {
    cursor: pointer;
  }
  .recommend-search-button {
    @include mobile {
      display: none;
    }
  }
}

.logo-container {
  .logo {
    position: absolute;
    top: 0;
    left: 50%;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 38px;
    font-family: var(--font-family);
    line-height: 56px;
    transform: translateX(-50%);

    @include mobile {
      left: 56px;
      color: var(--text-primary);
      font-size: 36px;
      transform: unset;
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
  // margin-left: auto;
  // padding-right: 20px;

  .wallet-amount {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-width: 100px;
    height: 40px;
    padding: 0 8px;
    border: 1px solid #505050;
    border-radius: 22.5px;
    background: #000;

    // @include phone-width {
    //   padding-right: 0;
    // }

    .p-button-icon-only {
      width: 26px;
      height: 26px;
      padding: 0;
    }

    span {
      margin-left: 10px;
      font-weight: 500;
      font-size: 12px;
      font-family: var(--font-family);
      line-height: 16px;
      color: var(--text-primary);
    }

    @include mobile {
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
</style>
