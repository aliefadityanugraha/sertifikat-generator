import { createApp } from 'vue'
import './index.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import App from './App.vue'
import router from './router'

/**
 * Main application entry point.
 * Initializes the Vue application, integrates Vue Router,
 * and mounts the root component to the DOM.
 * Also configures the AOS (Animate On Scroll) library once the router is ready.
 */
const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
  AOS.init({
    once: true,
    offset: 50,
    duration: 800,
    easing: 'ease-out-cubic',
  })
})
