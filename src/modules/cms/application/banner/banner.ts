import { PageType } from '@/modules/cms/domain/pageType';
import useBannerStore from '@/modules/cms/infrastructure/gameType/store/bannerStore';
import getApiBanners from '../../infrastructure/gameType/api/bannerApi';

export default async function updateBanners(page: PageType): Promise<void> {
  const bannerStore = useBannerStore();
  if (bannerStore[page].length) return;

  const banners = await getApiBanners(page);
  bannerStore.setBanners(page, banners);
}
