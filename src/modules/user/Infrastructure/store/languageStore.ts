/* eslint-disable dot-notation */
import { defineStore } from 'pinia';
import {
  getLocalLanguage,
  setLocalLanguage,
} from '@/core/services/localStorage/language';

interface LanguageStoreState {
  lang: string;
}

const useLanguageStore = defineStore('language', {
  state: (): LanguageStoreState => ({
    lang: '',
  }),
  actions: {
    setLanguage(lang: string) {
      this.lang = lang;
      setLocalLanguage(lang);
    },

    initLanguage() {
      const localLang = getLocalLanguage();
      if (localLang) {
        this.lang = localLang;
        return;
      }

      this.lang = window.navigator.language;
      setLocalLanguage(this.lang);
    },
  },
});

export default useLanguageStore;
