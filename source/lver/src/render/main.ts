import { createApp } from 'vue'
import App from './App.vue'

import naive from "naive-ui"

import 'vfonts/FiraCode.css'
import "./style/init.css"

const app = createApp(App)

app.use(naive)

app.mount("#app")
