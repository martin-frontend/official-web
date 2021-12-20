<template>
  <div v-if="promotionEvent" class="dialog-wrapper">
    <div class="dialog">
      <button class="dialong-close" @click="closePromotionDialog">
        <IconBase
          :width="12"
          :height="12"
          icon-color="#fff"
          viewBox="9 9 12 12"
        >
          <IconClose />
        </IconBase>
      </button>
      <div class="dialong-railings">
        <div class="dialog-kv">
          <img
            :src="`${imagePath}${promotionEvent?.imageUrl}`"
            :alt="promotionEvent?.title"
          />
        </div>
        <div class="dialog-content">
          <h3 class="dialog-title">
            {{ promotionEvent?.title }}
          </h3>
          <p class="dialog-subtitle">
            {{ promotionEvent?.subtitle }}
          </p>
          <p class="dialog-description">
            {{ promotionEvent?.description }}
          </p>
        </div>
      </div>
      <div class="dialog-footer">
        <Button
          class="p-button-rounded primary-linear-btn"
          @click="acceptEvent"
        >
          {{ 'LET’S GET STARTED' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, defineEmits } from 'vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import handlePromotionClick from '@/modules/promotions/application/handlePromotionClick';
import IconBase from '@/components/icons/IconBase.vue';
import IconClose from '@/components/icons/IconClose.vue';

const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;

const props = defineProps<{ promotionEvent: null | PromotionEvent }>();

const { promotionEvent } = toRefs(props);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function closePromotionDialog() {
  emit('close');
}

const router = useRouter();

function acceptEvent() {
  if (!promotionEvent.value) return;

  handlePromotionClick(promotionEvent.value.id, router);
}
</script>

<style lang="scss" scoped>
@import '@/styles/mediaQuery.scss';

.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
}

.dialog {
  position: relative;
  overflow: hidden;
  width: 700px;
  height: 760px;
  border-radius: 10px;
  background: #323232;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.45);

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: #c1a14e;
  }

  .dialong-railings {
    overflow-y: auto;
    width: 100%;
    height: 688px;
  }

  .dialog-kv {
    overflow: hidden;
    width: 100%;
    height: 400px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .dialog-content {
    box-sizing: border-box;
    padding: 32px 40px;
    text-align: center;
  }

  .dialog-title {
    color: var(--text-primary);
    font-size: 24px;
    line-height: 24px;
  }

  .dialog-subtitle {
    margin-top: 8px;
    color: var(--primary-color);
    line-height: 20px;
  }

  .dialog-description {
    color: #bdbdbd;
    line-height: 20px;
    text-align: left;
  }

  .dialog-subtitle + .dialog-description {
    margin-top: 32px;
  }

  .dialog-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 72px;
    padding: 16px 38px;
    background: #141622;
    box-shadow: inset 0 1px 0 #2b2e38;

    .p-button {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
    }
  }

  .dialong-close {
    position: absolute;
    top: 12px;
    right: 12px;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    padding: 9px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  @include pad {
    width: 340px;
    height: 486px;

    .dialog-kv {
      height: 194px;
    }

    .dialog-content {
      padding: 20px 24px;
    }

    .dialog-title {
      font-size: 16px;
      line-height: 20px;
    }

    .dialog-subtitle {
      margin-top: 4px;
      font-size: 12px;
      line-height: 16px;
    }

    .dialog-subtitle + .dialog-description {
      margin-top: 16px;
    }

    .dialog-footer {
      height: 60px;
      padding: 10px 16px;
    }
  }
}
</style>
