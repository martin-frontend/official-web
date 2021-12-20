import { CurrencyOption } from '@/modules/currency/domain/currencyOptions';
import getCurrencyOptions from '@/modules/currency/infrastructure/api/currencyApi';

export default async function getCurrencyOptionsFromApi(): Promise<
  CurrencyOption[]
> {
  const options = await getCurrencyOptions();
  return options;
}
