<template>
  <div class="banner-wrap">
    <div class="banner-main" :class="`temp${bannerEvent.layout}`">
      <div class="banner-content">
        <div class="banner-title">{{ bannerEvent.title }}</div>
        <div class="banner-subtitle">
          <div class="banner-text">
            {{ bannerEvent.subtitle }}
          </div>
        </div>
        <div class="banner-actions">
          <!-- todo: 根據欲跳轉的頁面類型（game or event）設定指定路由 -->
          <a
            v-if="bannerEvent.externalLink"
            class="banner-button"
            :href="bannerEvent.externalLink"
            :target="bannerEvent.htmlTarget"
          >
            {{ t('common.load_more') }}
          </a>
          <router-link v-else to="/">
            <button class="banner-button">
              {{ t('common.load_more') }}
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="banner-bg">
      <picture>
        <source
          :srcset="`${imagePath}${bannerEvent.imageUrl}`"
          media="(min-width: 1023px)"
        />
        <source
          :srcset="`${imagePath}${bannerEvent.tabletImageUrl}`"
          media="(min-width: 767px)"
        />
        <source
          :srcset="`${imagePath}${bannerEvent.mobileImageUrl}`"
          media="(min-width: 359px)"
        />
        <img :src="`${imagePath}${bannerEvent.imageUrl}`" />
      </picture>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Banner } from '@/modules/cms/domain/banner/banner';

export interface BannerLayoutProps {
  bannerEvent: Banner;
}

const { t } = useI18n();
const imagePath = `${process.env.VUE_APP_IMAGE_DOMAIN}/file?path=`;
defineProps<BannerLayoutProps>();
</script>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.banner-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .banner-main {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 80px 120px;
  }

  .tempA {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    .banner-title,
    .banner-subtitle,
    .banner-actions {
      width: 1200px;
    }
  }
  .tempB,
  .tempC {
    .banner-title,
    .banner-subtitle,
    .banner-actions {
      width: 800px;
    }
  }

  .tempB {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
  }
  .tempC {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }

  .banner-bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .banner-title {
    word-wrap: break-word;
    font-size: 64px;
    line-height: 75px;
    font-weight: var(--text-bold);
  }

  .banner-subtitle {
    word-wrap: break-word;
    margin-top: 40px;
    font-size: 32px;
    line-height: 37px;
  }

  .banner-actions {
    margin-top: 56px;
  }

  .banner-button {
    box-sizing: border-box;
    display: inline-block;
    width: 234px;
    height: 56px;
    padding: 16px;
    font-size: 22px;
    line-height: 24px;
    font-weight: var(--text-bold);
    color: var(--text-primary);
    text-align: center;
    background: transparent;
    border-radius: 100px;
    border: 1px solid var(--text-primary);
  }

  @include desktop {
    .banner-main {
      padding: 80px;
    }
  }

  @include tablet-h {
    height: 768px;

    .banner-main {
      padding: 80px 64px;
    }
    .tempA {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 800px;
      }
    }
    .tempB,
    .tempC {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 500px;
      }
    }
    .banner-title {
      font-size: 48px;
      line-height: 56px;
    }
    .banner-subtitle {
      margin-top: 32px;
      font-size: 22px;
      line-height: 24px;
    }
    .banner-actions {
      margin-top: 32px;
    }
  }

  @include tablet-v {
    height: 576px;
    .banner-main {
      padding: 80px 48px;
    }
    .tempA {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 688px;
      }
    }
    .tempB,
    .tempC {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 320px;
      }
    }
    .banner-title {
      font-size: 36px;
      line-height: 42px;
    }
    .banner-subtitle {
      margin-top: 16px;
      font-size: 16px;
      line-height: 20px;
    }
    .banner-actions {
      margin-top: 32px;
    }
    .banner-button {
      width: 152px;
      height: 40px;
      padding: 10px;
      font-size: 16px;
      line-height: 20px;
    }
  }

  @include mobile {
    height: 320px;
    .banner-main {
      padding: 32px 24px;
    }
    .tempA {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 280px;
      }
    }
    .tempB,
    .tempC {
      .banner-title,
      .banner-subtitle,
      .banner-actions {
        width: 160px;
      }
    }
    .tempB {
      justify-content: flex-end;
      align-items: flex-end;
    }
    .tempC {
      align-items: flex-end;
    }
    .banner-title {
      font-size: 18px;
      line-height: 20px;
    }
    .banner-subtitle {
      margin-top: 8px;
      font-size: 12px;
      line-height: 16px;
    }
    .banner-actions {
      margin-top: 16px;
    }
    .banner-button {
      width: 118px;
      height: 40px;
      padding: 12px;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>

<i18n locale="en" src="@/core/locales/en.json"></i18n>
