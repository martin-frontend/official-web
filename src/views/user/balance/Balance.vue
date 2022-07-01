<!-- Todo：brick-card 可拆為元件 -->
<template>
  <div>
    <Heading
      :title="t('payment.balance.title')"
      :define="t('payment.balance.define')"
    />
    <div class="balance-block-group">
      <div class="cards-wrapper">
        <CustomOutlineCard
          :title="t('payment.balance.entrances.balance.title')"
          :data="`$ ${amountString}`"
          path="/user/history/payment-transactions"
        />
      </div>
      <div class="button-group">
        <Button
          component="button"
          color="primary"
          size="huge"
          @click="$router.push('/user/deposit')"
        >
          <IconBase
            :width="25"
            :height="24"
            viewBox="0 0 25 24"
            icon-color="#fff"
          >
            <IconDepositBtn />
          </IconBase>
          {{ t('payment.transaction.kind.DEPOSIT') }}
        </Button>
        <Button
          component="button"
          color="primary"
          size="huge"
          @click="$router.push('/user/withdraw')"
        >
          <IconBase
            :width="25"
            :height="24"
            viewBox="0 0 25 24"
            icon-color="#fff"
          >
            <IconWithdrawBtn />
          </IconBase>
          {{ t('payment.transaction.kind.WITHDRAW') }}
        </Button>
      </div>
    </div>

    <div class="balance-block-group">
      <div class="cards-wrapper">
        <CustomOutlineCard
          :title="t('payment.balance.entrances.withdraw_limit.title')"
          :data="`$ ${withdrawalLimitString}`"
          path="/user/history/balance-withdraw"
        />

        <CustomOutlineCard
          :title="t('payment.balance.entrances.withdrawable_balance.title')"
          :data="`$ ${withdrawableBalanceString}`"
          path="/user/history/withdraw-history"
        />
      </div>
    </div>

    <div class="balance-block-group">
      <div class="cards-wrapper">
        <CustomOutlineCard
          :title="t('payment.rewards_bonus.entrances.my_bonus.title')"
          :data="`${bonusString} Points`"
          path="/user/history/bonuses-history"
        >
          <Button
            class="transfer-button"
            component="button"
            size="transfer"
            variant="rounded"
            color="success"
            @click="openDialog"
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
        </CustomOutlineCard>
      </div>
    </div>
  </div>

  <BonusTransferModal
    v-model:visible="openTransfer"
    :transfer-title="transferTitle"
    @close="closeBonusTransferModal"
    @closeTransferModal="closeTransferModal"
    @update:mybonusAmount="updateBonuses"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FormGroup from 'vue-reactive-form';
import moment from 'moment';
import { toDollarsAmount } from '@/libs/dollars';
import {
  getWithdrawableBalanceValue,
  updateBalance,
} from '@/modules/userBalance/application/balance';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import Heading from '@/components/Heading.vue';
import CustomOutlineCard from '@/views/user/balance/CustomOutlineCard.vue';
import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconTransfer from '@/components/icons/IconTransfer.vue';
import BonusTransferModal from '@/modules/userBonuses/ui/BonusTransferModal.vue';
import { initBonuses } from '@/modules/userBonuses/application/bonuses';
import { SearchCompletedUserEventForm } from '@/modules/userBonuses/domain/userEvent';
import IconDepositBtn from '../../../components/icons/IconDepositBtn.vue';
import IconWithdrawBtn from '../../../components/icons/IconWithdrawBtn.vue';

// use i18n
const { t } = useI18n();

const balanceStore = useBalanceStore();

const amountString = computed(() => toDollarsAmount(balanceStore.amount));
const withdrawalLimitString = computed(() =>
  toDollarsAmount(balanceStore.withdrawalLimit || 0)
);
const withdrawableBalanceString = computed((): string =>
  toDollarsAmount(
    getWithdrawableBalanceValue(
      balanceStore.amount,
      balanceStore.withdrawalLimit
    )
  )
);

const bonusString = computed(() => toDollarsAmount(balanceStore.bonus));

// ----------------------------------紅利轉出----------------------------------
const transferTitle = t('my_bonuses.transfer_title');

const searchCompletedForm = new FormGroup<SearchCompletedUserEventForm>({
  title: '',
  startDate: moment().subtract(1, 'week').toDate(),
  endDate: moment().toDate(),
  page: 1,
  playerActivityStatus: 0,
});

const openTransfer = ref(false);
function openDialog() {
  openTransfer.value = true;
}

const openConfirm = ref(false);

function closeBonusTransferModal() {
  openTransfer.value = false;
  openConfirm.value = false;
}

function closeTransferModal() {
  openTransfer.value = false;
}
function updateBonuses() {
  initBonuses(searchCompletedForm.values.value);
}

onMounted(() => {
  updateBalance();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.balance-block-group {
  margin-bottom: 24px;
  display: flex;

  @include mobile {
    margin-bottom: 20px;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 24px;

    .button {
      width: 224px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      svg {
        margin-right: 5px;
      }

      @include mobile {
        width: auto;
        flex: 1;
      }
    }

    @include mobile {
      margin-top: 24px;
      flex-direction: row;
      margin-left: 0;

      .button + .button {
        margin-left: 24px;
      }
    }
  }
}

.cards-wrapper {
  display: flex;
  flex: 1;
  position: relative;

  @include mobile {
    flex-direction: column;
  }

  .outline-card + .outline-card {
    margin-left: 24px;

    @include mobile {
      margin-left: 0;
      margin-top: 24px;
    }
  }
  .outline-card {
    display: flex;
    flex-direction: column;
    .transfer-button {
      position: absolute;
      right: 32px;
      bottom: 32px;
      width: 138px;
      display: flex;
      align-items: center;
      justify-content: center;

      @include mobile {
        position: unset;
        margin: 0 12px 12px;
        width: auto;
        flex: 1;
      }
    }
  }
  // flex-wrap: wrap;
}
.brick-card {
  box-sizing: border-box;
  width: 100%;
  padding: 32px;
  text-align: left;

  &-content + &-action {
    margin-top: 16px;
  }

  &-title {
    font-size: 28px;
    color: var(--primary-color);
  }

  @include tablet-v {
    padding: 24px;
  }

  @include mobile {
    padding: 20px 12px;

    &-content + &-action {
      margin-top: 12px;
    }

    &-title {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
</style>
