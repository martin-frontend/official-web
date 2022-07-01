<template>
  <div>
    <div class="bonus-block-group">
      <Heading :title="t('my_withdrawal_account.title')" />
      <OutlineCard v-for="account of accounts" :key="account.id">
        <div class="bulletin">
          <div class="bulletin-title">
            {{ t('my_withdrawal_account.account_management') }}
          </div>
          <WithdrawalAccountCard
            :data="account"
            style="cursor: pointer"
            @click="isDetailDialogShown = true"
          />
        </div>
      </OutlineCard>

      <OutlineCard v-if="accounts.length === 0">
        <div class="bulletin">
          <div class="bulletin-title">
            {{ t('my_withdrawal_account.account_management') }}
          </div>
          <WithdrawalAccountCard
            style="cursor: pointer"
            @click="isCreateDialogShown = true"
          />
          <div class="bulletin-remind">
            {{ t('my_withdrawal_account.remind') }}
          </div>
        </div>
      </OutlineCard>
    </div>
  </div>

  <WithdrawalAccountDetail
    v-if="isDetailDialogShown"
    v-model:visible="isDetailDialogShown"
    :data="accounts[0]"
    @delete="startDelete"
  />
  <DeleteWithdrawalAccount
    v-if="deleteId && isDeleteDialogShown"
    :id="deleteId"
    v-model:visible="isDeleteDialogShown"
    @cancel="isDeleteDialogShown = false"
    @delete="deleteAccount"
  />
  <CreateWithdrawalAccount
    v-if="isCreateDialogShown"
    v-model:visible="isCreateDialogShown"
    :bank-options="bankOptions"
    @addAccount="startVerifyPhone"
  />
  <VerifyPhoneDialog
    v-if="isVerifyDialogShown"
    v-model:visible="isVerifyDialogShown"
    :submit="createAccount"
    @close="isVerifyDialogShown = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import {
  createPlayerBankAccount,
  deletePlayerBankAccount,
  getPlayerBankAccount,
  sendPlayerBankAccountOtp,
} from '@/modules/bank/infrastructure/player/playerBankAccount.api';
import { getBankOptions } from '@/modules/bank/infrastructure/bank.api';
import {
  CreatePlayerBankAccountDto,
  PlayerBankAccountAggregateRoot,
} from '@/modules/bank/domain/player/playerBankAccount.model';
import WithdrawalAccountCard from '../../../modules/bank/ui/WithdrawalAccountCard.vue';
import WithdrawalAccountDetail from '@/modules/bank/ui/WithdrawalAccountDetail.vue';
import DeleteWithdrawalAccount from '@/modules/bank/ui/DeleteWithdrawalAccount.vue';
import CreateWithdrawalAccount from '../../../modules/bank/ui/CreateWithdrawalAccount.vue';
import VerifyPhoneDialog from '../personalSettings/VerifyPhoneDialog.vue';
import { BankOption } from '@/modules/bank/domain/bank.model';
import useToastStore, { ToastDto } from '@/core/shared/toastStore';

// use i18n
const { t } = useI18n();
const accounts = ref<PlayerBankAccountAggregateRoot[]>([]);
const bankOptions = ref<BankOption[]>([]);
const isDetailDialogShown = ref(false);
const isDeleteDialogShown = ref(false);
const isCreateDialogShown = ref(false);
const isVerifyDialogShown = ref(false);
const deleteId = ref();
const createAccountDto = reactive({} as CreatePlayerBankAccountDto);

const updateAccounts = async () => {
  const resData = await getPlayerBankAccount();
  accounts.value = resData.map((item) => ({
    ...item,
    bank: bankOptions.value.find(({ code }) => code === item.bankCode),
  }));
};

const updateBankOptions = async () => {
  bankOptions.value = await getBankOptions();
};

const toastStore = useToastStore();

function openToast() {
  const toast = {} as ToastDto;
  toast.toastTitle = t('my_withdrawal_account.toast.title');
  toast.toastDescription = t('my_withdrawal_account.toast.description');
  toast.isIconCheckCircle = true;
  toast.color = 'success';
  toastStore.addToastMessage(toast);
}

const startDelete = (id: number) => {
  deleteId.value = id;
  isDetailDialogShown.value = false;
  isDeleteDialogShown.value = true;
};

const deleteAccount = async () => {
  try {
    await deletePlayerBankAccount(deleteId.value);
    accounts.value = accounts.value.filter(
      (item) => item.id !== deleteId.value
    );
    isDeleteDialogShown.value = false;
    openToast();
  } catch (error) {
    console.error(error);
  }
};

const startVerifyPhone = async (query: CreatePlayerBankAccountDto['props']) => {
  isCreateDialogShown.value = false;
  createAccountDto.props = { ...query };
  isVerifyDialogShown.value = true;
  sendPlayerBankAccountOtp();
};

const createAccount = async (code: string) => {
  createAccountDto.otp = code;
  await createPlayerBankAccount(createAccountDto);
  isVerifyDialogShown.value = false;
  updateAccounts();
  openToast();
};

onMounted(async () => {
  updateAccounts();
  updateBankOptions();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.outline-card {
  overflow: auto;
  & + & {
    margin-top: 16px;
  }
}
.bonus-block-group {
  width: 720px;
  max-width: 100%;
  & + & {
    margin-top: 32px;
  }
}
.bulletin {
  display: flex;
  padding: 32px;
  flex-direction: column;

  .bulletin-title {
    flex: 1;
    font-size: 26px;
    line-height: 28px;
    color: var(--primary-color);
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--primary-color);

    @include mobile {
      font-size: 18px;
      line-height: 20px;
    }
  }
  .bulletin-remind {
    margin-top: 24px;
    font-size: 12px;
    line-height: 16px;
    color: #9e9e9e;
  }
}
</style>
