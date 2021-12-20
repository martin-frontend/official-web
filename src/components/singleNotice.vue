<template>
  <div class="menu-link" @click="isRead">
    <div class="notification-time">{{ dateAndTime }}</div>
    <div v-show="unRead" class="read-status">{{}}</div>
    <div class="notification-title">{{ title }}</div>
    <div v-if="readMoreActivated" class="notification-content">
      {{ content.slice(0, 80) }} {{ '...' }}
      <a
        v-if="readMoreActivated"
        class="read-more"
        href="#"
        @click="activateReadMore"
      >
        {{ 'more' }}
      </a>
    </div>
    <div v-else class="notification-content">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, toRefs, defineEmits } from 'vue';

const readMoreActivated = ref(false);

// 宣告props的資料類型
export interface TodoProps {
  content?: string;
  dateAndTime?: string;
  title?: string;
}
// 從父層傳過來的資料型態
const props = withDefaults(defineProps<TodoProps>(), {
  content: '',
  dateAndTime: '',
  title: '',
});

// 宣告emit的動作和資料類型
export interface TodoEmits {
  (e: 'isRead'): void;
}
// 將從子層傳出去的資料
const emits = defineEmits<TodoEmits>();
// 從父層拿到的
const { content } = toRefs(props);

if (content.value.length >= 80) {
  readMoreActivated.value = true;
}

const unRead = ref(true);
function isRead() {
  emits('isRead');
  unRead.value = false;
}
function activateReadMore() {
  readMoreActivated.value = false;
}
</script>

<style lang="scss" scoped>
@import '@/styles/mediaQuery.scss';
.menu-link {
  position: relative;
  display: block;
  // height: 40px;
  padding: 0 24px;
  color: var(--secondary-color);
  font-weight: 400;
  font-size: 12px;
  font-family: var(--font-family);
  line-height: 16px;
  text-decoration: none;
  border-bottom: 1px solid var(--text-secondary);
  // outline: 1px solid orange;
  padding: 16px 16px 8px 16px;

  &:hover {
    background: #e0e0e0;
    color: #000;
  }
  .notification-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }
  .notification-title,
  .notification-content {
    margin-top: 4px;
    color: #424242;
  }
  .read-more {
    color: var(--primary-color);
  }
  .notification-time {
    color: #9e9e9e;
    font-size: 12px;
    line-height: 16px;
  }
  .read-status {
    position: absolute;
    left: 7px;
    top: 41px;
    width: 4px;
    height: 4px;
    border-radius: 100px;
    background-color: var(--primary-color);
  }
  .notification-content {
    word-break: break-all;
    font-size: 12px;
    line-height: 16px;
  }

  @include laptop {
    &.hidden-for-phones {
      display: none;
    }
  }
}
</style>
