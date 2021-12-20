import { CurrencyOption } from '@/modules/currency/domain/currencyOptions';
import { fetchGet } from '../../../../core/services/api/apiBase';

export default async function getCurrencyOptions(): Promise<CurrencyOption[]> {
  const response = await fetchGet<CurrencyOption[]>(
    '/official/v1/currency/options'
  );
  return response;
}
