import { IAppearanceState } from "./appearance";
import { IEditorVieModel } from "./editorView";
import { ILogViewModel } from "./log";

export interface IState {
  appearance: IAppearanceState,
  editorView: IEditorVieModel,
  logView: ILogViewModel
}