export interface IEditor {
  key: string
  title: string
}

export interface IEditorVieModel {
  editorList: IEditor[]
}

const data = {
  state() {
    return {
      editorList: []
    }
  },
  mutations: {
    /**
     * 打开一个新的编辑器
     */
    openNewEditor(state: IEditorVieModel, targetEditor: IEditor) {
      const isOpend = Boolean(state.editorList.find(editor => editor.key === targetEditor.key))

      !isOpend && state.editorList.push(targetEditor)
    },
    /**
     * 关闭一个现有编辑器
     */
    closeEditor(state: IEditorVieModel, key: string) {
      const index = state.editorList.findIndex(editor => editor.key === key)

      state.editorList.splice(index, 1)
    }
  }
}

export default data