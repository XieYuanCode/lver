import ILog from "../model/iLog"
import { IconFile, IconFolder } from '@arco-design/web-vue/es/icon';
import { h, VNode } from "vue"

export interface ILogViewModel {
  logList: ILog[],
}

const data = {
  state() {
    return {
      logList: [],
    }
  },
  getters: {
    renderLogList: (state: ILogViewModel) => {
      const appendIcon = (logs: ILog[]) => {
        let temp = logs
        logs.map(log => {
          log.icon = () => h(IconFile)
          log.title = log.name
          log.key = log.uuid
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
      const isExist = state.logList && !!state.logList.find(log => log.file === targetLog.file)

      !isExist && state.logList.push(targetLog)
    },
    /**
     * 删除一个日志
     */
    removeLogFile(state: ILogViewModel, key: string) {
      const index = state.logList.findIndex(log => log.key === key)

      index != -1 && state.logList.splice(index, 1)
    }
  }
}

export default data