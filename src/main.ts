import { createApp } from 'vue'
import './style.css'
import * as bootstrap from 'bootstrap';
import App from './App.vue'
import router from './router'

(window as any).bootstrap = bootstrap;

const app = createApp(App)
app.use(router)
app.mount('#app')
