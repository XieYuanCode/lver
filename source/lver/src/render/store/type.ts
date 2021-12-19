import { IAppearanceState } from "./appearance";
import { IEditorVieModel } from "./editorView";
import { ILogViewModel } from "./log";
import { IShortcutState } from "./shortcut";
import { IUserState } from "./user";

export interface IState {
  appearance: IAppearanceState,
  editorView: IEditorVieModel,
  logView: ILogViewModel,
  user: IUserState,
  shortcut: IShortcutState
}