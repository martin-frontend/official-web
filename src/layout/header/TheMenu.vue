<template>
  <teleport to="#app">
    <Transition name="fade">
      <Mask v-if="isMenuShown" @click.self="closeMenu" />
    </Transition>

    <Transition name="left">
      <div v-if="isMenuShown" class="container">
        <div class="top-area">
          <IconBase
            class="icon-hamburger"
            :width="24"
            :height="24"
            viewBox="0 0 24 24"
            @click="closeMenu"
          >
            <IconHamburgerMinus />
          </IconBase>

          <div class="logo-container">
            <router-link to="/">
              <div class="logo">{{ 'LOGO' }}</div>
            </router-link>
          </div>

          <div class="recommend-search-button" @click="showRecommend">
            <div class="icon-search">
              <IconBase :width="16" :height="16" viewBox="0 0 16 16">
                <IconSearch />
              </IconBase>
            </div>
          </div>
        </div>

        <div class="content-area normal">
          <template v-for="{ name, path, icon } of normalOptions" :key="name">
            <router-link :to="path">
              <div class="wrap">
                <IconBase
                  class="icon-primary"
                  :width="24"
                  :height="24"
                  viewBox="0 0 24 24"
                  icon-color="#C1A14E"
                >
                  <component :is="icon" />
                </IconBase>

                <IconBase
                  class="icon-hover"
                  :width="24"
                  :height="24"
                  viewBox="0 0 24 24"
                  icon-color="#fff"
                >
                  <component :is="icon" />
                  >
                </IconBase>
                <div class="tag-name">
                  {{ name }}
                </div>
              </div>
            </router-link>
          </template>
        </div>

        <div class="content-area else">
          <template v-for="{ name, path, icon } of elseOptions" :key="name">
            <router-link :to="path">
              <div class="wrap">
                <IconBase
                  class="icon-primary"
                  :width="24"
                  :height="24"
                  viewBox="0 0 24 24"
                  icon-color="#C1A14E"
                >
                  <component :is="icon" />
                </IconBase>

                <IconBase
                  class="icon-hover"
                  :width="24"
                  :height="24"
                  viewBox="0 0 24 24"
                  icon-color="#fff"
                >
                  <component :is="icon" />
                  >
                </IconBase>
                <div class="tag-name">
                  {{ name }}
                </div>
              </div>
            </router-link>
          </template>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, toRefs, defineEmits, computed } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import IconBase from '@/components/icons/IconBase.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPayment from '@/components/icons/IconPayment.vue';
import IconGetInTouch from '@/components/icons/IconGetInTouch.vue';
import Mask from '@/components/Mask.vue';
import IconHamburgerMinus from '@/components/icons/IconHamburgerMinus.vue';
import IconPromotionsVue from '@/components/icons/IconPromotions.vue';

const props = withDefaults(
  defineProps<{
    isMenuShown?: boolean;
  }>(),
  {
    isMenuShown: false,
  }
);

const emit = defineEmits<{
  (e: 'handleShowMenu', value: boolean): void;
  (e: 'handleShowRecommend'): void;
}>();

const normalOptions = computed(() => [
  { path: '/', name: 'Home', icon: IconHome },
]);

const elseOptions = computed(() => [
  { path: '/promotions', name: 'Promotions', icon: IconPromotionsVue },
  { path: '/payment-options', name: 'Payment Options', icon: IconPayment },
  { path: '/get-in-touch', name: 'Get in Touch', icon: IconGetInTouch },
]);

const closeMenu = () => {
  emit('handleShowMenu', false);
};

const showRecommend = () => {
  closeMenu();
  emit('handleShowRecommend');
};

onBeforeRouteUpdate(() => {
  closeMenu();
});

const { isMenuShown } = toRefs(props);
</script>

<style lang="scss" scoped>
@import '@/styles/transition.scss';
@import '@/styles/breakpoints.scss';
.container {
  position: fixed;
  left: 0;
  top: 56px;
  width: 248px;
  height: 100%;
  background: #323232;
  z-index: 10;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 11;

  @include mobile {
    top: 0;
    width: 280px;
    max-height: unset;
  }

  .icon-hamburger {
    cursor: pointer;
  }

  .top-area {
    height: 56px;
    min-height: 56px;
    display: none;
    align-items: center;
    margin: 0 16px;
    border-bottom: 1px solid var(--primary-color);

    @include mobile {
      display: flex;
    }

    .logo-container {
      flex: 1;
      height: 100%;
      .logo {
        color: var(--primary-color);
        font-weight: 500;
        font-size: 38px;
        font-family: var(--font-family);
        line-height: 56px;
        text-align: center;

        @include mobile {
          display: none;
        }
      }
    }

    .recommend-search-button {
      display: none;

      @include mobile {
        display: inline-flex;
      }

      .icon-search {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        border: 1px solid #505050;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .content-area {
    padding: 15px 0;
    margin: 0 16px;
    &.normal {
      display: none;
      border-bottom: 1px solid var(--primary-color);

      @include mobile {
        display: block;
      }
    }

    a {
      display: block;
      height: 56px;

      .wrap {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-radius: 6px;

        &:hover {
          background: black;
          .icon-primary {
            display: none;
          }
          .icon-hover {
            display: inline-block;
          }

          .tag-name {
            color: #fff;
          }
        }

        .icon-hover {
          display: none;
        }

        .tag-name {
          margin-left: 24px;
          color: #fff;
          font-size: 16px;
          line-height: 20px;
          font-weight: 500;
        }
      }
    }

    &.else .wrap .tag-name {
      color: var(--primary-color);
    }
  }
}
</style>
