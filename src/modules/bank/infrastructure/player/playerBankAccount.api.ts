import {
  CreatePlayerBankAccountDto,
  PlayerBankAccount,
} from '@/modules/bank/domain/player/playerBankAccount.model';

import { fetchGet, fetchPost, fetchDelete } from '@/core/services/api/apiBase';

export async function getPlayerBankAccount(): Promise<PlayerBankAccount[]> {
  const response = await fetchGet<PlayerBankAccount[]>(
    '/finance/v1/player/bank/account'
  );
  return response;
}

export async function createPlayerBankAccount(
  body: CreatePlayerBankAccountDto
) {
  const response = await fetchPost('/finance/v1/player/bank/account', body);
  return response;
}

export async function deletePlayerBankAccount(id: number) {
  const response = await fetchDelete<PlayerBankAccount[]>(
    '/finance/v1/player/bank/account/id',
    { id }
  );
  return response;
}

export async function sendPlayerBankAccountOtp() {
  const response = await fetchPost('/finance/v1/player/bank/account/otp/send');
  return response;
}
