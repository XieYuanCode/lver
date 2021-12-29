import i18n from "../locale";
import { LineSequence } from "../model/LineSequence";
import { ThemeType } from "../model/theme";
import { UpdateChannel } from "../model/updateChannel";
import { isWin } from "../utils/system";
import { switchTheme } from "../utils/theme";
import { electronStore } from "../utils/electronStore";
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
  pagination: boolean,
  /**
   * 更新渠道
   */
  updateChannel: UpdateChannel,
  /**
   * 自动更新
   */
  autoUpdate: boolean,
  /**
   * 更新周期
   */
  updateInterval: number,
  /**
   * 最后检查更新时间
   */
  lastCheckUpdateTime: Date
  /**
   * 是否启动快捷键
   */
  isShortcutEnable: boolean,

  /**
   * 窗口透明度
   */
  windowOpacity: number

  /**
   * 登录时打开
   */
  openOnLogin: boolean

  /**
   * 默认日志储存位置
   */
  defaultLogFolder: string
}

const appearance = {
  state() {
    return {
      theme: electronStore.store.get("theme", ThemeType.System),
      logSkeleton: true,
      logRuleSkeleton: true,
      language: electronStore.store.get("language", 'ch'),
      settingViewVisible: false,
      logDescription: electronStore.store.get("logDescription", true),
      tag: electronStore.store.get("tag", false),
      encoding: electronStore.store.get("encoding", "utf8"),
      endOfLineSequence: electronStore.store.get("endOfLineSequence", isWin() ? LineSequence.CRLF : LineSequence.LF),
      pagination: electronStore.store.get("pagination", true),
      updateChannel: electronStore.store.get("updateChannel", UpdateChannel.Stable),
      autoUpdate: electronStore.store.get("autoUpdate", true),
      updateInterval: electronStore.store.get("updateInterval", 7),
      lastCheckUpdateTime: electronStore.store.get("lastCheckUpdateTime", ""),
      isShortcutEnable: electronStore.store.get("isShortcutEnable", true),
      windowOpacity: electronStore.store.get("windowOpacity", 0.9),
      openOnLogin: electronStore.store.get("openOnLogin", false),
      defaultLogFolder: electronStore.store.get("defaultLogFolder", null)
    }
  },
  mutations: {
    /**
     * 切换主题
     */
    switchTheme(state: IAppearanceState, theme: ThemeType) {
      state.theme = theme
      switchTheme(theme)
      electronStore.store.set('theme', theme)
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
      electronStore.store.set('language', language)
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
      electronStore.store.set('tag', visible)
    },

    /**
     * 切换编码
     */
    switchEncoding(state: IAppearanceState, encoding: string) {
      state.encoding = encoding
      electronStore.store.set('encoding', encoding)
    },

    /**
     * 切换换行符
     */
    switchEndOfLineSequence(state: IAppearanceState, endOfLineSequence: LineSequence) {
      state.endOfLineSequence = endOfLineSequence
      electronStore.store.set('endOfLineSequence', endOfLineSequence)
    },

    /**
     * 切换日志描述是否显示
     */
    switchlogDescription(state: IAppearanceState, logDescription: boolean) {
      state.logDescription = logDescription
      electronStore.store.set('logDescription', logDescription)
    },

    /**
     * 分页是否显示
     */
    switchPagination(state: IAppearanceState, pagination: boolean) {
      state.pagination = pagination
      electronStore.store.set('pagination', pagination)
    },

    /**
     * 更新渠道
     */
    switchUpdateChannel(state: IAppearanceState, updateChannel: UpdateChannel) {
      state.updateChannel = updateChannel
      electronStore.store.set('updateChannel', updateChannel)
    },

    /**
     * 自动更新
     */
    switchAutoUpdate(state: IAppearanceState, autoUpdate: boolean) {
      state.autoUpdate = autoUpdate
      electronStore.store.set('autoUpdate', autoUpdate)
    },

    /**
     * 更新周期
     */
    switchUpdateInterval(state: IAppearanceState, updateInterval: number) {
      state.updateInterval = updateInterval
      electronStore.store.set('updateInterval', updateInterval)
    },

    /**
     * 最后检查更新时间
     */
    switchLastCheckUpdateTime(state: IAppearanceState, lastCheckUpdateTime: Date) {
      state.lastCheckUpdateTime = lastCheckUpdateTime
      electronStore.store.set('lastCheckUpdateTime', lastCheckUpdateTime)
    },

    /**
     * 快捷键是否启用
     */
    switchShortcutEnable(state: IAppearanceState, isShortcutEnable: boolean) {
      state.isShortcutEnable = isShortcutEnable
      electronStore.store.set('isShortcutEnable', isShortcutEnable)
    },

    /**
     * 窗口透明度
     */
    switchWindowOpacity(state: IAppearanceState, windowOpacity: number) {
      state.windowOpacity = windowOpacity
      require('electron').ipcRenderer.send('opacity-changed', windowOpacity)
      electronStore.store.set('windowOpacity', windowOpacity)
    },

    /**
     * 登录时打开
     */
    switchOpenOnLogin(state: IAppearanceState, openOnLogin: boolean) {
      state.openOnLogin = openOnLogin
      require('electron').ipcRenderer.send('openOnLogin-changed', openOnLogin)
      electronStore.store.set('openOnLogin', openOnLogin)
    },

    /**
     * 切换默认日志文件夹
     */
    switchDefaultLogFolder(state: IAppearanceState, defaultLogFolder: string) {
      state.defaultLogFolder = defaultLogFolder
      electronStore.store.set('defaultLogFolder', defaultLogFolder)
    }
  }
}

export default appearance