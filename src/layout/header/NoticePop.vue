<template>
  <div class="notice-group">
    <Button
      class="p-button-rounded p-button-icon-only p-button-outlined alert-btn"
      @click="openUserMenu"
    >
      <IconBase :width="24" :height="24" viewBox="0 0 24 24">
        <IconMessage />
      </IconBase>

      <Badge v-if="badge" :value="badge" severity="danger" />
    </Button>
    <div v-show="noticeNum" class="notice-number">{{ noticeNum }}</div>
  </div>
  <div v-show="noticePopStore.isNoticePopShown" class="user-dropdown-menu">
    <div class="backAndTitle">
      <div class="back" @click="closeUserMenu">
        <i class="pi pi-angle-left" />
      </div>
      <div class="notification">
        {{ 'Notifications' }}
      </div>
    </div>
    <div class="all-notifications">
      <template
        v-for="notification of resolvedData"
        :key="notification.id"
        class="menu-link"
      >
        <SingleNotice
          :content="notification.content"
          :date-and-time="notification.dateAndTime"
          :title="notification.title"
          @isRead="isRead(notification.id)"
        >
          {{ notification }}
        </SingleNotice>
      </template>
    </div>
    <div class="space">{{}}</div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref, computed, onMounted } from 'vue';
import Badge from 'primevue/badge';
import moment from 'moment';
import IconBase from '@/components/icons/IconBase.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import { fetchGet } from '@/core/services/api/apiBase';
import useNoticePopStore from '@/modules/theHeader/infrastructure/store/noticePop';
import useUserPopStore from '@/modules/theHeader/infrastructure/store/userPop';
import SingleNotice from '@/components/singleNotice.vue';

const badge = ref(0);
const noticeNum = ref(0);

const noticePopStore = useNoticePopStore();
const userPopStore = useUserPopStore();

const notifications = ref<Announcement[]>([]);

function getAnnouncement(): Promise<Announcement[]> {
  return fetchGet('/official/v1/announcement');
}

function closeUserMenu() {
  noticePopStore.setIsNoticePopShown(false);
}

function openUserMenu() {
  userPopStore.setIsUserPopShown(false);
  noticePopStore.setIsNoticePopShown(!noticePopStore.isNoticePopShown);
  noticeNum.value = 0;
}
const resolvedData = computed(() =>
  notifications.value.map((record) => {
    const time = moment(record.startTime);

    return {
      ...record,
      dateAndTime: time.format('YYYY-MM-DD HH:mm'),
    };
  })
);

function isRead(id: number) {
  console.log(`收到來自singleNotice的已讀動作${id}`);
}
interface Announcement {
  content: string;
  id: number;
  startTime: number;
  title: string;
  type: string;
}
onMounted(() => {
  getAnnouncement().then((data) => {
    notifications.value = data;
    noticeNum.value = data.length;
  });
});
</script>

<style lang="scss" scoped>
@import '../../styles/mediaQuery.scss';

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

    @include laptop {
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
  @include laptop {
    top: 0;
    right: 0;
    overflow: auto;
    width: 100vw;
    height: 100vh;
    border: 0;
    border-radius: 0;
  }
}
.all-notifications {
  max-height: 500px;
  overflow-x: auto;
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
