<template>
  <Container>
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.my_rewards.title')"
        :define="t('payment.my_rewards.define')"
      />
      <OutlineCard>
        <div class="bulletin">
          <div class="bulletin-item">
            {{
              `${t('payment.my_rewards.rewards')}：${balanceStore.reward}
              ${t('common.points')}`
            }}
          </div>
          <div class="transferButton">
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
          </div>
        </div>
      </OutlineCard>
    </div>
    <RewardTransferModal
      v-model:visible="openTransfer"
      :transfer-title="transferTitle"
      :apply-transfer-point="applyTransferPoint"
      @close="close"
      @closeTransferModal="closeTransferModal"
      @update:myRewardAmount="updateRewards"
    />

    <!-- 成就任務 -->
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.my_rewards.achievement_quests.title')"
        :define="t('payment.my_rewards.achievement_quests.define')"
      />
      <div>
        <template
          v-for="(achievemet, index) of basicAchievement"
          :key="achievemet.id"
        >
          <OutlineCard class="table-out-line-card">
            <div class="tabulation">
              <div class="tabulation__head">
                <div class="tabulation__img">
                  <img
                    :src="setImagePath(achievemet)"
                    :alt="achievemet.title"
                  />
                </div>
                <!-- <span>{{ achievemet.rewardAmount }}</span> -->
              </div>
              <div class="tabulation__content">
                <p class="tabulation__basic__title">
                  {{ achievemet.title }}
                  <a v-if="!isMobile" class="tabulation__coin">
                    <img src="@/assets/icons/coin.png" alt="" />
                    <Text color="warning" :size="isMobile ? 'tiny' : 'defult'">
                      {{ `×${achievemet.rewardAmount}` }}
                    </Text>
                  </a>
                </p>

                <a v-if="isMobile" class="tabulation__coin">
                  <img src="@/assets/icons/coin.png" alt="" />
                  <Text color="warning" :size="isMobile ? 'tiny' : 'defult'">
                    {{ `×${achievemet.rewardAmount}` }}
                  </Text>
                </a>
                <!-- <p class="tabulation__define">{{ 'Lorem, ipsum dolor.' }}</p> -->
                <div class="tabulation__progressbar">
                  <div class="progressbar">
                    <div
                      class="progressbar__success basic"
                      :style="{
                        width: percentage(
                          achievemet.currentAmount,
                          achievemet.targetAmount
                        ),
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="tabulation__block">
                <div class="tabulation__button">
                  <Button
                    component="button"
                    :color="
                      !achievemet.completed
                        ? 'success'
                        : achievemet.rewardReceived
                        ? 'disabled'
                        : 'primary'
                    "
                    size="my-rewards"
                    @click="
                      handleReceiveRewardsOrToDo(
                        achievemet,
                        index,
                        AchievementType.Basic
                      )
                    "
                  >
                    {{
                      !achievemet.completed
                        ? t('common.todo')
                        : achievemet.rewardReceived
                        ? t('common.complete')
                        : t('common.receive')
                    }}
                  </Button>
                </div>
              </div>
            </div>
          </OutlineCard>
        </template>
      </div>
    </div>

    <!-- 累計成就任務 -->
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.my_rewards.grand_Achievement_quests.title')"
        :define="t('payment.my_rewards.grand_Achievement_quests.define')"
      />
      <div class="bonus-block-button">
        <div class="bonus-block-button-warp">
          <template
            v-for="{ name, type } of achievementButtonOption"
            :key="name"
          >
            <Button
              component="button"
              color="primary"
              size="small"
              variant="darken-rounded"
              :actived="type === curAchievementType"
              @click="chaneAchievementType(type)"
            >
              {{ name }}
            </Button>
          </template>
        </div>
      </div>
      <template
        v-for="(achievemet, index) of grandAchievement"
        :key="achievemet.id"
      >
        <OutlineCard
          v-if="filterGrandAchievement(achievemet.target)"
          class="table-out-line-card"
        >
          <div class="tabulation">
            <div class="tabulation__head">
              <div class="tabulation__img">
                <img
                  :src="`${imagePath}${achievemet.imageUrl}`"
                  :alt="achievemet.title"
                />
              </div>
            </div>
            <div class="tabulation__content">
              <p class="tabulation__grand__title">
                {{ achievemet.title }}
                <a v-if="!isMobile" class="tabulation__coin">
                  <img src="@/assets/icons/coin.png" alt="" />
                  <Text color="warning" :size="isMobile ? 'tiny' : 'defult'">
                    {{ `×${achievemet.rewardAmount}` }}
                  </Text>
                </a>
              </p>

              <a v-if="isMobile" class="tabulation__coin">
                <img src="@/assets/icons/coin.png" alt="" />
                <Text color="warning" :size="isMobile ? 'tiny' : 'defult'">
                  {{ `×${achievemet.rewardAmount}` }}
                </Text>
              </a>

              <p class="tabulation__define">
                {{ achievemet.description }}
                {{ `(${achievemet.currentAmount}/${achievemet.targetAmount})` }}
              </p>
              <div class="tabulation__progressbar">
                <div class="progressbar">
                  <div
                    :style="{
                      width: percentage(
                        achievemet.currentAmount,
                        achievemet.targetAmount
                      ),
                    }"
                    class="progressbar__success grand"
                  />
                </div>
              </div>
            </div>
            <div class="tabulation__block">
              <div class="tabulation__button">
                <Button
                  component="button"
                  :color="
                    !achievemet.completed
                      ? 'success'
                      : achievemet.rewardReceived
                      ? 'disabled'
                      : 'primary'
                  "
                  size="my-rewards"
                  @click="
                    handleReceiveRewardsOrToDo(
                      achievemet,
                      index,
                      curAchievementType
                    )
                  "
                >
                  {{
                    !achievemet.completed
                      ? t('common.todo')
                      : achievemet.rewardReceived
                      ? t('common.complete')
                      : t('common.receive')
                  }}
                </Button>
              </div>
            </div>
          </div>
        </OutlineCard>
      </template>
    </div>
    <!-- <Toast
      v-show="showToast"
      position="top-center"
      :toast-title="toastTitle"
      :toast-description="toastDescription"
      :is-icon-check-circle="true"
      color="success"
      @closeToast="closeToast"
    /> -->
  </Container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import { useToast } from 'primevue/usetoast';
import Button from '@/components/Button.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconTransfer from '@/components/icons/IconTransfer.vue';
import useBalanceStore from '@/modules/userBalance/infrastructure/store/balanceStore';
import getAchievement from '@/modules/rewards/application/achievement';
// import { RewardAchievement } from '@/modules/rewards/domain/rewardAchievement';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import {
  AchievementBasicType,
  RewardAchievement,
  achievementGameType,
  achievementDepositType,
  achievementAccumulateBet,
  achievementSpecialAccumulate,
} from '@/modules/rewards/domain/rewardAchievement';
import { percentage } from '@/libs/percentage';
import { receiveRewards } from '@/modules/rewards/infrastructure/api/achievementApi';
import { updateRewards } from '@/modules/userBalance/application/balance';
import Text from '@/components/Typography.vue';
import { useDevice } from '@/core/mediaQuery/useDevice';
import { Device } from '@/core/mediaQuery/device';
import useDialogStore from '@/core/shared/dialogStore';
import RewardTransferModal from '@/modules/rewards/ui/RewardTransferModal.vue';
// import Toast from '@/components/Toast.vue';

// const showToast = ref(false);
const applyTransferPoint = ref(0);
const dialogStore = useDialogStore();
enum AchievementType {
  Basic,
  Grand,
  Game,
  Deposit,
  Accumulate_Bet,
  Special_Accumulate,
}
// const toast = useToast();
// toast.add({
//   severity: 'info',
//   summary: 'Info Message',
//   detail: 'Message Content',
//   life: 3000,
// });
// use i18n
const { t } = useI18n();

// // RWD
const device = useDevice();
const isMobile = computed(() => device.value === Device.MOBILE);
const isDesktop = computed(() => device.value === Device.DESKTOP);

const router = useRouter();
const balanceStore = useBalanceStore();

const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
const setImagePath = (achievemet: RewardAchievement): string => {
  const { imageUrl, mobileImageUrl, tabletImageUrl } = achievemet;
  let url = tabletImageUrl;
  if (isMobile.value) {
    url = mobileImageUrl;
  }
  if (isDesktop.value) {
    url = imageUrl;
  }
  return `${imagePath}${url}`;
};

const basicAchievement = ref<RewardAchievement[]>([]);
const grandAchievement = ref<RewardAchievement[]>([]);
const curAchievementType = ref<AchievementType>(AchievementType.Game);
const achievementButtonOption = [
  {
    name: t('payment.my_rewards.achievement_button.accumulate_open_games'),
    type: AchievementType.Game,
    typeOption: achievementGameType,
  },
  {
    name: t('payment.my_rewards.achievement_button.accumulate_deposit'),
    type: AchievementType.Deposit,
    typeOption: achievementDepositType,
  },
  {
    name: t('payment.my_rewards.achievement_button.accumulate_bet'),
    type: AchievementType.Accumulate_Bet,
    typeOption: achievementAccumulateBet,
  },
  {
    name: t('payment.my_rewards.achievement_button.special_accumulate'),
    type: AchievementType.Special_Accumulate,
    typeOption: achievementSpecialAccumulate,
  },
];

// Turn enum into array
const achievementBasicTypeArr = Object.values(AchievementBasicType).filter(
  (item) => typeof item === 'number'
);

const chaneAchievementType = (type: AchievementType) => {
  curAchievementType.value = type;
};

const filterGrandAchievement = (target: number) => {
  let curAchievementIndex = 0;
  achievementButtonOption.forEach(({ type }, index) => {
    if (type === curAchievementType.value) {
      curAchievementIndex = index;
    }
  });

  const { typeOption } = achievementButtonOption[curAchievementIndex];
  return typeOption.indexOf(target) !== -1;
};

const showDialog = (rewardAmount: number) => {
  dialogStore.popUp({
    title: t('payment.my_rewards.dialog.title'),
    cancelButtonText: t('payment.my_rewards.dialog.button'),
    isCancelButtonShown: true,
    isOkButtonShown: false,
    message: `${t('payment.my_rewards.dialog.message')} ${rewardAmount}`,
    isCoinShown: true,
    onCancel() {
      dialogStore.close();
    },
  });
};

// ----------------------------------獎勵轉出----------------------------------
const transferTitle = t('payment.my_rewards.transfer_modal.title');
const openTransfer = ref(false);
// const toastTitle = t('payment.my_rewards.toast.title');
// const toastDescription = t('payment.my_rewards.toast.description');
function openDialog() {
  openTransfer.value = true;
}

const openConfirm = ref(false);

function close() {
  openTransfer.value = false;
  openConfirm.value = false;
}

function closeTransferModal() {
  openTransfer.value = false;
}

// function openToast() {
//   showToast.value = true;
//   setTimeout(() => {
//     showToast.value = false;
//   }, 3000);
// }
// function closeToast() {
//   showToast.value = false;
// }

const handleReceiveRewardsOrToDo = async (
  achievement: RewardAchievement,
  index: number,
  type: AchievementType
) => {
  const { completed, id, rewardAmount, target } = achievement;
  if (!completed) {
    switch (type) {
      case AchievementType.Basic:
        if (target === AchievementBasicType.DEPOSIT) {
          router.push('/user/deposit');
          return;
        }
        if (target === AchievementBasicType.WITHDRAWAL) {
          router.push('home');
          // router.push('/user/withdrawal');
          return;
        }
        router.push('/user/personal-settings');
        break;
      case AchievementType.Game:
        router.push('home');
        break;
      case AchievementType.Deposit:
        router.push('/user/deposit');
        break;
      case AchievementType.Accumulate_Bet:
        router.push('home');
        break;
      case AchievementType.Special_Accumulate:
        router.push('home');
        break;
      default:
        break;
    }
    return;
  }

  try {
    await receiveRewards(id);

    if (type === AchievementType.Basic) {
      basicAchievement.value[index].rewardReceived = true;
    } else {
      grandAchievement.value[index].rewardReceived = true;
    }

    showDialog(rewardAmount);

    updateRewards();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  updateRewards();
  const achievements: RewardAchievement[] = await getAchievement();

  basicAchievement.value = achievements.filter(
    ({ target }) => achievementBasicTypeArr.indexOf(target) !== -1
  );

  grandAchievement.value = achievements.filter(
    ({ target }) => achievementBasicTypeArr.indexOf(target) === -1
  );

  // showDialog(balanceStore.reward);
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.rewards-wrap {
  margin: 32px 0;
}

.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}
.transfer-button {
  display: flex;
  align-items: center;
  @include mobile {
    margin-top: 24px;
  }
}
.bonus-block-button {
  display: flex;
  margin-bottom: 25px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;

  .bonus-block-button-warp {
    display: flex;
    flex-wrap: nowrap;
  }
  .button {
    margin-right: 20px;
  }
}

.bulletin {
  box-sizing: border-box;
  display: flex;
  padding: 28px 20px;
  justify-content: space-between;

  .bulletin-item {
    font-size: 22px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: var(--text-primary);
  }

  @include mobile {
    padding: 20px;
    flex-direction: column;

    .bulletin-item {
      padding: 0;
      font-size: 16px;
      line-height: 20px;
    }
  }
}

.table-out-line-card {
  overflow-x: unset;
}
.tabulation {
  display: flex;
  width: 100%;
  min-height: 100px;
  padding: 10px 0;
  line-height: 20px;
  overflow-x: auto;

  @include mobile {
    padding: 8px 0;
    min-height: 72px;
  }

  &__head {
    display: flex;
    justify-content: center;
    box-sizing: unset;
    width: 80px;
    height: 80px;
    min-width: 80px;
    padding: 0 20px;
    margin: auto 0;

    @include mobile {
      width: 56px;
      height: 56px;
      min-width: 56px;
      padding: 0 10px;
    }
  }

  &__img {
    overflow: hidden;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  &__block {
    margin: auto 0;
  }

  &__button {
    margin: auto 0;
    // width: 100px;
    padding: 0 30px;
    @include mobile {
      padding: 0 8px;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    border-left: 2px solid var(--primary-color);
    @include mobile {
      padding-left: 8px;
    }
  }

  &__basic__title,
  &__grand__title {
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    line-height: 20px;
    margin-top: 16px;
    margin-bottom: 20px;

    @include mobile {
      margin-top: 12.5px;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 4px;
    }
  }
  .tabulation__coin {
    display: inline-flex;
    height: 20px;
    margin-left: 16px;

    @include mobile {
      height: 16px;
      margin-left: 0px;
      margin-bottom: 4px;
    }
    img {
      object-fit: contain;
      // width: 100%;
      height: 100%;
      margin-right: 2px;
    }
  }

  .tabulation__grand__title {
    margin-bottom: 4px;
  }

  &__define {
    color: #bdbdbd;
    font-size: 12px;
    line-height: 16px;
    display: inline-flex;
    margin-bottom: 4px;
  }

  & + & {
    margin-top: 16px;
  }

  &-heading {
    height: 40px;
    border: none;
    background-color: transparent;
    color: var(--primary-color);
    text-align: center;
  }

  &-heading & {
    &__head {
      border: none;
    }
  }
}
.progressbar {
  margin-top: auto;
  margin-bottom: 16px;
  overflow: hidden;
  width: 100%;
  height: 8px;
  border-radius: 100px;
  background-color: #9e9e9e;
  .progressbar__success {
    width: auto;
    height: 8px;
    &.basic {
      background-color: var(--warning-color);
    }
    &.grand {
      background-color: var(--success-color);
    }
  }
}

// 點擊前往按鈕
.button-rewards {
  box-sizing: border-box;
  min-width: 100px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--sucess-color);
  color: var(--text-primary);
  line-height: 20px;
  text-align: center;

  &-disabled {
    background: #9e9e9e;
    color: #e0e0e0;
  }
}
</style>
