<template>
  <div class="banner-carousel">
    <carousel :autoplay="5000" :wrap-around="true">
      <slide v-for="(banner, index) of bannerInfos" :key="index">
        <div class="carousel__item">
          <BannerLayout :banner-event="banner" />
        </div>
      </slide>
      <template #addons>
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import getApiBanners from '@/modules/cms/infrastructure/gameType/api/bannerApi';
import { Banner } from '@/modules/cms/domain/banner/banner';
import BannerLayout from './BannerLayout.vue';

const bannerInfos = ref<Banner[]>([]);

onMounted(() => {
  getApiBanners('HOME').then((data) => {
    bannerInfos.value = data;
  });
});
</script>

<style lang="scss">
@import '@/styles/breakpoints.scss';

.carousel {
  position: relative !important;
  .carousel__viewport {
    width: 100%;
    max-height: 1080px !important;
  }
  .carousel__item {
    width: 100%;
    height: calc(100vh - 56px);
  }
  .carousel__pagination {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%);
  }
  .carousel__pagination-button {
    width: 16px !important;
    height: 16px !important;
    margin: 0 8px !important;
    border-radius: 50% !important;
    background: #505050 !important;

    &--active {
      background-color: var(--text-primary) !important;
    }
  }

  @include tablet-h {
    height: 768px;
  }
  @include tablet-v {
    height: 576px;
  }
  @include mobile {
    height: 320px;
    .carousel__pagination {
      bottom: 10px;
    }
    .carousel__pagination-button {
      width: 10px !important;
      height: 10px !important;
      margin: 0 4px !important;
    }
  }
}
</style>
