import { defineStore } from 'pinia';

// if auth is not checked, then value of isAuthenticated is null
interface VisitorIdStore {
  visitorId: string;
}

const useVisitorIdStore = defineStore('visitorId', {
  state(): VisitorIdStore {
    return {
      visitorId: '',
    };
  },
  actions: {
    setVisitorId(id: string) {
      this.visitorId = id;
    },
  },
});

export default useVisitorIdStore;
