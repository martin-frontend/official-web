<template>
  <NewDialog header="Withdraw Account">
    <div class="content">
      <div class="field-group">
        <div class="field">
          <IconBase
            :width="40"
            :height="40"
            viewBox="0 0 40 40"
            icon-color="#000"
            style="margin-right: 25px"
          >
            <IconPayCard />
          </IconBase>
          <span class="user-name">
            {{
              `${userStore.userInfo?.firstname || ''} ${
                userStore.userInfo?.lastname || ''
              }`
            }}
          </span>
        </div>
        <div class="field">
          <IconBase
            :width="40"
            :height="40"
            viewBox="0 0 40 40"
            icon-color="#000"
            style="margin-right: 14px"
          >
            <IconBank />
          </IconBase>
          <div class="selector">
            <span class="selector-label">
              {{ t('my_withdrawal_account.label.bank_name') }}
            </span>
            <select v-model="query.bankCode" class="selector-input">
              <option
                v-for="{ code, name } of bankOptions"
                :key="code"
                :value="code"
              >
                {{ name }}
              </option>
            </select>
            <IconBase
              :width="20"
              :height="20"
              viewBox="0 0 9 6"
              class="selector-icon"
            >
              <IconFilledArrow />
            </IconBase>
          </div>
        </div>
        <div class="field">
          <IconBase
            :width="40"
            :height="40"
            viewBox="0 0 40 40"
            icon-color="#000"
            style="margin-right: 14px"
          >
            <IconIdentity />
          </IconBase>
          <InputBox
            v-model="query.bankAccount"
            class="input"
            :label="t('my_withdrawal_account.label.account_number')"
          />
        </div>
        <div class="field">
          <InputBox
            v-model="query.bankCityName"
            class="input"
            :label="t('my_withdrawal_account.label.bank_branch_city')"
          />
        </div>
        <div class="field">
          <InputBox
            v-model="query.bankBranchName"
            class="input"
            :label="t('my_withdrawal_account.label.branch_name')"
          />
        </div>

        <Button
          :disabled="disabled"
          class="button"
          color="primary"
          variant="block"
          @click="emit('addAccount', query)"
        >
          {{ t('my_withdrawal_account.add_account') }}
        </Button>
      </div>
    </div>
  </NewDialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, reactive, defineEmits, defineProps } from 'vue';
import NewDialog from '@/layout/NewDialog.vue';
import IconPayCard from '@/components/icons/IconPayCard.vue';
import IconBank from '@/components/icons/IconBank.vue';
import IconIdentity from '@/components/icons/IconIdentity.vue';
import IconBase from '@/components/icons/IconBase.vue';
import InputBox from '@/components/InputBox.vue';
import Button from '@/components/Button.vue';
import { CreatePlayerBankAccountDto } from '../domain/player/playerBankAccount.model';
import IconFilledArrow from '@/components/icons/IconFilledArrow.vue';
import { BankOption } from '../domain/bank.model';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';

interface CreateWithdrawalAccountEmits {
  (e: 'addAccount', query: CreatePlayerBankAccountDto['props']): void;
}
interface CreateWithdrawalAccountProps {
  bankOptions: BankOption[];
}

const emit = defineEmits<CreateWithdrawalAccountEmits>();
defineProps<CreateWithdrawalAccountProps>();

const { t } = useI18n();
// console.log(t);
const query = reactive({} as CreatePlayerBankAccountDto['props']);
const disabled = computed(() => !query.bankAccount || !query.bankCode);
const userStore = useUserStore();
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.content {
  width: 400px;
  max-width: 100%;
  @include mobile {
    width: 280px;
  }
}
.field-group {
  margin-top: 32px;
}

.field {
  display: flex;
  align-items: center;
  & ~ & {
    margin-top: 12px;
  }
  .user-name {
    font-size: 16px;
    line-height: 20px;
    color: var(--primary-color);
  }
  .input {
    flex: 1;
  }
}
.button {
  margin-top: 32px;
  @include mobile {
    margin-top: 16px;
  }
}

.selector {
  position: relative;
  overflow: hidden;
  flex: 1;

  &-label {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 12px;
    line-height: 16px;
    color: var(--primary-color);
  }

  &-input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 8px 16px;
    padding-top: 24px;
    color: #424242;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: #fff;

    &:focus {
      background-color: #f5f5f5;
      border-color: var(--primary-color);
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &-icon {
    position: absolute;
    top: 20px;
    right: 16px;
  }

  option {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 22px;
    color: var(--primary-color);
  }
}
</style>
