import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"
import Welcome from "../views/Welcome.vue"
import { electronStore } from "../utils/electronStore"

const isFirstLoad = electronStore.store.get('isFirstLoad', true)

const routes = [
  {
    path: '/', component: isFirstLoad ? Welcome : Home
  },
  {
    path: '/home', component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export {
  router
}