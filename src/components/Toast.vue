<template>
  <div class="popup">
    <div class="popup-container">
      <transition-group tag="span" name="fade">
        <div
          v-for="toast of toastContent"
          :key="toast.toastId"
          class="popup-inner text"
          :class="[toast.color]"
        >
          <slot />
          <div class="toast-box">
            <div class="toast-icon">
              <template v-if="!toast.isIconError">
                <IconBase
                  :width="26"
                  :height="26"
                  icon-color="#fff"
                  viewBox="0 0 30 30"
                >
                  <IconCheckCircle
                    v-if="toast.isIconCheckCircle"
                    :width="30"
                    :height="30"
                  />
                  <IconBan v-if="toast.isIconBan" :width="30" :height="30" />
                  <IconInfoCircle
                    v-if="toast.isIconInfoCircle"
                    :width="30"
                    :height="30"
                  />
                </IconBase>
              </template>

              <template v-else>
                <IconBase
                  v-if="toast.isIconError"
                  :width="26"
                  :height="26"
                  icon-color="#fff"
                  viewBox="0 0 30 30"
                  class="error"
                >
                  <IconClose :width="12" :height="12" />
                </IconBase>
              </template>
            </div>
            <div class="toast-text">
              <div class="toast-title">{{ toast.toastTitle }}</div>
              <div class="toast-description">
                {{ toast.toastDescription }}
              </div>
            </div>
            <div
              class="dialog-close"
              @click="toastStore.closeToastMessage(toast.toastId)"
            >
              <IconBase
                :width="20"
                :height="20"
                icon-color="#fff"
                viewBox="0 0 20 20"
              >
                <IconClose :width="12" :height="12" />
              </IconBase>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { defineEmits, withDefaults, defineProps } from 'vue';
// import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconBan from '@/components/icons/IconBan.vue';
import IconCheckCircle from './icons/IconCheckCircle.vue';
import IconInfoCircle from '@/components/icons/IconInfoCircle.vue';
import useToastStore from '@/core/shared/toastStore';

// export type TypographyColor = 'success' | 'danger' | 'accent';

// export interface ToastProps {
//   // eslint-disable-next-line vue/require-default-prop
//   toastTitle?: string;
//   // eslint-disable-next-line vue/require-default-prop
//   toastDescription?: string;

//   color?: TypographyColor;
//   isIconInfoCircle?: boolean;
//   isIconCheckCircle?: boolean;
//   isIconBan?: boolean;
// }

// const props = withDefaults(defineProps<ToastProps>(), {
//   toastTitle: '',
//   toastDescription: '',
//   color: 'danger',
//   isIconInfoCircle: false,
//   isIconCheckCircle: false,
//   isIconBan: false,
// });
// const emit = defineEmits<{
//   (e: 'closeToast'): void;
// }>();

// function togglePopup() {
//   emit('closeToast');
// }

const toastStore = useToastStore();
const { toastContent } = storeToRefs(toastStore);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from {
  transform: translateY(20px);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup {
  display: flex;
  position: fixed;
  width: 100%;
  height: 0;
  top: 60px;
  z-index: 99;

  .popup-container {
    display: inline-flex;
    flex-direction: column;
    margin: auto;
  }
  .popup-inner {
    // background: var(--success-color);
    width: 320px;
    min-height: 68px;
    border-radius: 5px;
    margin-bottom: 10px;

    .toast-box {
      display: grid;
      grid-template-columns: 1fr 5fr 1fr;
      padding: 12px;

      .toast-icon {
        margin-top: 8px;
        margin-left: 3px;
      }

      .toast-description {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin-top: 4px;
      }
    }

    .dialog-close {
      display: flex;
      justify-content: flex-end;
      padding-right: 5px;
      margin-top: -5px;
    }
  }
}
.text {
  color: var(--text-primary);
  &.success {
    background-color: var(--success-color);
  }
  &.danger {
    background-color: var(--error-color);
  }
  &.accent {
    background-color: var(--primary-color);
  }
}

.error {
  border: 1px solid #fff;
  border-radius: 50%;
}
</style>
