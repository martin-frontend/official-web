import { AnnouncementType } from './announcementType';
import { Pageable } from '@/core/data/common/domain/pagination';

export interface Announcement {
  content: string;
  id: number;
  startTime: number;
  title: string;
  type: AnnouncementType;
  excludeFromCount: boolean;
  readAt: number | null;
}

export interface PlayerMessage extends Omit<Announcement, 'startTime'> {
  createdAt: number;
}

export type GetPlayerMessageDto = Pageable;
