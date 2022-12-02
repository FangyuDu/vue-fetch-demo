import { createApp } from 'vue'
import './style/index.less'
import App from './App.vue'
import router from './router'

const Sys = createApp(App)
Sys.use(router)
Sys.mount('#app')
