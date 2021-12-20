<template>
  <DialogPrimevue :modal="true">
    <div class="dialog">
      <div class="dialog-close" @click="closeView">
        <IconBase
          :width="30"
          :height="30"
          icon-color="#fff"
          viewBox="0 0 30 30"
        >
          <IconClose :width="12" :height="12" />
        </IconBase>
      </div>
      <div class="title">{{ detailTitle }}</div>
      <ul class="data-list">
        <li v-for="{ header, key } of columns" :key="key" class="item">
          <div class="data-title">{{ header }}</div>
          <!-- <div class="data-value">{{ 'a@123.com' }}</div> -->
          <div class="data-value">
            <slot
              v-if="$slots[key as string]"
              :name="key"
              :text="(data as any)[key]"
            />
            <template v-else>
              {{ (data as any)[key] }}
            </template>
          </div>
        </li>
      </ul>
    </div>
  </DialogPrimevue>
  <!-- <Teleport to="body">
  </Teleport> -->
</template>

<script lang="ts" setup>
// import { defineProps, toRefs, ref, onUnmounted } from 'vue';
import { onUnmounted, defineEmits, withDefaults, defineProps } from 'vue';
// import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
import IconBase from '../../../components/icons/IconBase.vue';
import IconClose from '../../../components/icons/IconClose.vue';
// use i18n
// const { t } = useI18n();

export interface ViewDetailColumn<T> {
  key: keyof T;
  header: string;
}

export interface ViewDetailProps<T> {
  // eslint-disable-next-line vue/require-default-prop
  data?: T;
  columns?: ReadonlyArray<ViewDetailColumn<T>>;
  // eslint-disable-next-line vue/require-default-prop
  detailTitle?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<ViewDetailProps<any>>(), {
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function closeView() {
  emit('close');
}

onUnmounted(() => {
  closeView();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

// .dialogMask {
//   position: fixed;
//   top: 56px;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
// }
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 424px;
  // min-height: 500px;
  // max-width: 700px;
  // width: auto;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow: hidden;
  background: #fff;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: var(--primary-color);
  }

  &-main {
    overflow-y: auto;
    // height: 688px;
    height: calc(100vh - 188px);
  }

  &-top {
    position: relative;
  }

  &-close {
    position: absolute;
    top: 14px;
    right: 16px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    z-index: 20;
  }
  @include mobile {
    width: 320px;
  }
}

.title {
  font-size: 22px;
  font-weight: 500;
  line-height: 24px;
  margin-top: 32px;
  text-align: center;
  @include mobile {
    font-size: 16px;
    margin-top: 16px;
  }
}

.data-list {
  margin: 32px 32px;
  @include mobile {
    margin: 16px 16px;
  }
}
.item {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 6px;
  padding-top: 6px;
  border-top: 1px solid #e0e0e0;

  &:first-child {
    margin-top: 20px;
    border: none;
  }

  &:last-child {
    margin-bottom: 20px;
  }
}
.data-title,
.data-value {
  font-size: 14px;
  line-height: 22px;
  @include mobile {
    font-size: 12px;
    line-height: 16px;
  }
}
.double-column-list {
  .item {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 8px;
    padding: 0 24px;

    &:first-child {
      margin-top: 20px;
    }

    &:last-child {
      margin-bottom: 20px;
    }
  }

  .title {
    color: var(--primary-color);
  }

  @include mobile {
    .item {
      padding: 0 16px;

      &:first-child {
        margin-top: 16px;
      }

      &:last-child {
        margin-bottom: 16px;
      }
    }
  }
}
// :global(body) {
//   overflow: hidden;
// }
</style>
