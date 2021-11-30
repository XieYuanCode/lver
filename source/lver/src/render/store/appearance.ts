import i18n from "../locale";
import { ThemeType } from "../model/theme";
import { switchTheme } from "../utils/theme";

export interface IAppearanceState {
  theme: ThemeType,
  logSkeleton: boolean,
  logRuleSkeleton: boolean,
  language: string,
  settingViewVisible: boolean,
  tag: boolean
}

const appearance = {
  state() {
    return {
      theme: ThemeType.System,
      logSkeleton: true,
      logRuleSkeleton: true,
      language: 'ch',
      settingViewVisible: false,
      tag: false
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
     * 切换日志骨架屏
     */
    switchLogSkeleton(state: IAppearanceState, logSkeleton: boolean) {
      state.logSkeleton = logSkeleton
    },
    /**
     * 切换日志规则骨架屏
     */
    switchLogRuleSkeleton(state: IAppearanceState, logRuleSkeleton: boolean) {
      state.logRuleSkeleton = logRuleSkeleton
    },

    /**
     * 切换语言
     */
    switchLanguage(state: IAppearanceState, language: string) {
      state.language = language
      i18n.global.locale = language as 'en' | 'ch' | 'jp' | 'kor'
    },

    /**
     * 切换设置页面
     */
    switchSettingViewVisible(state: IAppearanceState, visible: boolean) {
      state.settingViewVisible = visible
    },

    /**
     * 切换tag是否显示
     */
    switchTagVisible(state: IAppearanceState, visible: boolean) {
      state.tag = visible
    }
  }
}

export default appearance