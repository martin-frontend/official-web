import { BankOption } from '@/modules/bank/domain/bank.model';

export interface PlayerBankAccount {
  bankAccount: string;
  bankAccountName: string;
  bankBranchCode: string;
  bankBranchName: string;
  bankCityCode: string;
  bankCityName: string;
  bankCode: string;
  bankProvinceCode: string;
  bankProvinceName: string;
  createAt: number;
  id: number;
  playerId: number;
}

export interface PlayerBankAccountAggregateRoot extends PlayerBankAccount {
  bank?: BankOption;
}

export interface CreatePlayerBankAccountDto {
  otp: string;
  props: {
    bankAccount: string;
    bankBranchCode?: string;
    bankBranchName?: string;
    bankCityCode?: string;
    bankCityName?: string;
    bankCode: string;
    bankProvinceCode?: string;
    bankProvinceName?: string;
  };
}
