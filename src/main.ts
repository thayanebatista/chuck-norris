import { createApp } from 'vue';

import './styles/scss/main.scss';
import App from './App.vue';
import pinia from './store';

createApp(App).use(pinia).mount('#app');
