import { createApp } from 'vue'
import './index.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import App from './App.vue'
import router from './router'

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
