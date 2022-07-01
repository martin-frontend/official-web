import { AnnouncementType } from '../../domain/announcementType';
import {
  GetPlayerMessageDto,
  PlayerMessage,
  Announcement,
} from '../../domain/noticePop';
import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import { Page } from '@/core/data/common/domain/pagination';

export function getAnnouncement(): Promise<Announcement[]> {
  return fetchGet('/official/v1/announcement');
}

export async function markAnnouncementAsRead(id: number) {
  const result = await fetchPost(
    '/official/v1/announcement/mark-as-read',
    undefined,
    {
      id,
    }
  );
  return result;
}

export async function announcementExcludeFromCount(dto: number[]) {
  const result = await fetchPost(
    `/official/v1/announcement/exclude-from-count`,
    undefined,
    {
      id: dto,
    }
  );
  return result;
}

export async function getPlayerMessage(
  dto: GetPlayerMessageDto
): Promise<Announcement[]> {
  const result = await fetchGet<Page<PlayerMessage>>(
    `/official/v1/player/message/page`,
    dto
  );
  return result.content.map((item) => {
    const { createdAt, ...arg } = item;
    return {
      ...arg,
      startTime: createdAt,
      type: AnnouncementType.PLAYER_MESSAGE,
    };
  });
}

export async function playerMessageExcludeFromCount(dto: number[]) {
  const result = await fetchPost(
    `/official/v1/player/message/exclude-from-count`,
    undefined,
    {
      id: dto,
    }
  );
  return result;
}

export async function markPlayerMessageAsRead(id: number) {
  const result = await fetchPost(
    `/official/v1/player/message/mark-as-read`,
    undefined,
    {
      id,
    }
  );
  return result;
}
