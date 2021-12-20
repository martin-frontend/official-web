<template>
  <DialogPrimevue :modal="true">
    <div class="confirmDialog">
      <div class="confirmDialog-top">
        <CloseButton @click="closeConfirmDialog" />
      </div>
      <div class="confirmDialog-main">
        <IconBase :width="80" :height="80" viewBox="0 0 60 60">
          <IconCheck />
        </IconBase>
        <div class="confirmDialog-title">{{ t('common.confirm') }}</div>
      </div>
      <div class="confirmDialog-content">
        {{ t('kyc_verified.confirm') }}
      </div>
      <div class="confirmDialog-action">
        <Button
          is-component="div"
          variant="rounded"
          size="huge"
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
import DialogPrimevue from 'primevue/dialog';
import { useI18n } from 'vue-i18n';
import IconBase from '@/components/icons/IconBase.vue';
import Button from '@/components/Button.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
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
    text-align: center;
  }

  .confirmDialog-title {
    margin-top: 16px;
    font-size: 26px;
    line-height: 28px;
    font-weight: 500;
    color: var(--primary-color);
  }
  .confirmDialog-content {
    width: 100%;
    margin-top: 16px;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-secondary);
    text-align: center;
  }
  .confirmDialog-action {
    margin-top: 32px;
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
