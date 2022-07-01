import { BankOption } from '@/modules/bank/domain/bank.model';
import { fetchGet } from '@/core/services/api/apiBase';

export function getBankOptions(): Promise<BankOption[]> {
  return fetchGet('/finance/v1/bank/options');
}
