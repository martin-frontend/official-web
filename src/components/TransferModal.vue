<template>
  <DialogPrimevue :modal="true">
    <div class="dialog">
      <div class="title-and-close">
        <div class="title">{{ transferTitle }}</div>
        <div class="dialog-close" @click="closeView">
          <IconBase
            :width="20"
            :height="20"
            icon-color="#fff"
            viewBox="0 0 20 20"
          >
            <IconClose :width="12" :height="12" />
          </IconBase>
        </div>
        <div class="transfer-description">
          {{ t('payment.my_rewards.transfer_modal.description') }}
        </div>
      </div>
      <slot />
      <!-- <div class="submit">
        <div class="transfer-box">
          <div class="total">
            <div class="total-text">{{ 'Total:' }}</div>
            <div class="total-amount">{{ '500' }}</div>
          </div>
          <div class="exchange">
            <div class="exchange-name">{{ 'Exchange Amount$' }}</div>
            <div class="exchange-amount">{{ '388' }}</div>
          </div>
          <Button
            class="transfer-button"
            component="button"
            size="transfer"
            variant="rounded"
            color="success"
          >
            <IconBase
              :width="20"
              :height="20"
              viewBox="0 0 24 24"
              icon-color="var(--primary-color)"
            >
              <IconTransfer />
            </IconBase>
            {{ t('payment.my_rewards.transferButton') }}
          </Button>
        </div>
      </div> -->
    </div>
  </DialogPrimevue>
</template>

<script lang="ts" setup>
// import { defineProps, toRefs, ref, onUnmounted } from 'vue';
import { onUnmounted, defineEmits, withDefaults, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
// import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';
// import IconTransfer from '@/components/icons/IconTransfer.vue';
// use i18n
const { t } = useI18n();

export interface ViewDetailColumn<T> {
  key: keyof T;
  header: string;
}

export interface ViewDetailProps<T> {
  // eslint-disable-next-line vue/require-default-prop
  data?: T;
  columns?: ReadonlyArray<ViewDetailColumn<T>>;
  // eslint-disable-next-line vue/require-default-prop
  transferTitle?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<ViewDetailProps<any>>(), {
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'cancelError'): boolean;
}>();

function closeView() {
  emit('close');
  emit('cancelError');
}

onUnmounted(() => {
  closeView();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 424px;
  min-height: 300px;
  // max-width: 700px;
  width: 320px;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow: hidden;
  background: #fff;

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
  // .submit {
  //   border-top: 1px solid #e0e0e0;
  //   .transfer-box {
  //     padding: 16px 16px;
  //     .total {
  //       display: flex;
  //       justify-content: space-between;
  //       .total-text {
  //         font-size: 16px;
  //         color: #9e9e9e;
  //       }
  //       .total-amount {
  //         font-weight: 500;
  //         font-size: 18px;
  //         line-height: 20px;
  //       }
  //     }
  //     .exchange {
  //       display: flex;
  //       justify-content: flex-end;
  //       margin: 16px 0;

  //       .exchange-name {
  //         font-size: 10px;
  //         color: #c1a14e;
  //       }
  //       .exchange-amount {
  //         color: #c1a14e;
  //         margin-left: 4px;
  //       }
  //     }
  //   }
  //   .transfer-button {
  //     width: 288px;
  //     height: 40px;
  //     line-height: 16px;
  //     align-items: center;
  //     display: flex;
  //     justify-content: center;
  //   }
  // }
  @include mobile {
    width: 320px;
  }
}

.title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding: 10px 30px;
  text-align: center;
  color: var(--text-primary);
  background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
}
.dialog-close {
  margin-top: -3px;
}
.transfer-description {
  padding: 10px 30px;
  font-size: 12px;
  color: #9e9e9e;
  text-align: center;
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
</style>
