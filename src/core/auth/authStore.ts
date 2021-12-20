import { defineStore } from 'pinia';

// if auth is not checked, then value of isAuthenticated is null
interface AuthStoreState {
  isAuthenticated: null | boolean;
}

const useAuthStore = defineStore('auth', {
  state(): AuthStoreState {
    return {
      isAuthenticated: null,
    };
  },
  actions: {
    setAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
  },
});

export default useAuthStore;
