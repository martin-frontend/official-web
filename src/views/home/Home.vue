<template>
  <BannerCarousel :banners="banners" />
  <Container>
    <GamesGroup :game-types="gameTypes">
      <template #title="{ titleName }">
        <h2 class="group-wrap-title">{{ titleName }}</h2>
      </template>

      <template #bottom="{ index }">
        <div class="group-wrap-bottom">
          <Button size="large" variant="rounded" @click="handleLoadMore(index)">
            {{ t('common.load_more') }}
          </Button>
        </div>
      </template>
    </GamesGroup>
  </Container>
  <VerifyEmailOkDialog v-model:visible="emailVerifying" @close="close" />
  <!-- v-model:visible="isShown"  -->
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import updateBanners from '@/modules/cms/application/banner/banner';
import useBannerStore from '@/modules/cms/infrastructure/gameType/store/bannerStore';
import useGameTypeStore from '@/modules/cms/infrastructure/gameType/store/gameTypeStore';
import BannerCarousel from '@/components/BannerCarousel.vue';
import Container from '@/layout/Container.vue';
import { verifyEmail } from '@/modules/user/Infrastructure/api/verifyEmail.api';
import VerifyEmailOkDialog from './VerifyEmailOkDialog.vue';
import GamesGroup from '@/components/GamesGroup.vue';
import Button from '@/components/Button.vue';
import {
  initGameTypes,
  updateGameType,
} from '@/modules/cms/application/gameType/gameType';
import { PageType } from '@/modules/cms/domain/pageType';
import { checkUserStatus } from '@/modules/user/application/user';

const { t } = useI18n();
const curPageType = ref<PageType>('HOME');
const gameTypeStore = useGameTypeStore();
const gameTypes = computed(() => gameTypeStore[curPageType.value]);

const bannerStore = useBannerStore();
const banners = computed(() => bannerStore[curPageType.value]);

const route = useRoute();
const emailVerifying = ref(false);
async function checkedMailVerification() {
  if (route.path.includes('email-verification')) {
    if (await checkUserStatus()) {
      const token = route.query.token as string;
      verifyEmail(token).then(() => {
        emailVerifying.value = true;
      });
    }
  }
}
function close() {
  emailVerifying.value = false;
}

function handleLoadMore(gameTypesIndex: number) {
  updateGameType(curPageType.value, gameTypesIndex);
}

onMounted(() => {
  checkUserStatus();
  initGameTypes(curPageType.value);
  updateBanners(curPageType.value);
  checkedMailVerification();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.group-wrap-title {
  color: var(--primary-color);
  font-weight: var(--text-bold);
  font-size: 36px;
  line-height: 42px;
  margin-bottom: 32px;

  @include mobile {
    font-size: 22px;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
.group-wrap-bottom {
  width: 100%;
  max-width: 234px;
  margin: 60px auto 0;
  text-align: center;

  @include tablet-v {
    max-width: 201px;
    margin-top: 40px;
  }

  @include mobile {
    max-width: 91px;
    margin-top: 10px;
  }
}
</style>
