import { defineStore } from 'pinia';
import { CurrencyOption } from '@/modules/currency/domain/currencyOptions';
import getCurrencyOptions from '@/modules/currency/application/getCurrencyOptions';

interface CurrencyStoreState {
  currencyOptions: CurrencyOption[];
}

const useCurrencyStore = defineStore('currency', {
  state(): CurrencyStoreState {
    return { currencyOptions: [] };
  },
  actions: {
    setCurrencyOptions(currencyOptions: CurrencyOption[]) {
      this.currencyOptions = currencyOptions;
    },
    async updateCurrencyOptionsIfEmpty() {
      if (this.currencyOptions.length === 0) {
        const currencyOptions: CurrencyOption[] = await getCurrencyOptions();

        this.setCurrencyOptions(currencyOptions);
      }
    },
  },
});

export default useCurrencyStore;
