<template>
  <div
    class="dialog-container"
    :style="{
      'z-index': dialogStore.zIndex,
    }"
  >
    <transition name="scale">
      <div v-if="dialogStore.isShown" class="dialog">
        <CloseButton @click="onClickCancel" />
        <img
          v-show="dialogStore.isCoinShown"
          class="icon-coin"
          src="@/assets/icons/coin.png"
        />
        <IconBase
          v-show="dialogStore.isCheckShown"
          class="icon-check"
          :width="60"
          :height="60"
          viewBox="0 0 60 60"
        >
          <IconCheck />
        </IconBase>
        <IconBase
          v-show="dialogStore.isClockShown"
          class="icon-clock"
          :width="80"
          :height="80"
          viewBox="0 0 80 80"
        >
          <IconClock />
        </IconBase>
        <div class="dialog-title">{{ dialogStore.title }}</div>
        <div class="dialog-content">
          {{ dialogStore.message }}
        </div>
        <div v-show="dialogStore.secondMessage" class="dialog-content">
          {{ dialogStore.secondMessage }}
        </div>
        <div class="dialog-btn-group">
          <Button
            v-show="dialogStore.isCancelButtonShown"
            class="primary-linear-btn p-button-rounded"
            @click="onClickCancel"
          >
            {{ dialogStore.cancelButtonText }}
          </Button>
          <Button
            v-show="dialogStore.isOkButtonShown"
            class="p-button-outlined p-button-rounded"
            @click="onClickOk"
          >
            {{ dialogStore.okButtonText }}
          </Button>
          <Button
            v-show="dialogStore.isOtherOkButtonShown"
            class="p-button-outlined p-button-rounded"
            @click="onClickOtherOk"
          >
            {{ dialogStore.okOtherButtonText }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import useDialogStore from '@/core/shared/dialogStore';
import IconBase from '@/components/icons/IconBase.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import CloseButton from '@/components/CloseButton.vue';
import IconClock from '@/components/icons/IconClock.vue';

const dialogStore = useDialogStore();

function onClickCancel() {
  if (dialogStore.onCancel) dialogStore.onCancel();
  dialogStore.close();
}

function onClickOk() {
  if (dialogStore.onOk) dialogStore.onOk();
  dialogStore.close();
}

function onClickOtherOk() {
  if (dialogStore.onOtherOk) dialogStore.onOtherOk();
  dialogStore.close();
}
</script>

<style lang="scss" scoped>
@import '../styles/breakpoints.scss';

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.32);
  &.open-dialog {
    z-index: 9999;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 536px;
    padding: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    background: #323232;
    box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);
    position: relative;

    .icon-coin,
    .icon-check,
    .icon-clock {
      margin-bottom: 16px;
      @include mobile {
        margin-bottom: 8px;
      }
    }

    .dialog-title {
      color: var(--primary-color);
      font-weight: 600;
      font-size: 26px;
      line-height: 28px;

      @include mobile {
        font-size: 16px;
        line-height: 20px;
      }
    }

    .dialog-content {
      margin-top: 16px;
      color: #bdbdbd;
      font-size: 16px;
      line-height: 20px;
      text-align: center;

      @include mobile {
        margin-top: 16px;
        font-size: 12px;
        line-height: 16px;
      }
    }

    .dialog-btn-group {
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 16px;
      align-items: center;
      justify-content: center;
      margin-top: 32px;

      .p-button {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500;
        font-style: normal;
        font-size: 16px;
        line-height: 20px;

        @include mobile {
          font-size: 14px;
          line-height: 16px;
        }
      }

      @include mobile {
        margin-top: 22px;
      }
    }

    @include mobile {
      width: 304px;
      padding: 24px 32px;
    }
  }
}
</style>
