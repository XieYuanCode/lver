import i18n from "../locale";
import { ThemeType } from "../model/theme";
import { switchTheme } from "../utils/theme";

export interface IAppearanceState {
  theme: ThemeType,
  logSkeleton: boolean,
  logRuleSkeleton: boolean,
  language: string
}

const appearance = {
  state() {
    return {
      theme: ThemeType.System,
      logSkeleton: true,
      logRuleSkeleton: true,
      language: 'ch'
    }
  },
  mutations: {
    /**
     * 切换主题
     */
    switchTheme(state: IAppearanceState, theme: ThemeType) {
      state.theme = theme

      switchTheme(theme)
    },
    /**
     * 关闭骨架屏
     */
    switchLogSkeleton(state: IAppearanceState, logSkeleton: boolean) {
      console.log(logSkeleton);
      state.logSkeleton = logSkeleton
    },
    switchLogRuleSkeleton(state: IAppearanceState, logRuleSkeleton: boolean) {
      console.log(logRuleSkeleton);
      state.logRuleSkeleton = logRuleSkeleton
    },
    switchLanguage(state: IAppearanceState, language: string) {
      state.language = language
      i18n.global.locale = language as 'en' | 'ch' | 'jp' | 'kor'
    }
  }
}

export default appearance