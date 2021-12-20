<template>
  <DialogPrimevue :modal="true">
    <div class="dialog">
      <div class="dialog-close" @click="closePromotionDialog">
        <IconBase
          :width="30"
          :height="30"
          icon-color="#fff"
          viewBox="0 0 30 30"
        >
          <IconClose :width="12" :height="12" />
        </IconBase>
      </div>
      <div class="dialog-main">
        <div class="dialog-top">
          <div class="dialog-img">
            <img
              :src="`${imagePath}${promotionEvent?.imageUrl}`"
              :alt="promotionEvent?.title"
            />
          </div>
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
      <div class="dialog-bottom">
        <Button variant="rounded" size="small" @click="acceptEvent">
          {{ t('common.get_started') }}
        </Button>
      </div>
    </div>
  </DialogPrimevue>
  <!-- <Teleport to="body">
  </Teleport> -->
</template>

<script lang="ts" setup>
import { defineProps, toRefs, onUnmounted, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import DialogPrimevue from 'primevue/dialog';
import IconBase from '../../../components/icons/IconBase.vue';
import IconClose from '../../../components/icons/IconClose.vue';
import Button from '../../../components/Button.vue';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import handlePromotionClick from '@/modules/promotions/application/handlePromotionClick';
// use i18n
const { t } = useI18n();

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

onUnmounted(() => {
  closePromotionDialog();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

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
  width: 700px;
  max-height: 760px;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  overflow: hidden;
  background: var(--secondary-variants-color);
  background: var(--secondary-variants-color);

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

  .dialog-main {
    overflow-y: auto;
    height: calc(100vh - 188px);
  }

  .dialog-top {
    position: relative;
  }

  .dialog-img {
    width: 100%;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dialog-close {
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

  .dialog-content {
    width: 100%;
    box-sizing: border-box;
    padding: 32px 40px;
    padding-bottom: 104px;
  }

  .dialog-title {
    font-size: 24px;
    line-height: 24px;
    color: var(--text-primary);
  }

  .dialog-subtitle {
    color: var(--primary-color);
  }

  .dialog-title,
  .dialog-subtitle {
    text-align: center;
  }

  &-title + &-subtitle {
    margin-top: 8px;
  }
  &-subtitle + &-description {
    margin-top: 32px;
  }

  .dialog-description {
    color: var(--text-secondary);
  }

  .dialog-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 38px;
    background: #141622;
  }

  @include mobile {
    width: 340px;
    .dialog-img {
      height: 194px;
    }

    .dialog-main {
      height: 486px;
    }

    .dialog-content {
      padding: 20px 24px;
      padding-bottom: 84px;
    }

    .dialog-title {
      font-size: 16px;
      line-height: 20px;
    }

    .dialog-subtitle {
      font-size: 12px;
      line-height: 16px;
    }

    .dialog-bottom {
      padding: 10px 16px;
    }
  }
}

// :global(body) {
//   overflow: hidden;
// }
</style>
