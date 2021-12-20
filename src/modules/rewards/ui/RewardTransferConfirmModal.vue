<template>
  <DialogPrimevue :modal="true">
    <div class="dialog">
      <div class="title-and-close">
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
        <div class="confirm-box">
          <div class="confirm-title">
            {{ 'Are you sure you want to transfer out?' }}
          </div>
          <div class="confirm-description">
            <div class="description-1">
              {{
                'Please note: The ratio of transfer back to the main account is two to one, and the withdrawal limit is doubled.'
              }}
            </div>
            <br />
            <div class="description-2">
              {{
                'That is, the 100 bonus is transferred back to the account, and the main account is increased by 50. the withdrawal limit is increased by 100.'
              }}
            </div>
          </div>
        </div>
        <div class="button-group">
          <Button
            class="button-yes"
            variant="rounded"
            size="large"
            @click="emitTransfer"
          >
            {{ 'Yes' }}
          </Button>
          <Button
            class="button-no"
            variant="rounded-outlined"
            size="large"
            @click="closeView"
          >
            {{ 'No' }}
          </Button>
        </div>
      </div>
    </div>
  </DialogPrimevue>
</template>

<script lang="ts" setup>
// import { defineProps, toRefs, ref, onUnmounted } from 'vue';
import { onUnmounted, defineEmits, withDefaults, defineProps } from 'vue';
// import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
// import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';
import Button from '@/components/Button.vue';
// import IconTransfer from '@/components/icons/IconTransfer.vue';
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
  transferTitle?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
withDefaults(defineProps<ViewDetailProps<any>>(), {
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'emitTransfer'): void;
  (e: 'applyTransferPointToZero'): void;
}>();

function closeView() {
  emit('close');
  emit('applyTransferPointToZero');
}

function emitTransfer() {
  emit('emitTransfer');
  emit('close');
}
onUnmounted(() => {
  // closeView();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';
.dialog {
  outline: 1px solid var(--primary-color-hover);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 576px;
  // min-height: 300px;
  // max-width: 700px;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow: hidden;
  background: #323232;
  height: 332px;

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
    height: 288px;
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

//switch

.confirm-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px 40px 0px 40px;
  @include mobile {
    padding: 32px 32px 0px 32px;
  }
  .confirm-title {
    display: flex;
    font-size: 26px;
    font-weight: 500;
    line-height: 28px;
    justify-content: center;
    color: var(--primary-color);
    text-align: center;
    @include mobile {
      width: 200px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      margin: 0 auto;
    }
  }
  .confirm-description {
    margin-top: 16px;
    .description-1,
    .description-2 {
      text-align: center;
    }
    color: var(--text-secondary);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    @include mobile {
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
    }
  }
}
.button-group {
  display: flex;
  flex-direction: row;
  padding: 32px 40px 40px 40px;
  @include mobile {
    padding: 16px 32px 32px 32px;
  }
  .button-yes,
  .button-no {
    width: 240px;
  }
  .button-yes {
    margin-right: 16px;
  }
}
</style>
