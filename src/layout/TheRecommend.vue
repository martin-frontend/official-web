<template>
  <Transition name="fade">
    <Mask v-if="recommendStore.isShown" />
  </Transition>

  <Transition name="fade">
    <div
      v-if="recommendStore.isShown"
      class="recommend"
      @click.self="closeRecommend"
    >
      <div class="container">
        <header>
          <IconBase class="icon-back" @click="closeRecommend">
            <IconArrow />
          </IconBase>
          <p>{{ t('common.search') }}</p>
        </header>
        <div class="buttons-wrap">
          <InputBox
            v-model="queryObject.search"
            class="search-input"
            :label="t('recommend.input')"
          />
          <Button
            class="search-button"
            component="button"
            color="primary"
            size="large"
            @click="searchGames"
          >
            {{ t('common.search') }}
          </Button>
        </div>
        <Heading :title="t('recommend.title')" :define="noDataMessage" />
        <div v-show="recommendStore.isNoData" class="message" />
        <div class="game-list">
          <div
            v-for="game of recommendStore.searchContent"
            :key="game.id"
            class="list-wrap"
            @click="playGame(game)"
          >
            <div class="game-img">
              <!-- <img :src="setImagePath(game)" :alt="game.name" /> -->
              <img :src="setImagePath(game)" :alt="game.name" />
            </div>
            <div class="game-content">
              <p class="game-title">{{ game.name }}</p>
              <p class="game-define">{{ game.category }}</p>
            </div>
            <div class="game-go">
              <IconBase class="icon-go">
                <IconArrow />
              </IconBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Heading from '@/components/Heading.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import useRecommendStore from '@/modules/recommend/infrastructure/store/recommendStore';
import { PagedNewArrivalGamesQuery } from '@/modules/recommend/infrastructure/api/recommendApi';
// import { RecommendContentDto } from '@/modules/recommend/domain/recommend.model';
import { Game, PlayGameType } from '@/modules/game/domain/game.model';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import { playGameTypeEvent } from '@/modules/game/application/gamePlay';
import Mask from '@/components/Mask.vue';

const { t } = useI18n();
const router = useRouter();
const recommendStore = useRecommendStore();

const queryObject = ref<PagedNewArrivalGamesQuery>({
  page: 0,
  size: 20,
  search: '',
});

// // RWD
const device = useDevice();
const isMobile = computed(() => device.value === Device.MOBILE);
const isDesktop = computed(() => device.value === Device.DESKTOP);
const noDataMessage = computed(() =>
  recommendStore.isNoData
    ? `No results found for ${queryObject.value.search}. Have a look at these games!`
    : ''
);

const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
const setImagePath = (game: Game): string => {
  const { imageUrl, mobileImageUrl, tabletImageUrl } = game;
  let url = tabletImageUrl;
  if (isMobile.value) {
    url = mobileImageUrl;
  }
  if (isDesktop.value) {
    url = imageUrl;
  }
  return `${imagePath}${url}`;
};

const closeRecommend = () => {
  queryObject.value.search = '';
  recommendStore.close();
};

const playGame = async (game: Game) => {
  const query = await playGameTypeEvent(game, PlayGameType.REAL);

  router.push({
    name: 'Game Play',
    query,
  });

  closeRecommend();
};

const searchGames = () => {
  if (!queryObject.value.search) {
    delete queryObject.value.search;
  }

  recommendStore.search(queryObject.value);
};

onMounted(() => {
  // searchGames();
  // const res = getPagedNewArrivalGames(queryObject.value);
  // console.log(res);
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/transition.scss';
@import '@/styles/breakpoints.scss';
.recommend {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 11;

  header {
    display: none;
    justify-content: center;
    // height: 30px;
    width: 100%;
    margin-bottom: 30px;
    position: relative;
    @include mobile {
      display: flex;
    }
    .icon-back {
      cursor: pointer;
      position: absolute;
      left: 0;
      transform: rotate(90deg);
    }
    p {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .container {
    display: flex;
    width: 688px;
    height: 90%;
    max-height: 688px;
    border: 1px solid #c1a14e;
    background: #000000;
    box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.45);
    border-radius: 10px;
    padding: 24px;
    flex-direction: column;
    @include mobile {
      width: 100%;
      height: 100%;
      border: unset;
      max-height: unset;
    }

    .buttons-wrap {
      display: flex;
      margin-bottom: 16px;
      .search-button {
        margin-left: 8px;
        width: 100px;
        height: 56px;
        @include mobile {
          max-width: 82px;
        }
      }
      .search-input {
        flex: 1;
        min-width: unset;
      }
    }

    .game-list {
      flex: 1;
      overflow-x: auto;
      padding-right: 5px;
      .list-wrap {
        display: flex;
        justify-content: space-between;
        min-height: 84px;
        width: 100%;
        padding: 12px 0;
        box-shadow: inset 0px -1px 0px #757575;
        cursor: pointer;

        .game-img {
          width: 60px;
          height: 60px;
          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .game-content {
          flex: 1;
          .game-title {
            font-size: 18px;
            line-height: 20px;
            margin-top: 6px;
            margin-bottom: 8px;
            color: var(--primary-color);
          }
          .game-define {
            color: var(--text-secondary);
            font-size: 16px;
            line-height: 20px;
          }
        }

        .game-go {
          display: flex;
          .icon-go {
            margin: auto;
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}
</style>
