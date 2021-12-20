import { Router } from 'vue-router';
import useAuthStore from '@/core/auth/authStore';
import { acceptPromotion } from '../infrastructure/api/promotionsApi';
import useLoginStore from '@/modules/user/Infrastructure/store/loginStore';

export default async function handlePromotionClick(
  id: number,
  router: Router
): Promise<void> {
  const isSucceed = await acceptPromotion(id);

  const authStore = useAuthStore();
  const loginStore = useLoginStore();

  if (authStore.isAuthenticated) {
    if (isSucceed) {
      router.push('/user/bonuses');
      return;
    }
    router.push('/');
    return;
  }
  loginStore.isLoginDialogShown = true;
}
