import { defineStore } from 'pinia';
import { AnnouncementType } from '../../domain/announcementType';
import {
  Announcement,
  PlayerMessage,
  GetPlayerMessageDto,
} from '@/modules/theHeader/domain/noticePop';
import { getPlayerMessage } from '../api/noticePopApi';

interface PlayerMessageStoreState {
  data: Announcement[];
  playerMessageDto: GetPlayerMessageDto;
}

const usePlayerMessageStore = defineStore('PlayerMessage', {
  state: (): PlayerMessageStoreState => ({
    data: [],
    playerMessageDto: { page: 0, size: 20 },
  }),
  actions: {
    setPlayerMessage(message: PlayerMessage) {
      const { createdAt, ...arg } = message;
      this.data.push({
        ...arg,
        startTime: createdAt,
        type: AnnouncementType.PLAYER_MESSAGE,
      });
    },
    async updatePlayerMessage() {
      this.data = await getPlayerMessage(this.playerMessageDto);
    },
  },
});

export default usePlayerMessageStore;
