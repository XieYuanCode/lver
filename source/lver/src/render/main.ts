import { createApp } from 'vue'
import App from './App.vue'

import naive from "naive-ui"
import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'
import i18n from "./locale";

import 'vfonts/FiraCode.css'
import "./style/init.css"

import { store, key } from "./store"

const app = createApp(App)

app.use(naive)
app.use(store, key)
app.use(contextmenu)
app.use(i18n)

app.mount("#app")
