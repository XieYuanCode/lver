import { InjectionKey } from "vue"
import { createStore, Store } from "vuex"
import appearance from "./appearance"
import { IState } from "./type"

const key: InjectionKey<Store<IState>> = Symbol()

const store = createStore<IState>({
  modules: {
    appearance,
  }
})

export {
  store,
  key
}