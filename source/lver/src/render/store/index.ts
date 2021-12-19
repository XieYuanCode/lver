import { InjectionKey } from "vue"
import { createStore, useStore as baseUseStore, Store } from "vuex"
import { IState } from "./type"
import appearance from "./appearance"
import editorView from "./editorView"
import user from "./user"
import logView from "./log"
import shortcut from "./shortcut"

const key: InjectionKey<Store<IState>> = Symbol()

const store = createStore<IState>({
  modules: {
    appearance,
    editorView,
    logView,
    user,
    shortcut
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