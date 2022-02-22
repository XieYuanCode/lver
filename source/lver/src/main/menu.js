const { Menu, MenuItem, app } = require("electron")
const separator = new MenuItem({ type: 'separator' })

const createAppMenu = (language, win, shortcutList, tagsCount) => {
  tagsCount = tagsCount || 0
  //#region  应用
  // 应用-关于
  const appAboutMenuItem = new MenuItem({
    label: language === "en" ? "About" : language === "ch" ? "关于" : language === "jp" ? "について" : "관",
    role: "about"
  })

  // 应用-更新
  const appUpdateMenuItem = new MenuItem({
    label: language === "en" ? "Check for Updates" : language === "ch" ? "检查更新" : language === "jp" ? "アップデートを確認" : "업데이트 확인",
    click: () => { }
  })

  //#region  应用-首选项

  // 应用-首选项-设置
  const appappPreferencesSettingMenuItem = new MenuItem({
    label: language === "en" ? "Settings" : language === "ch" ? "设置" : language === "jp" ? "設定" : "설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "settings")),
    click: () => { win && win.webContents.send("settings") }
  })

  // 应用-首选项-通用
  const appappPreferencesGeneralMenuItem = new MenuItem({
    label: language === "en" ? "General Setting" : language === "ch" ? "通用设置" : language === "jp" ? "一般設定" : "일반 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_general")),
    click: () => { win && win.webContents.send("setting_general") }
  })

  // 应用-首选项-账户
  const appPreferencesAccountMenuItem = new MenuItem({
    label: language === "en" ? "Account Setting" : language === "ch" ? "账户设置" : language === "jp" ? "アカウント設定" : "계정 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_account")),
    click: () => { win && win.webContents.send("setting_account") }
  })

  // 应用-首选项-日志
  const appPreferencesLogMenuItem = new MenuItem({
    label: language === "en" ? "Log Setting" : language === "ch" ? "日志设置" : language === "jp" ? "ログ設定" : "로그 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_log")),
    click: () => { win && win.webContents.send("setting_log") }
  })

  // 应用-首选项-主题
  const appPreferencesThemeMenuItem = new MenuItem({
    label: language === "en" ? "Theme Setting" : language === "ch" ? "主题设置" : language === "jp" ? "テーマ設定" : "테마 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_theme")),
    click: () => { win && win.webContents.send("setting_theme") }
  })

  // 应用-首选项-快捷键
  const appPreferencesShortcutMenuItem = new MenuItem({
    label: language === "en" ? "Shortcut Setting" : language === "ch" ? "快捷键设置" : language === "jp" ? "ショートカット設定" : "단축키 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_shortcut")),
    click: () => { win && win.webContents.send("setting_shortcut") }
  })

  // 应用-首选项-更新
  const appPreferencesUpdateMenuItem = new MenuItem({
    label: language === "en" ? "Update Setting" : language === "ch" ? "更新设置" : language === "jp" ? "アップデート設定" : "업데이트 설정",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_update")),
    click: () => { win && win.webContents.send("setting_update") }
  })

  // 应用-首选项-关于
  const appPreferencesAboutMenuItem = new MenuItem({
    label: language === "en" ? "About" : language === "ch" ? "关于" : language === "jp" ? "について" : "관",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "setting_about")),
    click: () => { win && win.webContents.send("setting_about") }
  })

  // 应用-首选项
  const appPreferencesMenuItem = new MenuItem({
    label: language === "en" ? "Preferences" : language === "ch" ? "首选项" : language === "jp" ? "設定" : "설정",
    submenu: [
      appappPreferencesSettingMenuItem,
      separator,
      appappPreferencesGeneralMenuItem,
      appPreferencesAccountMenuItem,
      appPreferencesLogMenuItem,
      appPreferencesThemeMenuItem,
      appPreferencesShortcutMenuItem,
      appPreferencesUpdateMenuItem,
      separator,
      appPreferencesAboutMenuItem
    ],
  })

  //#endregion

  // 应用-服务
  const appServiceMenuItem = new MenuItem({
    label: language === "en" ? "Service" : language === "ch" ? "服务" : language === "jp" ? "サービス" : "서비스",
    role: "services",
  })

  // 应用-hide
  const appHideMenuItem = new MenuItem({
    label: language === "en" ? "Hide" : language === "ch" ? "隐藏" : language === "jp" ? "隠す" : "숨기기",
    role: "hide",
  })

  // 应用-hide others
  const appHideOthersMenuItem = new MenuItem({
    label: language === "en" ? "Hide Others" : language === "ch" ? "隐藏其他" : language === "jp" ? "他を隠す" : "다른 숨기기",
    role: "hideothers",
  })

  // 应用-unhide
  const appUnhideMenuItem = new MenuItem({
    label: language === "en" ? "Unhide" : language === "ch" ? "取消隐藏" : language === "jp" ? "隠しを解除" : "숨기기 해제",
    role: "unhide",
  })

  // 应用-quit
  const appQuitMenuItem = new MenuItem({
    label: language === "en" ? "Quit" : language === "ch" ? "退出" : language === "jp" ? "終了" : "종료",
    role: "quit",
  })

  // 应用
  const appMenuItem = new MenuItem({
    label: app.name,
    submenu: [
      appAboutMenuItem,
      appUpdateMenuItem,
      separator,
      appPreferencesMenuItem,
      separator,
      appServiceMenuItem,
      separator,
      appHideMenuItem,
      appHideOthersMenuItem,
      appUnhideMenuItem,
      separator,
      appQuitMenuItem
    ]
  })

  //#endregion

  //#region File
  // 文件-导入本地日志
  const fileImportLocalLogMenuItem = new MenuItem({
    label: language === "en" ? "Import Local Log" : language === "ch" ? "导入本地日志" : language === "jp" ? "ローカルログをインポート" : "로컬 로그 가져오기",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "import_local_log")),
    click: () => { win && win.webContents.send("import_local_log") }
  })

  // 文件-导入分享日志
  const fileImportShareLogMenuItem = new MenuItem({
    label: language === "en" ? "Import Shared Log" : language === "ch" ? "导入分享日志" : language === "jp" ? "共有ログをインポート" : "공유 로그 가져오기",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "import_shared_log")),
    click: () => { win && win.webContents.send("import_shared_log") }
  })

  // 文件-关闭当前标签页
  const fileCloseCurrentTabMenuItem = new MenuItem({
    label: language === "en" ? "Close Current Tab" : language === "ch" ? "关闭当前标签页" : language === "jp" ? "現在のタブを閉じる" : "현재 탭 닫기",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "close_current_tab")),
    click: () => { win && win.webContents.send("close_current_tab") },
    enabled: tagsCount > 0
  })

  // 文件-关闭其他标签页
  const fileCloseOtherTabMenuItem = new MenuItem({
    label: language === "en" ? "Close Other Tabs" : language === "ch" ? "关闭其他标签页" : language === "jp" ? "他のタブを閉じる" : "다른 탭 닫기",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "close_other_tabs")),
    click: () => { win && win.webContents.send("close_other_tabs") },
    enabled: tagsCount > 1
  })

  // 文件-全部标签页
  const fileCloseAllTabsMenuItem = new MenuItem({
    label: language === "en" ? "Close All Tabs" : language === "ch" ? "关闭全部标签页" : language === "jp" ? "全てのタブを閉じる" : "모든 탭 닫기",
    accelerator: createAccelerator(shortcutList.find(shortcut => shortcut.action === "close_all_tabs")),
    click: () => { win && win.webContents.send("close_all_tabs") },
    enabled: tagsCount > 0
  })

  const appFileMenuItem = new MenuItem({
    label: language === "en" ? "File" : language === "ch" ? "文件" : language === "jp" ? "ファイル" : "파일",
    submenu: [
      fileImportLocalLogMenuItem,
      fileImportShareLogMenuItem,
      separator,
      fileCloseCurrentTabMenuItem,
      fileCloseOtherTabMenuItem,
      fileCloseAllTabsMenuItem
    ]
  })
  //#endregion

  const appMenu = new Menu()
  appMenu.append(appMenuItem)
  appMenu.append(appFileMenuItem)

  return appMenu
}

const createAccelerator = (shortcut) => {
  if (!shortcut.key) return null
  return shortcut.key.functionalKeys.join('+') + '+' + shortcut.key.key.join('+')
}

exports.createAppMenu = createAppMenu
