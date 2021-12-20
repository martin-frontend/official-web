<template>
  <!-- <div class="game-wrapper">
    <div class="iframe-wrap">
      <iframe :src="gamePath" />
    </div>
  </div> -->
  <Container>
    <teleport to="body" :disabled="!isOtherFullscreen">
      <div
        ref="fullscreenDiv"
        class="game-wrapper"
        :class="{ 'for-IOs-fullscreen': isOtherFullscreen }"
      >
        <div v-show="!isOtherFullscreen" class="game-play-bar">
          <div class="title">
            <p class="time">{{ nowTime }}</p>
            <p class="name">{{ routeName }}</p>
          </div>
          <div class="button-group">
            <div
              v-show="isDemo"
              class="button real-button"
              @click="handleForReal"
            >
              {{ 'For Real' }}
            </div>
            <div class="button submit-button">
              <IconBase
                v-show="isFavorite"
                :width="20"
                :height="17"
                icon-color="#FFD335"
                viewBox="0 0 24 24"
                @click="handleFavoritevent(false)"
              >
                <IconHeart />
              </IconBase>
              <IconBase
                v-show="!isFavorite"
                :width="20"
                :height="17"
                icon-color="#FFD335"
                viewBox="0 0 24 24"
                @click="handleFavoritevent(true)"
              >
                <IconHeartOutline />
              </IconBase>
            </div>
            <div class="button full-screen-button" @click="handleFullScreen">
              <IconBase
                :width="16"
                :height="16"
                viewBox="0 0 16 16"
                icon-color="#999999"
              >
                <IconFullScreen />
              </IconBase>
            </div>
            <div class="button close-button" @click="handleClose">
              <IconBase
                :width="12"
                :height="12"
                viewBox="9 9 12 12"
                icon-color="#999999"
              >
                <IconClose />
              </IconBase>
            </div>
          </div>
        </div>

        <div
          class="iframe-wrap"
          :class="{ fullscreen: isOtherFullscreen || isFullscreen }"
        >
          <iframe :src="gamePath" />
        </div>
      </div>
    </teleport>

    <GamesGroup :game-types="gameTypes">
      <template #title="{ titleName }">
        <h2 class="group-wrap-title">{{ titleName }}</h2>
      </template>
    </GamesGroup>
  </Container>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute, LocationQuery } from 'vue-router';
import useAuthStore from '@/core/auth/authStore';
import { getGamePath } from '@/modules/game/application/gamePlay';
import Container from '@/layout/Container.vue';
import { formatTime } from '@/libs/date';
import IconBase from '@/components/icons/IconBase.vue';
import IconHeartOutline from '@/components/icons/IconHeartOutline.vue';
import IconFullScreen from '@/components/icons/IconFullScreen.vue';
import IconClose from '@/components/icons/IconClose.vue';
import {
  isFullscreen,
  openfullscreen,
  closefullscreen,
  isOtherFullscreen,
} from '@/libs/screenfull';
// import { detectBrowser } from '@/libs/detectDevice';
import { checkUserStatus } from '@/modules/user/application/user';
import useLoginStore from '@/modules/user/Infrastructure/store/loginStore';
import GamesGroup from '@/components/GamesGroup.vue';
import useRecommendStore from '@/modules/recommend/infrastructure/store/recommendStore';
import { GameTypeWithGames } from '@/modules/cms/domain/gameType/gameTypes';
import IconHeart from '@/components/icons/IconHeart.vue';
import {
  addFavoriteGame,
  launchGame,
  removeFavoriteGame,
} from '@/modules/favoriteGames/infrastructure/favoriteGamesApi';
import { getGame } from '@/modules/game/infrastructure/gameApi';
import { Game } from '@/modules/game/domain/game.model';

const basePath = process.env.VUE_APP_BASE_PATH;

const route = useRoute();
const authStore = useAuthStore();

const nowTime = ref<string>('');
const timeId = ref<number>(0);
const isDemo = ref<boolean>(false);
const router = useRouter();
const fullscreenDiv = ref<HTMLElement | null>(null);
// const isIOs = ref<boolean>(false);
const loginStore = useLoginStore();
const recommendStore = useRecommendStore();
const gameTypes = ref<GameTypeWithGames[]>([]);
const game = ref<Game>();
const routeId = ref<number>(-1);
const routeName = ref<string>('');

// computed
// const isIOsAndFullScreen = computed(() => {
//   return isIOs.value && isFullscreen.value;
// });

const isFavorite = computed(() => (game.value ? game.value.favorite : false));

const gamePath = computed(() => {
  if (routeId.value > 0) {
    return getGamePath(
      basePath,
      `${routeId.value}`,
      isDemo.value,
      !!authStore.isAuthenticated
    );
  }
  return '';
});

// methods
const updatedNowTime = () => {
  nowTime.value = formatTime(new Date(), 'HH:mm');
};

const handleClose = () => {
  isFullscreen.value = false;
  router.push('/');
};

const handleForReal = async () => {
  if (!(await checkUserStatus())) {
    loginStore.setIsLoginDialogShown(true);

    if (isFullscreen.value) {
      closefullscreen();
    }
    return;
  }

  router.push({
    name: 'Game Play',
    query: { id: routeId.value, name: routeName.value },
  });

  isDemo.value = false;
};

const handleFullScreen = () => {
  // if (isIOs.value) {
  //   isFullscreen.value = !isFullscreen.value;
  //   return;
  // }

  if (!fullscreenDiv.value) {
    return;
  }

  if (isFullscreen.value) {
    closefullscreen();
  } else {
    openfullscreen(fullscreenDiv.value);
  }
};

const searchRecommend = async () => {
  await recommendStore.search({ page: 0, size: 4 });
  gameTypes.value[0] = {
    games: recommendStore.searchContent.slice(0, 4),
    id: 0,
    name: 'Recommends',
  };
};

const updateGame = async (id: number) => {
  const res = await getGame(id);
  if (res) {
    game.value = res;
    routeId.value = res.id;
    routeName.value = res.name;
  }
};

const updateDemoType = (query: LocationQuery) => {
  isDemo.value = false;

  if (query.demo) {
    isDemo.value = query.demo === 'true';
  }
};

const updateGamePlay = (val: LocationQuery) => {
  if (!val.id) {
    return;
  }

  const newRouteId = Number(val.id);

  updateDemoType(val);

  // record play time
  if (newRouteId > 0 && !isDemo.value) {
    launchGame(newRouteId);
  }

  // In the same game
  if (routeId.value === newRouteId) {
    return;
  }

  routeId.value = newRouteId;
  routeName.value = `${val.name}`;

  updateGame(newRouteId);
};

const handleFavoritevent = async (type: boolean) => {
  if (!(await checkUserStatus())) {
    if (isFullscreen.value) {
      closefullscreen();
    }

    loginStore.setIsLoginDialogShown(true);
    return;
  }

  if (type) {
    await addFavoriteGame(routeId.value);
  } else {
    await removeFavoriteGame(routeId.value);
  }

  if (game.value) {
    game.value.favorite = type;
  }
  updateGame(routeId.value);
};

watch(
  () => route.query,
  (val) => updateGamePlay(val),
  { immediate: true }
);

// const vh = ref('1vh');

// function resize() {
//   vh.value = `${window.innerHeight * 0.01}px`;
// }
onMounted(() => {
  // setTimeout(() => resize(), 1000);
  // window.addEventListener('resize', resize);

  searchRecommend();

  // isIOs.value = detectBrowser.isIOs();

  timeId.value = setInterval(() => {
    updatedNowTime();
  }, 1000);
});

onUnmounted(() => {
  // window.removeEventListener('resize', resize);
  clearInterval(timeId.value);
  isFullscreen.value = false;
  isOtherFullscreen.value = false;
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

// .game-wrapper {
//   --vh: v-bind('vh');
//   height: calc(var(--vh, 1vh) * 100 - 56px);
// }
.group-wrap-title {
  color: var(--primary-color);
  font-weight: var(--text-bold);
  font-size: 36px;
  line-height: 42px;
  margin: 32px 0;
  text-align: center;

  @include mobile {
    font-size: 22px;
    line-height: 24px;
    margin-bottom: 16px 0;
  }
}
.game-play-bar {
  width: 100%;
  height: 64px;
  background: #323232;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 8px;
  @include mobile {
    height: 48px;
  }

  .title {
    display: flex;
    font-size: 16px;
    line-height: 20px;

    @include mobile {
      font-size: 12px;
      line-height: 16px;
    }

    .time {
      color: #bdbdbd;
      margin-right: 8px;
    }
  }

  .button-group {
    margin-left: auto;
    display: flex;

    .button {
      width: 40px;
      height: 40px;
      background: #000000;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @include mobile {
        width: 24px;
        height: 24px;
      }
    }

    .button + .button {
      margin-left: 8px;
      &.close-button {
        margin-left: 24px;
      }
    }

    .real-button {
      font-size: 16px;
      line-height: 20px;
      width: auto;
      padding: 10px 16px;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);

      @include mobile {
        font-size: 12px;
        line-height: 16px;
        padding: 4px 8px;
      }
    }
  }
}

.iframe-wrap {
  width: 100%;
  height: 720px;

  @include tablet-h {
    height: 531px;
  }
  @include tablet-v {
    height: 387px;
  }
  @include mobile {
    height: 560px;
  }
  &.fullscreen {
    height: auto;
    flex: 1;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.game-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.for-IOs-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
