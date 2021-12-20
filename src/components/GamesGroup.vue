<template>
  <div
    v-for="({ id, name, games, page, totalPages }, index) of gameTypes"
    :key="id"
  >
    <section class="group-wrap">
      <slot name="title" :titleName="name" />

      <div class="games-group">
        <div v-for="game of games" :key="game.id" class="games-group-item">
          <div class="game-kv">
            <picture>
              <source
                :srcset="`${imagePath}${game.imageUrl}`"
                media="(max-width: 1023px)"
              />
              <source
                :srcset="`${imagePath}${game.tabletImageUrl}`"
                media="(max-width: 768x)"
              />
              <source
                :srcset="`${imagePath}${game.mobileImageUrl}`"
                media="(max-width: 359px)"
              />
              <img :src="`${imagePath}${game.imageUrl}`" />
            </picture>

            <!-- @touchstart="1" is to fix Safari not compatible with the active of CSS -->
            <div class="game-panel" @touchstart="1">
              <div class="game-top">
                <p class="game-title">{{ game.name }}</p>
                <div v-show="isFavoriteIconShown" class="game-favorite">
                  <IconBase
                    v-if="true"
                    :width="20"
                    :height="17"
                    icon-color="#FFD335"
                    viewBox="0 0 24 24"
                    @click="handleFavoriteEvent(game.id)"
                  >
                    <IconHeart />
                  </IconBase>
                </div>
              </div>
              <IconBase
                :width="60"
                :height="60"
                viewBox="0 0 60 60"
                icon-color="#FFD335"
                class="game-play-btn"
                @click="handlePlayGame(game, PlayGameType.REAL)"
              >
                <IconPlay />
              </IconBase>

              <!-- @touchstart="1" is to fix Safari not compatible with the active of CSS -->
              <div
                class="game-demo-btn"
                :to="{
                  name: 'Game Play',
                  query: { id: game.id, name: game.name, demo: true },
                }"
                @touchstart="1"
                @click="handlePlayGame(game, PlayGameType.DEMO)"
              >
                {{ 'DEMO' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="totalPages > page + 1">
        <slot name="bottom" :index="index" />
      </template>
    </section>
    <div v-if="index < gameTypes.length - 1" class="group-wrap-divide" />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { GameTypeWithGames } from '@/modules/cms/domain/gameType/gameTypes';
import IconBase from '@/components/icons/IconBase.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
// import IconHeartOutline from '@/components/icons/IconHeartOutline.vue';
import { Game, PlayGameType } from '@/modules/game/domain/game.model';
import { playGameTypeEvent } from '@/modules/game/application/gamePlay';
import { removeFavoriteGame } from '@/modules/favoriteGames/infrastructure/favoriteGamesApi';

withDefaults(
  defineProps<{
    gameTypes: GameTypeWithGames[];
    isFavoriteIconShown?: boolean;
  }>(),
  {
    gameTypes: () => [],
    isFavoriteIconShown: false,
  }
);

const emit = defineEmits<{
  (e: 'removeFavoriteCallback'): void;
}>();

const router = useRouter();

const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;

const handlePlayGame = async (game: Game, type: PlayGameType) => {
  const query = await playGameTypeEvent(game, type);

  router.push({
    name: 'Game Play',
    query,
  });
};

const handleFavoriteEvent = async (gameId: number) => {
  await removeFavoriteGame(gameId);

  emit('removeFavoriteCallback');
};
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.group-wrap {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;

  .games-group {
    display: flex;
    flex-wrap: wrap;

    .games-group-item {
      width: calc(25% - 24px);
      height: calc(25% - 24px);
      margin: 12px;

      @include tablet-h {
        width: calc(25% - 20px);
        height: calc(25% - 20px);
        margin: 10px;
      }

      @include tablet-v {
        width: calc(33% - 20px);
        height: calc(33% - 20px);
        margin: 10px;
      }

      @include mobile {
        width: calc(50% - 12px);
        height: calc(50% - 12px);
        margin: 6px;
      }

      .game-kv {
        box-sizing: border-box;
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .game-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 18px 16px;
          border: 2px solid transparent;
          transition: 0.5s;

          @include tablet-v {
            padding: 13px 16px;
          }

          @include mobile {
            padding: 8px;
          }

          &:hover,
          &:active {
            border-color: #fddd5f;
            background: rgba(0, 0, 0, 0.75);

            .game-top {
              display: flex;
            }

            .play-icon,
            .game-play-btn,
            .game-demo-btn {
              display: block;
            }
          }

          .game-top {
            display: none;
            align-items: center;
            justify-content: space-between;
          }

          .game-title {
            color: var(--text-primary);
            line-height: 20px;

            @include tablet-v {
              font-size: 14px;
              line-height: 22px;
            }

            @include mobile {
              font-size: 10px;
              line-height: 15px;
            }
          }

          .game-favorite {
            width: 20px;
            height: 17px;
            cursor: pointer;
          }

          .game-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            display: none;
            transition: 0.4s;
            width: 60px;
            height: 60px;
            transform: translate(-50%, -50%);
            cursor: pointer;

            @include tablet-v {
              width: 48px;
              height: 48px;
            }

            @include mobile {
              width: 32px;
              height: 32px;
            }
          }

          .game-demo-btn {
            position: absolute;
            bottom: 24px;
            left: 50%;
            display: none;
            box-sizing: border-box;
            padding: 10px 20px;
            border-radius: 5px;
            color: var(--warning-color);
            font-weight: var(--text-bold);
            font-size: 18px;
            line-height: 20px;
            text-align: center;
            transition: 0.2s;
            transform: translate(-50%, 0);
            cursor: pointer;

            @include tablet-v {
              bottom: 16px;
              font-size: 16px;
              line-height: 20px;
              padding: 6px 17px;
            }

            @include mobile {
              bottom: 10px;
              font-size: 12px;
              line-height: 17px;
              padding: 3.5px 13px;
            }

            &:hover,
            &:active {
              background-color: var(--warning-color);
              color: #424242;
            }
          }
        }
      }
    }
  }
}

.group-wrap-divide {
  width: 100%;
  height: 80px;
  margin: 20px 0;
  background: url(../assets/images/golden-divider.png) center no-repeat;
  background-size: contain;

  @include tablet-v {
    height: 60px;
  }
  @include mobile {
    height: 40px;
  }
}
</style>
