import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import { OntoGlimpse } from 'ontoglimpse'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')


createApp(App).mount('#app')
