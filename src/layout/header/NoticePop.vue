<template>
  <div class="notice-group">
    <Button
      class="p-button-rounded p-button-icon-only p-button-outlined alert-btn"
      @click="openAnnouncement"
    >
      <IconBase :width="24" :height="24" viewBox="0 0 24 24">
        <IconMessage />
      </IconBase>

      <Badge v-if="badge" :value="badge" severity="danger" />
    </Button>
    <div v-if="noticeNum > 99" class="notice-number">{{ '99+' }}</div>
    <div v-else-if="noticeNum" class="notice-number">{{ noticeNum }}</div>
    <div v-else>{{}}</div>
  </div>

  <teleport to="#app">
    <Mask
      v-if="noticePopStore.isNoticePopShown"
      background="unset"
      @click.stop="closeAnnouncement"
    />

    <Transition name="fade">
      <div v-if="noticePopStore.isNoticePopShown" class="user-dropdown-menu">
        <div class="backAndTitle">
          <div class="back" @click="closeAnnouncement">
            <i class="pi pi-angle-left" />
          </div>
          <div class="notification">
            {{ 'Notifications' }}
          </div>
        </div>
        <div class="all-notifications">
          <template
            v-for="notification of notifications"
            :key="`${notification.type}${notification.id}`"
            class="menu-link"
          >
            <SingleNotice v-bind="notification" @isRead="isRead" />
          </template>
        </div>
        <div class="space" />
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref, computed, onMounted } from 'vue';
import Badge from 'primevue/badge';
import IconBase from '@/components/icons/IconBase.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import useNoticePopStore from '@/modules/theHeader/infrastructure/store/noticePop';
import useUserPopStore from '@/modules/theHeader/infrastructure/store/userPop';
import usePlayerMessageStore from '@/modules/theHeader/infrastructure/store/playerMessage';
import SingleNotice from '@/components/singleNotice.vue';
import {
  playerMessageExcludeFromCount,
  announcementExcludeFromCount,
  getAnnouncement,
  markAnnouncementAsRead,
  markPlayerMessageAsRead,
} from '@/modules/theHeader/infrastructure/api/noticePopApi';
import { Announcement } from '@/modules/theHeader/domain/noticePop';
import { AnnouncementType } from '@/modules/theHeader/domain/announcementType';
import Mask from '@/components/Mask.vue';

const badge = ref(0);

const noticePopStore = useNoticePopStore();
const userPopStore = useUserPopStore();
const playerMessageStore = usePlayerMessageStore();

const announcements = ref<Announcement[]>([]);

const playerMessages = computed(() => playerMessageStore.data);

const updatePlayerMessages = async () => {
  playerMessageStore.updatePlayerMessage();
};

const updateAnnouncements = async () => {
  announcements.value = await getAnnouncement();
};

const unviewedPlayerMessages = computed(() =>
  playerMessages.value.filter(({ excludeFromCount }) => !excludeFromCount)
);

const unviewedAnnouncements = computed(() =>
  announcements.value.filter(({ excludeFromCount }) => !excludeFromCount)
);

const notifications = computed(() =>
  playerMessages.value.concat(announcements.value).sort((a, b) => {
    return b.startTime - a.startTime;
  })
);

const noticeNum = computed(
  () => unviewedPlayerMessages.value.length + unviewedAnnouncements.value.length
);

const checkUnviewedMessages = async () => {
  if (noticeNum.value > 0) {
    if (unviewedPlayerMessages.value.length > 0) {
      const unviewedIds = unviewedPlayerMessages.value.map(
        (record) => record.id
      );
      await playerMessageExcludeFromCount(unviewedIds);
      updatePlayerMessages();
    }
    if (unviewedAnnouncements.value.length > 0) {
      const unviewedIds = unviewedAnnouncements.value.map(
        (record) => record.id
      );
      await announcementExcludeFromCount(unviewedIds);
      updateAnnouncements();
    }
  }
};

function openAnnouncement() {
  userPopStore.setIsUserPopShown(false);
  noticePopStore.setIsNoticePopShown(!noticePopStore.isNoticePopShown);

  checkUnviewedMessages();
}

function closeAnnouncement() {
  noticePopStore.setIsNoticePopShown(false);
  checkUnviewedMessages();
}

async function isRead(notice: Announcement) {
  const { id, type } = notice;
  if (type === AnnouncementType.PLAYER_MESSAGE) {
    await markPlayerMessageAsRead(id);
    updatePlayerMessages();
  } else {
    await markAnnouncementAsRead(id);
    updateAnnouncements();
  }
}

onMounted(() => {
  updatePlayerMessages();
  updateAnnouncements();
});
</script>

<style lang="scss" scoped>
@import '@/styles/mediaQuery.scss';
@import '@/styles/transition.scss';

.backAndTitle {
  display: flex;
  border-bottom: 1px solid var(--text-secondary);
}
.user-dropdown-menu {
  position: fixed;
  top: 85px;
  right: 65px;
  box-sizing: border-box;
  width: 360px;
  height: auto;
  border-radius: 5px;
  background: #f5f5f5;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);
  z-index: 11;

  @include pad {
    top: 0;
    right: 0;
    overflow: auto;
    width: 100%;
    height: 100vh;
    border: 0;
    border-radius: 0;
  }
  .back {
    display: none;
    align-items: center;
    height: 48px;
    padding-left: 12px;
    font-size: 16px;
    font-family: var(--font-family);
    cursor: pointer;
    color: var(--primary-color);

    i {
      margin-right: 5px;
    }

    @include pad {
      display: flex;
    }
  }

  .notification {
    padding: 15px 24px;
    color: var(--primary-color);
    font-size: 18px;
    font-weight: 500;
    font-family: var(--font-family);
    line-height: 20px;
    margin: 0 auto;
  }

  .menu-divider {
    color: #f5f5f5;
  }

  .space {
    height: 16px;
  }
}
.all-notifications {
  max-height: 500px;
  overflow-x: auto;
}
.all-notifications::-webkit-scrollbar {
  width: 6px;
}
.all-notifications::-webkit-scrollbar-track {
  background-color: transparent;
}
.all-notifications::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #9e9e9e;
}

.user-dropdown-menu::before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border: transparent 10px solid;
  border-bottom: #f5f5f5 20px solid;
  top: -28px;
  right: 61px;
}
// 通知樣式------------------------------

.alert-btn.p-button-icon-only {
  overflow: visible;
  width: 40px;
  height: 40px;
  //   margin-left: 16px;
  padding: 0;
  border: 1px solid #505050;
}
.notice-group {
  width: 40px;
  height: 40px;
  margin-left: 12px;
}
// 紅色圓標
.notice-number {
  background-color: #ff4d4f;
  border-radius: 50%;
  font-size: 12px;
  height: 20px;
  width: 20px;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  position: relative;
  top: -45px;
  left: 25px;
}
</style>
