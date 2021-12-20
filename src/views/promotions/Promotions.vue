<template>
  <Container>
    <h1 class="page-title">{{ 'Promotions' }}</h1>
    <div class="page-subtitle">
      {{ 'Sweet offers for you' }}
    </div>
    <div class="promotions-wrapper">
      <!-- <div
        v-for="(
          { id, imageUrl, title, subtitle, description }, index
        ) of promotionsStore.promotions"
        :key="id"
        class="promotion"
        :style="{
          'background-image': 'url(' + `${imagePath}${imageUrl}` + ')',
        }"
        @click="openDialog(index)"
      > -->
      <div
        v-for="(
          {
            id,
            imageUrl,
            tabletImageUrl,
            mobileImageUrl,
            title,
            subtitle,
            description,
          },
          index
        ) of promotionsStore.promotions"
        :key="id"
        class="promotion"
      >
        <div class="promotion-img">
          <picture>
            <source
              :srcset="`${imagePath}${imageUrl}`"
              media="(min-width: 1023px)"
            />
            <source
              :srcset="`${imagePath}${tabletImageUrl}`"
              media="(min-width: 767px)"
            />
            <source
              :srcset="`${imagePath}${mobileImageUrl}`"
              media="(min-width: 359px)"
            />
            <img :src="`${imagePath}${imageUrl}`" />
          </picture>
        </div>
        <div class="promotion-top">
          <p class="promotion-subtitle">
            {{ subtitle }}
          </p>
          <p class="promotion-title">
            {{ title }}
          </p>
        </div>
        <div class="promotion-footer">
          <span class="promotion-description">
            {{ description }}
          </span>
          <div class="promotion-action">
            <Button variant="outlined" size="spare" @click="openDialog(index)">
              {{ t('common.read_more') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Container>
  <PromotionDialog
    v-model:visible="displayModal"
    :promotion-event="promotion"
    @close="close"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  updatePromotions,
  openPromotionDialog,
} from '@/modules/promotions/application/promotions';
import usePromotionsStore from '@/modules/promotions/infrastructure/store/promotionsStore';
import Container from '@/layout/Container.vue';
import Button from '@/components/Button.vue';
import PromotionDialog from '@/modules/promotions/ui/PromotionDialog.vue';

const { t } = useI18n();
const displayModal = ref(false);
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;

const promotionsStore = usePromotionsStore();

const promotion = computed(() =>
  promotionsStore.openedPromotionIndex !== null
    ? promotionsStore.promotions[promotionsStore.openedPromotionIndex]
    : null
);

function openDialog(index: number) {
  displayModal.value = true;
  openPromotionDialog(index);
}

function close() {
  displayModal.value = false;
}

onMounted(() => {
  updatePromotions();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.promotions-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  margin-top: 24px;

  @include mobile {
    display: flex;
    flex-direction: column;
    grid-template-columns: none;
    grid-gap: 0;
  }
}
.promotion {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 360px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: var(--secondary-variants-color);
  overflow: hidden;

  @include tablet-v {
    height: 356px;
  }

  @include mobile {
    height: 192px;
    & + & {
      margin-top: 12px;
    }
  }
}

.promotion-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.promotion-top {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  padding-bottom: 30px;
  background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%);
  color: var(--primary-color);

  @include mobile {
    padding: 8px 12px;
    padding-bottom: 15px;
  }
}
.promotion-subtitle {
  overflow: hidden;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include mobile {
    font-size: 12px;
    line-height: 16px;
  }
}
.promotion-title {
  overflow: hidden;
  color: var(--text-primary);
  font-size: 24px;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.promotion-subtitle + .promotion-title {
  margin-top: 6px;
}
.promotion-description {
  display: -webkit-box;
  overflow: hidden;
  color: var(--primary-color);
  max-width: calc(100% - 120px);
  font-size: 14px;
  line-height: 18px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @include mobile {
    font-size: 12px;
    line-height: 16px;
  }
}
.promotion-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 56px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);

  @include mobile {
    height: 40px;
    padding: 6px 12px;
  }
}
</style>
