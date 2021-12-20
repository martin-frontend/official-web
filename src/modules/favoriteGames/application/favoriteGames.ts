import { ref } from 'vue';
import { Game } from '@/modules/game/domain/game.model';
import { getPageFavoriteGames } from '../infrastructure/favoriteGamesApi';

export const favoriteGames = ref<Game[]>([]);

export async function updateFavoriteGames() {
  const query = { page: 0, size: 20 };
  const { content } = await getPageFavoriteGames(query);
  favoriteGames.value = content;
}
