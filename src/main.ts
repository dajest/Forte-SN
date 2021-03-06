import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'


createApp(App)
  .use(router)
  .use(store)
  .use(Varlet)
  .mount('#app')
