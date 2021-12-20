import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

const pinia = createPinia();

createApp(App)
  .use(i18n)
  .use(pinia)
  .use(router)
  .use(PrimeVue, {
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    },
  })
  .mount('#app');
