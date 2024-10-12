/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

// preparamos objetos globales
import { reactive } from 'vue'
const marcadores = reactive ([]);
app.provide('marcadores', marcadores);

// montamos la app
app.mount('#app')
