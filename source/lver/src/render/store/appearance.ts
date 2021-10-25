import { darkTheme } from "naive-ui"
import i18n from "../locale";

export interface IAppearanceState {
  theme: any,
  logSkeleton: boolean,
  logRuleSkeleton: boolean,
  language: string
}

const appearance = {
  state() {
    return {
      theme: null,
      logSkeleton: true,
      logRuleSkeleton: true,
      language: 'en'
    }
  },
  mutations: {
    /**
     * 切换主题
     */
    switchTheme(state: IAppearanceState) {
      if (state.theme === null) {
        state.theme = darkTheme;
      } else {
        state.theme = null;
      }
    },
    /**
     * 关闭骨架屏
     */
    closeLogSkeleton(state: IAppearanceState) {
      state.logSkeleton = false
    },
    closeLogRuleSkeleton(state: IAppearanceState) {
      state.logRuleSkeleton = false
    },
    switchLanguage(state: IAppearanceState, language: string) {
      state.language = language
      i18n.global.locale = language as 'en' | 'ch' | 'jp' | 'fr' | 'kor'
    }
  }
}

export default appearance