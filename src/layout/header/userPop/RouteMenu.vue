<template>
  <div>
    <template v-for="{ name, icon, image, path, children } of list" :key="name">
      <MenuListCollapse
        v-if="children"
        class="menu-title"
        :is-active="$route.path.includes(path)"
      >
        <template #header="{ isActive }">
          <div class="wrap" :class="{ isActive }">
            <div v-if="icon" class="icon">
              <IconBase
                :icon-color="isActive ? 'var(--primary-color)' : 'white'"
                class="icon"
                :width="40"
                :height="40"
                viewBox="0 0 40 40"
              >
                <component :is="icon" />
              </IconBase>
            </div>

            <div v-if="image" class="image">
              <img :src="image" alt="" />
            </div>

            <p class="lebel">{{ name }}</p>
          </div>
        </template>

        <RouteMenu :list="children" @close="close" />
      </MenuListCollapse>

      <router-link
        v-else
        v-slot="{ isActive }"
        :to="path"
        class="menu-link"
        @click="close"
        @mouseover="hoverName = name"
        @mouseout="hoverName = ''"
      >
        <div class="wrap">
          <div v-if="icon" class="icon">
            <IconBase
              :icon-color="isActive || hoverName === name ? 'black' : 'white'"
              class="icon"
              :width="40"
              :height="40"
              viewBox="0 0 40 40"
            >
              <component :is="icon" />
            </IconBase>
          </div>

          <div v-if="image" class="image">
            <img :src="image" alt="" />
          </div>

          <p class="lebel">{{ name }}</p>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
// eslint-disable-next-line import/no-self-import
import RouteMenu from '@/layout/header/userPop/RouteMenu.vue';
import MenuListCollapse from '@/layout/header/userPop/MenuListCollapse.vue';
import { RouteList } from '@/modules/userPop/userPop';

export interface UserPopMenuProps {
  list: RouteList[];
}

export interface UserPopMenuEmits {
  (e: 'close'): void;
}

const emit = defineEmits<UserPopMenuEmits>();
defineProps<UserPopMenuProps>();

const hoverName = ref('');

function close() {
  emit('close');
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  color: white;
  font-size: 16px;
  line-height: 20px;
  margin-left: 12px;

  .image,
  .icon {
    width: 27px;
    height: 27px;
    margin-right: 11px;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
}

.menu-title {
  .wrap {
    margin-bottom: 4px;
    &.isActive {
      color: var(--primary-color);
    }
  }
  .menu-link {
    margin-left: 12px;
  }
}

.menu-link {
  display: block;
  color: var(--primary-color);
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 20px;
  text-decoration: none;
  margin-bottom: 4px;

  &.router-link-active,
  &:hover {
    background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
    border-radius: 6px;

    .wrap {
      transition: 0.3s color;
      color: black;
    }
  }
}
</style>
