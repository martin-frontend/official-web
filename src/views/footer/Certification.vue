<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__block">
            <div class="termsCard__title">{{ 'Certification' }}</div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <img src="@/assets/attachments/0001.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0002.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0003.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0004.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0005.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0006.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0007.jpg" />
                </li>
                <li class="termsList__item">
                  <img src="@/assets/attachments/0008.jpg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </OutlineCard>
    </section>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/layout/Container.vue';
import OutlineCard from '@/components/OutlineCard.vue';
</script>

<style lang="scss" scoped>
.termsCard {
  box-sizing: border-box;
  max-width: 1280px;
  padding: 32px 40px;
  line-height: 20px;
  background-color: #323232;

  &__title {
    font-size: 26px;
    line-height: 26px;
    color: var(--primary-color);
  }

  &__content {
    width: 100%;
    margin-top: 32px;
  }
}
.termsList {
  width: 100%;
  color: #9e9e9e;
  &__item {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
