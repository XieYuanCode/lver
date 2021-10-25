import { InjectionKey } from "vue"
import { createStore, useStore as baseUseStore, Store } from "vuex"
import appearance from "./appearance"
import { IState } from "./type"

const key: InjectionKey<Store<IState>> = Symbol()

const store = createStore<IState>({
  modules: {
    appearance,
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

export {
  store,
  key,
}