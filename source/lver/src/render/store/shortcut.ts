import { FunctionalKey, Key, ShortcutAction } from "../model/shortcut"

export type KeyPair = {
  functionalKeys?: FunctionalKey[]
  key?: Key[]
}

export interface IShortcut {
  key?: KeyPair
  action: ShortcutAction
  isEditing: boolean
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
          key: {
            functionalKeys: [FunctionalKey.CommandOrControl, FunctionalKey.Shift],
            key: [Key.O]
          },
          isEditing: false,
        },
        {
          action: ShortcutAction.ImportSharedLog,
          key: {
            functionalKeys: [FunctionalKey.CommandOrControl, FunctionalKey.Shift],
            key: [Key.S]
          },
          isEditing: false,
        },
        {
          action: ShortcutAction.Settings,
          key: {
            functionalKeys: [FunctionalKey.CommandOrControl],
            key: [Key.Comma]
          },
          isEditing: false,
        },
        {
          action: ShortcutAction.SwitchOpendTab,
          isEditing: false,
          key: {
            functionalKeys: [FunctionalKey.CommandOrControl],
            key: ["1-9"]
          },
        },
        {
          action: ShortcutAction.Setting_General,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Shortcut,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Account,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_About,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Log,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Theme,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.Setting_Update,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogFile,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogRule,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.SearchLogField,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.ShareLog,
          isEditing: false,
          key: null,
        },
        {
          action: ShortcutAction.ShareLogRule,
          isEditing: false,
          key: null,
        },
      ]
    }
  },
  mutations: {
    changeShortcut(state: IShortcutState, { action, keyPair }: { action: ShortcutAction; keyPair: KeyPair }) {
      const index = state.shortcutList.findIndex(
        (shortcut) => shortcut.action === action
      )
      if (index > -1) {
        state.shortcutList[index].key = keyPair
      }
    },
    startEditShortcut(state: IShortcutState, payload: IShortcut) {
      console.log(123, payload);
      const index = state.shortcutList.findIndex(
        (shortcut) => shortcut.action === payload.action
      )
      if (index > -1) {
        state.shortcutList[index].isEditing = true
      }
    },
    finishEditShortcut(state: IShortcutState, payload: IShortcut) {
      const index = state.shortcutList.findIndex(
        (shortcut) => shortcut.action === payload.action
      )
      if (index > -1) {
        state.shortcutList[index].isEditing = false
      }
    }
  }
}

export default data