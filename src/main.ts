import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Import all regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Import all brand icons
const app = createApp(App)

library.add(fas, far, fab);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)

app.mount('#app')
