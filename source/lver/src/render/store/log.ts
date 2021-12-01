import ILog from "../model/iLog"
import { IconFile, IconFolder } from '@arco-design/web-vue/es/icon';
import { h, VNode } from "vue"

interface ILogView {
  title: string
  key: string
  path: string
  icon?: () => VNode
}

export interface ILogViewModel {
  logList: ILogView[],
  selectedFiles: FileList
}

const data = {
  state() {
    return {
      logList: [],
      selectedFiles: []
    }
  },
  getters: {
    renderLogList: (state: ILogViewModel) => {
      const appendIcon = (logViews: ILogView[]) => {
        let temp = logViews
        logViews.map(logItem => {
          logItem.icon = () => h(IconFile)
        })

        return temp
      }
      return state.logList.length === 0 ? null : appendIcon(state.logList)
    }
  },
  mutations: {
    /**
     * 新增一个日志
     */
    appendNewLogFile(state: ILogViewModel, targetLog: ILog) {
      const isExist = state.logList && !!state.logList.find(log => log.path === targetLog.file)

      !isExist && state.logList.push({
        title: targetLog.name,
        key: targetLog.uuid,
        path: targetLog.file
      })
    },
    /**
     * 删除一个日志
     */
    removeLogFile(state: ILogViewModel, key: string) {
      const index = state.logList.findIndex(log => log.key === key)

      index != -1 && state.logList.splice(index, 1)
    },

    changeSelectedFiles(state: ILogViewModel, files: FileList) {
      state.selectedFiles = files
    }
  }
}

export default data