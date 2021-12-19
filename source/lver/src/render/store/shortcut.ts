import { Key, ShortcutAction } from "../model/shortcut"

export type KeyPair = Key[]

export interface IShortcut {
  key?: Key | KeyPair
  action: ShortcutAction
}

export interface IShortcutState {
  shortcutList: IShortcut[]
}

const data = {
  state() {
    return {
      shortcutList: [
        {
          action: ShortcutAction.ImportLocalLog,
          key: [Key.CommandOrControl, Key.Shift, Key.L],
        },
        {
          action: ShortcutAction.ImportCloudLog,
          key: [Key.CommandOrControl, Key.Shift, Key.C],
        },
        {
          action: ShortcutAction.Settings,
          key: [Key.CommandOrControl, Key.Comma],
        },
        {
          action: ShortcutAction.Setting_General,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Shortcut,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Account,
          key: null,
        },
        {
          action: ShortcutAction.Setting_About,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Log,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Theme,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Update,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogFile,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogRule,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogField,
          key: null,
        },
        {
          action: ShortcutAction.SwitchOpendTab,
          key: Key.CommandOrControl,
        },
        {
          action: ShortcutAction.ShareLog,
          key: null,
        },
        {
          action: ShortcutAction.ShareLogRule,
          key: null,
        },
      ]
    }
  },
  mutations: {

  }
}

export default data