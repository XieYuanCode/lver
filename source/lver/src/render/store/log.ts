import ILog from "../model/iLog"
import { IconFile, IconFolder } from '@arco-design/web-vue/es/icon';
import { h, VNode } from "vue"

interface ILogView {
  key: string,
  children?: ILogView[]
  icon: () => VNode
}

export interface ILogViewModel {
  logList: ILogView[]
}

const data = {
  state() {
    return {
      logList: [
        {
          key: "1",
          title: "UI显示异常1",
          file: "",
          type: "local"
        },
        {
          key: "2",
          title: "UI显示异常2",
          file: "",
          type: "share"
        },
        {
          key: "3",
          title: "UI显示异常3",
          file: "",
          type: "online"
        },
        {
          key: "4",
          title: "UI显示异常4",
          file: "",
          type: "local"
        }
      ]
    }
  },
  getters: {
    renderLogList: (state: ILogViewModel) => {
      const appendIcon = (logViews: ILogView[]) => {
        let temp = logViews
        logViews.map(logItem => {
          if (logItem.children) {
            logItem.icon = () => h(IconFolder)
            appendIcon(logItem.children)
          } else {
            logItem.icon = () => h(IconFile)
          }
        })

        return temp
      }
      return appendIcon(state.logList)
    }
  },
  mutations: {
    /**
     * 新增一个日志
     */
    appendNewLogFile(state: ILogViewModel, targetLog: ILogView) {
      const isExist = !!state.logList.find(log => log.key === targetLog.key)

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