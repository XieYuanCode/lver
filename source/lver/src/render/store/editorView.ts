import ILog from "../model/iLog"
export interface IEditorVieModel {
  activeEditorKey: string
  editorList: ILog[]
}

const data = {
  state() {
    return {
      activeEditorKey: null,
      editorList: []
    }
  },
  mutations: {
    /**
     * 打开一个新的编辑器
     */
    openNewEditor(state: IEditorVieModel, targetEditor: IEditor) {
      const isOpend = Boolean(state.editorList.find(editor => editor.key === targetEditor.key))

      if (isOpend) {
        state.activeEditorKey = targetEditor.key
      } else {
        state.editorList.push(targetEditor)
      }

    },
    /**
     * 关闭一个现有编辑器
     */
    closeEditor(state: IEditorVieModel, key: string) {
      const index = state.editorList.findIndex(editor => editor.key === key)

      state.editorList.splice(index, 1)
    },

    activeEditor(state: IEditorVieModel, key: string) {
      state.activeEditorKey = key
    }
  }
}

export default data