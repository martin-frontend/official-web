<template>
  <Container>
    <div class="bonus-block-group">
      <Heading
        :title="t('payment.favorite_games.title')"
        :define="t('payment.favorite_games.define')"
      />
      <GamesGroup
        :game-types="gameTypes"
        :is-favorite-icon-shown="true"
        @remove-favorite-callback="updateFavoriteGames"
      />
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Container from '@/layout/Container.vue';
import GamesGroup from '@/components/GamesGroup.vue';
import Heading from '@/components/Heading.vue';
import {
  favoriteGames,
  updateFavoriteGames,
} from '@/modules/favoriteGames/application/favoriteGames';

// use i18n
const { t } = useI18n();

const gameTypes = computed(() => [
  {
    id: 0,
    name: '',
    games: favoriteGames.value,
  },
]);

onMounted(() => {
  updateFavoriteGames();
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
</style>
