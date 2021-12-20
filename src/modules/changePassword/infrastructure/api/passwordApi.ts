import { fetchPut } from '@/core/services/api/apiBase';

export interface ModifyPlayerPasswordDto {
  newPassword: string;
  oldPassword: string;
}

export interface ModifyWithdrawalPasswordDto {
  newPassword: string;
  oldPassword: string;
}

export async function modifyPlayerPassword(
  modifyPlayerPasswordDto: ModifyPlayerPasswordDto
): Promise<string> {
  const response = await fetchPut<string>(
    '/official/v1/player/password',
    modifyPlayerPasswordDto
  );

  return response;
}

export async function modifyWithdrawalPassword(
  modifyWithdrawalPasswordDto: ModifyWithdrawalPasswordDto
): Promise<string> {
  const response = await fetchPut<string>(
    '/official/v1/player/withdrawal-password',
    modifyWithdrawalPasswordDto
  );

  return response;
}
