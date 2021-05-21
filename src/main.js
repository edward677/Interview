import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import element from 'element-plus'

createApp(App).use(router).use(element, { locale }).mount('#app')
