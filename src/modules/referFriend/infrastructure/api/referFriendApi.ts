import { PlayerReferralDto } from '../../domain/referFriend.model';
import { fetchGet } from '@/core/services/api/apiBase';

export async function getReferralDetails(): Promise<PlayerReferralDto> {
  const res = await fetchGet<PlayerReferralDto>('/official/v1/player/referral');
  return res;
}
