import i18n from "../locale";
import { LineSequence } from "../model/LineSequence";
import { ThemeType } from "../model/theme";
import { isWin } from "../utils/system";
import { switchTheme } from "../utils/theme";

export interface IAppearanceState {
  /**
   * 主题
   */
  theme: ThemeType,
  /**
   * 日志骨架屏
   */
  logSkeleton: boolean,
  /**
   * 日志列表骨架屏
   */
  logRuleSkeleton: boolean,
  /**
   * 语言
   */
  language: string,
  /**
   * 设置页面是否显示
   */
  settingViewVisible: boolean,
  /**
   * tag是否显示
   */
  tag: boolean,
  /**
   * 日志解析编码
   */
  encoding: string,
  /**
   * 日志解析行分隔符
   */
  endOfLineSequence: LineSequence,
  /**
   * 日志描述是否显示
   */
  logDescription: boolean,
  /**
   * 日志分页是否显示
   */
  pagination: boolean
}

const appearance = {
  state() {
    return {
      theme: ThemeType.System,
      logSkeleton: true,
      logRuleSkeleton: true,
      language: 'ch',
      settingViewVisible: false,
      logDescription: true,
      tag: false,
      encoding: "utf8",
      endOfLineSequence: isWin() ? LineSequence.CRLF : LineSequence.LF,
      pagination: true
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
    },

    /**
     * 切换编码
     */
    switchEncoding(state: IAppearanceState, encoding: string) {
      state.encoding = encoding
    },

    /**
     * 切换换行符
     */
    switchEndOfLineSequence(state: IAppearanceState, endOfLineSequence: LineSequence) {
      state.endOfLineSequence = endOfLineSequence
    },

    /**
     * 切换日志描述是否显示
     */
    switchlogDescription(state: IAppearanceState, logDescription: boolean) {
      state.logDescription = logDescription
    },

    switchPagination(state: IAppearanceState, pagination: boolean) {
      state.pagination = pagination
    }
  }
}

export default appearance