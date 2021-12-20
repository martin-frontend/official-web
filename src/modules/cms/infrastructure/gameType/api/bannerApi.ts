import { PageType } from '@/modules/cms/domain/pageType';
import { fetchGet } from '@/core/services/api/apiBase';
import { Banner } from '@/modules/cms/domain/banner/banner';

export default async function getApiBanners(page: PageType): Promise<Banner[]> {
  const response: Banner[] | Error = await fetchGet<Banner[]>(
    '/cms/v1/banner',
    {
      page,
    }
  );

  return response;
}
