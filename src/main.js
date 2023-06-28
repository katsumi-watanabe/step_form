import '@/assets/main.css'
import "@/firebase";
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store';
// 必要なCSSのリンクタグを追加
//スタイルは不要なら削除」
import '@/assets/base.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store);
app.mount('#app')