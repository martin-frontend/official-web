<template>
  <DialogPrimevue :modal="true">
    <div class="confirmDialog">
      <div class="confirmDialog-top">
        <CloseButton @click="closeConfirmDialog" />
      </div>
      <div class="confirmDialog-main">
        <div class="confirmDialog-title">
          {{ t('personal_settings.send_verification_link') }}
        </div>
        <div class="confirmDialog-icon">
          <IconBase class="icon" :width="60" :height="60" viewBox="0 0 60 60">
            <IconOTP />
          </IconBase>
        </div>
      </div>
      <div class="confirmDialog-define">
        {{ t('personal_settings.verify_your_email') }}
      </div>
      <div class="confirmDialog-action">
        <Button
          is-component="div"
          variant="block"
          size="medium"
          @click="closeConfirmDialog"
        >
          {{ t('common.confirm') }}
        </Button>
      </div>
    </div>
  </DialogPrimevue>
</template>

<script lang="ts" setup>
import { defineEmits, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
import IconBase from '@/components/icons/IconBase.vue';
// import IconCheck from '@/components/icons/IconCheck.vue';
import IconOTP from '@/components/icons/IconOTP.vue';
import Button from '@/components/Button.vue';
import CloseButton from '@/components/CloseButton.vue';

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
function closeConfirmDialog() {
  emit('close');
}

onUnmounted(() => {
  closeConfirmDialog();
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.confirmDialog {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  padding: 40px;
  padding-top: 45px;
  border: 1px solid var(--primary-color);
  background: var(--secondary-variants-color);
  border-radius: 10px;

  .confirmDialog-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .confirmDialog-title {
    margin-bottom: 22px;
    font-size: 28px;
    line-height: 32px;
    color: var(--primary-color);
  }

  .confirmDialog-define {
    width: 100%;
    margin-top: 16px;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-secondary);
    text-align: center;
  }
  .confirmDialog-content {
    margin-top: 24px;
  }
  .confirmDialog-action {
    margin-top: 16px;
  }

  .confirmDialog-tips {
    margin-top: 8px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: var(--text-primary);
  }

  @include mobile {
    width: 320px;
    padding: 32px;

    .confirmDialog-title {
      font-size: 16px;
      line-height: 20px;
    }

    .confirmDialog-define {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>

<i18n locale="en" src="@/core/locales/en.json"></i18n>
