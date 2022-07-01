<template>
  <DialogPrimevue :modal="true">
    <div class="confirmDialog">
      <div class="confirmDialog-top">
        <CloseButton @click="closeConfirmDialog" />
      </div>
      <div class="confirmDialog-main">
        <div class="confirmDialog-title">
          {{ t('personal_settings.update_name') }}
        </div>
      </div>
      <div class="confirmDialog-define">
        <div>
          {{ t('personal_settings.update_name_note') }}
        </div>
      </div>
      <div class="confirmDialog-content">
        <InputBox
          v-model="updateFirstname"
          class="input"
          label="First name"
          :is-error="isUpdateFirstname"
          :error-message="errorMessage"
        />
      </div>
      <div class="confirmDialog-content">
        <InputBox
          v-model="updateLastname"
          class="input"
          label="Last name"
          :is-error="isUpdateLastname"
          :error-message="errorMessage"
        />
      </div>
      <div class="confirmDialog-action">
        <button class="confirmDialog-button" @click="updateName">
          {{ t('common.submit') }}
        </button>
        <button
          class="confirmDialog-button confirmDialog-button-outline"
          @click="closeConfirmDialog"
        >
          {{ t('common.cancel') }}
        </button>
      </div>
      <div class="confirmDialog-hints">
        <div class="confirmDialog-tip">
          {{ t('personal_settings.update_name_warning') }}
        </div>
      </div>
    </div>
  </DialogPrimevue>
</template>

<script lang="ts" setup>
import { defineEmits, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DialogPrimevue from 'primevue/dialog';
import { updateUserName } from '@/modules/user/Infrastructure/api/update.name.api';
import useDialogStore from '@/core/shared/dialogStore';
import InputBox from '@/components/InputBox.vue';
import CloseButton from '@/components/CloseButton.vue';

const { t } = useI18n();

const updateFirstname = ref('');
const updateLastname = ref('');
const errorMessage = ref('');
const isUpdateFirstname = ref(false);
const isUpdateLastname = ref(false);
const dialogStore = useDialogStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
function closeConfirmDialog() {
  emit('close');
  updateFirstname.value = '';
  updateLastname.value = '';
  isUpdateFirstname.value = false;
  isUpdateLastname.value = false;
}

function updateName() {
  isUpdateFirstname.value = false;
  isUpdateLastname.value = false;
  updateUserName({
    firstname: updateFirstname.value,
    lastname: updateLastname.value,
  })
    .then(() => {
      dialogStore.popUp({
        title: t('personal_settings.update_successfully'),
        isCheckShown: true,
        isCancelButtonShown: true,
        cancelButtonText: t('common.confirm'),
        isOkButtonShown: false,
        onOtherOk() {
          dialogStore.close();
          closeConfirmDialog();
        },
      });
      closeConfirmDialog();
    })
    .catch((err) => {
      if (!err.firstname) {
        isUpdateLastname.value = true;
        errorMessage.value = t('common.required');
      } else if (!err.lastname) {
        isUpdateFirstname.value = true;
        errorMessage.value = t('common.required');
      } else {
        isUpdateLastname.value = true;
        isUpdateFirstname.value = true;
        errorMessage.value = t('common.required');
      }
    });
}

onUnmounted(() => {
  dialogStore.close();
  closeConfirmDialog();
});
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.confirmDialog {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 480px;
  padding: 40px;
  padding-top: 45px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  background: var(--secondary-variants-color);
  transform: translate(-50%, -50%);

  .confirmDialog-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .confirmDialog-title + .confirmDialog-icon {
    margin-top: 22px;
  }

  .confirmDialog-title {
    margin-top: 16px;
    color: var(--primary-color);
    font-size: 28px;
    line-height: 32px;
  }

  .confirmDialog-define {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 24px;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .confirmDialog-content + .confirmDialog-content {
    margin-top: 12px;
  }

  .confirmDialog-action {
    margin-top: 24px;
  }

  .confirmDialog-button {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    margin-top: 12px;
    font-size: 14px;
    line-height: 16px;
    color: var(--text-primary);
    font-weight: var(--text-bold);
    text-align: center;
    white-space: nowrap;
    border: 1px solid var(--primary-color);
    background: linear-gradient(180deg, #f0c879 0%, #a8772b 100%);
    border-radius: 5px;

    &:first-child {
      margin-top: 0;
    }

    &-outline {
      color: var(--primary-color);
      background: transparent;
    }
  }

  .confirmDialog-hints {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    font-size: 14px;
    line-height: 12px;
  }

  .confirmDialog-tip {
    color: var(--text-primary);
  }

  .confirmDialog-link {
    margin-left: 8px;
    color: var(--success-color);
    text-decoration: underline;
    cursor: pointer;
  }

  @include mobile {
    width: 320px;
    padding: 32px;

    .confirmDialog-title {
      font-size: 16px;
      line-height: 20px;
    }

    .confirmDialog-hints {
      flex-direction: column;
      font-size: 12px;
      line-height: 16px;
    }

    .confirmDialog-tip {
      margin-left: 0;
    }
  }
}

.isCorrectDialog {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 480px;
  padding: 40px;
  padding-top: 45px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  background: var(--secondary-variants-color);
  transform: translate(-50%, -50%);

  .isCorrectDialog-main {
    width: 100%;
    text-align: center;
  }

  .isCorrectDialog-title {
    margin-top: 16px;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 26px;
    line-height: 28px;
  }

  .isCorrectDialog-content {
    width: 100%;
    margin-top: 16px;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .isCorrectDialog-action {
    margin-top: 32px;
  }
}
</style>

<i18n locale="en" src="@/core/locales/en.json"></i18n>
