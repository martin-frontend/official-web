<!-- Todo：brick-card 可拆為元件 -->
<template>
  <Container>
    <Heading
      :title="t('payment.balance.title')"
      :define="t('payment.balance.define')"
    />
    <div class="balance-block-group">
      <ul class="cards-wrapper">
        <li class="cards-wrapper-item cards-wrapper-item-full">
          <OutlineCard>
            <div class="brick-card">
              <div class="brick-card-content">
                <div class="brick-card-title">
                  {{ t('payment.balance.entrances.balance.title') }}
                </div>
              </div>
              <div class="brick-card-action">
                <Button
                  size="huge"
                  variant="rounded"
                  @click="$router.push('/user/payment-transactions')"
                >
                  {{ amountString }}
                </Button>
              </div>
            </div>
          </OutlineCard>
        </li>
        <li class="cards-wrapper-item">
          <OutlineCard>
            <div class="brick-card">
              <div class="brick-card-content">
                <div class="brick-card-title">
                  {{ t('payment.balance.entrances.withdraw_limit.title') }}
                </div>
              </div>
              <div class="brick-card-action">
                <Button
                  size="huge"
                  variant="rounded"
                  @click="$router.push('/user/balance-withdraw')"
                >
                  {{ withdrawalLimitString }}
                </Button>
              </div>
            </div>
          </OutlineCard>
        </li>
        <li class="cards-wrapper-item">
          <OutlineCard>
            <div class="brick-card">
              <div class="brick-card-content">
                <div class="brick-card-title">
                  {{
                    t('payment.balance.entrances.withdrawable_balance.title')
                  }}
                </div>
              </div>
              <div class="brick-card-action">
                <Button size="huge" variant="rounded">
                  {{ withdrawableBalanceString }}
                </Button>
              </div>
            </div>
          </OutlineCard>
        </li>
      </ul>
    </div>
    <Heading :title="t('payment.rewards_bonus.title')" />
    <div class="balance-block-group">
      <ul class="cards-wrapper">
        <li class="cards-wrapper-item">
          <OutlineCard>
            <div class="brick-card">
              <div class="brick-card-content">
                <div class="brick-card-title">
                  {{ t('payment.rewards_bonus.entrances.my_rewards.title') }}
                </div>
              </div>
              <div class="brick-card-action">
                <Button
                  size="huge"
                  variant="rounded"
                  @click="$router.push('/user/balance-rewards')"
                >
                  {{ rewardsString }}
                </Button>
              </div>
            </div>
          </OutlineCard>
        </li>
        <li class="cards-wrapper-item">
          <OutlineCard>
            <div class="brick-card">
              <div class="brick-card-content">
                <div class="brick-card-title">
                  {{ t('payment.rewards_bonus.entrances.my_bonus.title') }}
                </div>
              </div>
              <div class="brick-card-action">
                <router-link to="/user/bonuses-history">
                  <Button size="huge" variant="rounded">
                    {{ bonusString }}
                  </Button>
                </router-link>
              </div>
            </div>
          </OutlineCard>
        </li>
      </ul>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/Button.vue';
import { toDollarsAmount } from '@/libs/dollars';
import {
  getWithdrawableBalanceValue,
  updateBalance,
} from '@/modules/userBalance/application/balance';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';

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

const rewardsString = computed(() => toDollarsAmount(balanceStore.reward));

const bonusString = computed(() => toDollarsAmount(balanceStore.bonus));

onMounted(() => {
  updateBalance();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.balance-block-group {
  margin-bottom: 32px;

  @include mobile {
    margin-bottom: 20px;
  }
}
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;

  &-item {
    width: 50%;
    padding: 10px;

    &-full {
      width: 100%;
    }
  }

  @include tablet-h {
    margin: -8px;
    &-item {
      padding: 8px;
    }
  }

  @include mobile {
    margin: 0;
    &-item {
      width: 100%;
      padding: 0;

      & + & {
        margin-top: 10px;
      }
    }
  }
}
.brick-card {
  box-sizing: border-box;
  width: 100%;
  padding: 24px 40px;
  text-align: center;

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
