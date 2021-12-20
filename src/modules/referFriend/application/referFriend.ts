import { getReferralDetails } from '../infrastructure/api/referFriendApi';
import useReferFriendStore from '../infrastructure/store/referFriendStore';

export async function updateReferralDetails() {
  const res = await getReferralDetails();
  const referFriendStore = useReferFriendStore();
  referFriendStore.update(res);
}
