import ILog from "../model/iLog"
import { IconFile, IconFolder } from '@arco-design/web-vue/es/icon';
import { h, VNode } from "vue"
import { electronStore } from "../utils/electronStore";

export interface ILogViewModel {
  logList: ILog[],
}

const data = {
  state() {
    return {
      logList: electronStore.store.get('logList') || [],
    }
  },
  getters: {
    renderedLogList: (state: ILogViewModel) => {
      if (!state.logList) return null
      if (state.logList.length === 0) return null

      let temp: ILog[] = []

      state.logList.forEach(log => {
        const temp_log = log
        temp_log.icon = () => h(IconFile)
        temp_log.title = log.name
        temp_log.key = log.uuid
        temp_log.sizeText = log.size < 1024 ? `${log.size}B` : log.size < 1024 * 1024 ? `${(log.size / 1024).toFixed(2)}KB` : `${(log.size / 1024 / 1024).toFixed(2)}MB`
        temp.push(temp_log)
      })

      return temp
    }
  },
  mutations: {
    /**
     * 新增一个日志
     */
    appendNewLogFile(state: ILogViewModel, targetLog: ILog) {
      const isExist = state.logList && !!state.logList.find(log => log.file === targetLog.file)

      !isExist && state.logList.push(targetLog)
      !isExist && electronStore.store.set('logList', state.logList)
    },
    /**
     * 删除一个日志
     */
    removeLogFile(state: ILogViewModel, key: string) {
      const index = state.logList.findIndex(log => log.key === key)

      index != -1 && state.logList.splice(index, 1)
      index != -1 && electronStore.store.set('logList', state.logList)
    },

    changeLogName(state: ILogViewModel, { uuid, value }) {
      const targetLog = state.logList.find(log => log.uuid === uuid);
      targetLog && (targetLog.name = value)
      targetLog && electronStore.store.set('logList', state.logList)
    },

    updateLogInfo(state: ILogViewModel, { uuid, log }) {
      const targetLog = state.logList.find(log => log.uuid === uuid);
      targetLog && Object.assign(targetLog, log)
      targetLog && electronStore.store.set('logList', state.logList)
    }
  }
}

export default data