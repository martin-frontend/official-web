<template>
  <Transition name="fade">
    <div v-if="isMenuShown" class="container">
      <template v-for="{ name, path, icon } of normalOptions" :key="name">
        <router-link :to="path" @click="name === 'Search' && handleSearch()">
          <div class="wrap">
            <IconBase
              class="icon-primary"
              :width="24"
              :height="24"
              icon-color="#000"
              viewBox="0 0 24 24"
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
  </Transition>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults, defineEmits } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconGameMenuSearch from '@/components/icons/IconGameMenuSearch.vue';

withDefaults(
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

const normalOptions = computed(() => [
  { path: '', name: 'Search', icon: IconGameMenuSearch },
  { path: '/', name: 'Home', icon: IconHome },
]);

const handleSearch = () => {
  closeMenu();
  emit('handleShowRecommend');
};
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
@import '@/styles/transition.scss';

.container {
  padding: 15px 0;
  position: absolute;
  top: 56px;
  left: 0;
  width: 176px;
  //   height: 552px;
  z-index: 12;
  background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
  border-radius: 0px 0px 10px 10px;
  padding: 24px 10px;

  @include mobile {
    display: block;
  }
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
        color: #000;
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
</style>
