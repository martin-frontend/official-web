<template>
  <div class="menu-link" @click="unRead && isRead()">
    <div class="notification-time">{{ formateDate }}</div>
    <div v-show="unRead" class="read-status" />
    <div class="notification-title">{{ title }}</div>
    <div v-if="hiddenContent" class="notification-content">
      {{ content.slice(0, 80) }} {{ '...' }}
      <a
        v-if="hiddenContent"
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
import { defineProps, ref, defineEmits, computed } from 'vue';
import moment from 'moment';
import { AnnouncementType } from '@/modules/theHeader/domain/announcementType';
import { Announcement } from '@/modules/theHeader/domain/noticePop';

interface TodoProps {
  content: string;
  id: number;
  startTime: number;
  title: string;
  type: AnnouncementType;
  excludeFromCount: boolean;
  readAt: number | null;
}

const props = defineProps<TodoProps>();

interface TodoEmits {
  (e: 'isRead', notice: Announcement): void;
}

const emits = defineEmits<TodoEmits>();

const readMoreActivated = ref(false);

const hiddenContent = computed(
  () => props.content.length >= 80 && !readMoreActivated.value
);

const unRead = computed(() => props.readAt === null);

const formateDate = computed(() =>
  moment(props.startTime).format('YYYY-MM-DD HH:mm:ss')
);

function isRead() {
  emits('isRead', props);
}

function activateReadMore() {
  readMoreActivated.value = true;
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
