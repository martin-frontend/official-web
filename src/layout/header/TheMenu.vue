<template>
  <teleport to="#app">
    <div v-show="isMenuShown" class="menu" @click.self="closeMenu">
      <div class="container">
        <div class="top-area">
          <IconBase
            class="icon-hamburger"
            :width="24"
            :height="24"
            viewBox="0 0 24 24"
            icon-color="#000"
            @click="closeMenu"
          >
            <IconHamburger />
          </IconBase>

          <div class="logo-container">
            <router-link to="/" exact>
              <div class="logo">{{ 'LOGO' }}</div>
            </router-link>
          </div>

          <div class="recommend-search-button" @click="showRecommend">
            <div class="icon-search">
              <IconBase
                :width="16"
                :height="16"
                viewBox="0 0 16 16"
                icon-color="#000"
              >
                <IconSearch />
              </IconBase>
            </div>
          </div>
        </div>

        <div class="line" />

        <div class="content-area">
          <router-link to="/" exact>
            <div class="wrap">
              <IconBase
                class="icon-primary"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#C1A14E"
              >
                <IconHome />
              </IconBase>
              <IconBase
                class="icon-hover"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#000"
              >
                <IconHome />
              </IconBase>
              <div class="tag-name">
                {{ 'Home' }}
              </div>
            </div>
          </router-link>

          <!-- <router-link v-slot="{ isExactActive }" to="/user">
            <div class="wrap">
              <IconBase
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                :icon-color="isExactActive ? '#000' : '#C1A14E'"
              >
                <IconHome />
              </IconBase>
              <div class="tag-name">
                {{ 'Home' }}
              </div>
            </div>
          </router-link> -->
        </div>

        <div class="line" />

        <div class="content-area">
          <router-link to="/payment-options">
            <div class="other-wrap">
              <IconBase
                class="icon-primary"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#C1A14E"
              >
                <IconPayment />
              </IconBase>
              <IconBase
                class="icon-hover"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#000"
              >
                <IconPayment />
              </IconBase>
              <div class="other-tag-name">
                {{ 'Payment Options' }}
              </div>
            </div>
          </router-link>

          <router-link to="/get-in-touch">
            <div class="other-wrap">
              <IconBase
                class="icon-primary"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#C1A14E"
              >
                <IconGetInTouch />
              </IconBase>
              <IconBase
                class="icon-hover"
                :width="24"
                :height="24"
                viewBox="0 0 24 24"
                icon-color="#000"
              >
                <IconGetInTouch />
              </IconBase>
              <div class="other-tag-name">
                {{ 'Get in Touch' }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, toRefs, defineEmits } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import IconBase from '@/components/icons/IconBase.vue';
import IconHamburger from '@/components/icons/IconHamburger.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPayment from '@/components/icons/IconPayment.vue';
import IconGetInTouch from '@/components/icons/IconGetInTouch.vue';

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
@import '../../styles/breakpoints.scss';
.menu {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 320px;
    height: 100%;
    max-height: 869px;
    background: #323232;
    z-index: 10;
    overflow-x: auto;
    display: flex;
    flex-direction: column;

    @include mobile {
      width: 280px;
      max-height: unset;
    }

    .top-area {
      height: 56px;
      min-height: 56px;
      display: flex;
      align-items: center;
      margin: 0 16px;

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
      padding: 12px 0;

      a {
        display: block;
        height: 56px;

        .wrap,
        .other-wrap {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 24px;

          &:hover {
            background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
            .icon-primary {
              display: none;
            }
            .icon-hover {
              display: inline-block;
            }

            .tag-name,
            .other-tag-name {
              color: #000;
            }
          }

          .icon-hover {
            display: none;
          }

          .tag-name,
          .other-tag-name {
            margin-left: 24px;
            color: #fff;
            font-size: 16px;
            line-height: 20px;
            font-weight: 500;
          }

          .other-tag-name {
            color: var(--primary-color);
          }
        }

        // &.router-link-exact-active {
        //   .wrap {
        //     background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);

        //     .tag-name {
        //       color: #000;
        //     }
        //   }
        // }
      }
    }

    .line {
      max-height: 1px;
      height: 1px;
      background: var(--primary-color);
      flex: 1;
      margin: 0 16px;
      padding: 0.5px 0;
    }
  }
}
</style>
