<template>
  <Container>
    <section>
      <div class="heading">
        <h2 class="heading__title">{{ 'Buttons' }}</h2>
      </div>
      <div class="title">{{ 'Color' }}</div>
      <div class="buttons">
        <div class="buttons__item">
          <Button>{{ 'Primary Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button color="success">{{ 'Success Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button disabled>{{ 'Disabled Button' }}</Button>
        </div>
      </div>
      <!-- Size -->
      <div class="title">{{ 'Size' }}</div>
      <div class="buttons">
        <div class="buttons__item">
          <Button size="tiny">{{ 'Tiny Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button size="small">{{ 'Small Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button size="medium">{{ 'Medium Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button size="large">{{ 'Large Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button size="huge">{{ 'Huge Button' }}</Button>
        </div>
      </div>
      <!-- Variant -->
      <div class="title">{{ 'Variant' }}</div>
      <div class="buttons">
        <div class="buttons__item">
          <Button variant="outlined">{{ 'Outlined Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button variant="darken-outlined">
            {{ 'Darken Outlined Button' }}
          </Button>
        </div>
        <div class="buttons__item">
          <Button variant="rounded" size="huge">{{ 'Rounded Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button variant="rounded" size="tiny">{{ 'Rounded Button' }}</Button>
        </div>
        <div class="buttons__item">
          <Button variant="block" size="huge">{{ 'Block Button' }}</Button>
        </div>
      </div>
    </section>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/layout/Container.vue';
import Button from '@/components/Button.vue';
</script>

<style lang="scss" scoped>
.title {
  margin: 16px 0;
  font-weight: 500;
  font-size: 20px;
}

.buttons {
  &__item {
    margin: 4px;
  }
}
</style>
