import ILog from "../model/iLog"
import { IconFile, IconFolder } from '@arco-design/web-vue/es/icon';
import { h, VNode } from "vue"

interface ILogView {
  uuid: string,
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
          key: "00000001",
          title: "农行",
          children: [
            {
              key: "00000002",
              title: "2021-08",
              children: [
                {
                  key: "00000003",
                  title: "UI显示异常",
                },
                {
                  key: "00000004",
                  title: "技术组件执行异常",
                },
              ],
            },
            {
              key: "00000005",
              title: "2021-09",
              children: [
                {
                  key: "00000006",
                  title: "执行速度日志",
                },
                {
                  key: "00000007",
                  title: "数值传递异常",
                },
              ],
            },
          ],
        },
        {
          key: "00000008",
          title: "张家港",
          children: [
            {
              key: "00000009",
              title: "2021-08",
              children: [
                {
                  key: "0000010",
                  title: "UI显示异常",
                },
                {
                  key: "0000011",
                  title: "技术组件执行异常",
                },
              ],
            },
            {
              key: "0000012",
              title: "2021-09",
              children: [
                {
                  key: "0000013",
                  title: "执行速度日志",
                },
                {
                  key: "0000014",
                  title: "数值传递异常",
                },
              ],
            },
          ]
        },
        {
          key: "0000015",
          title: "昆山",
          children: [
            {
              key: "0000016",
              title: "2021-08",
              children: [
                {
                  key: "0000017",
                  title: "UI显示异常",
                },
                {
                  key: "0000018",
                  title: "技术组件执行异常",
                },
              ],
            },
            {
              key: "0000019",
              title: "2021-09",
              children: [
                {
                  key: "0000020",
                  title: "执行速度日志",
                },
                {
                  key: "0000021",
                  title: "数值传递异常",
                },
              ],
            },
          ],
        },
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
      const isExist = !!state.logList.find(log => log.uuid === targetLog.uuid)

      !isExist && state.logList.push(targetLog)
    },
    /**
     * 删除一个日志
     */
    removeLogFile(state: ILogViewModel, uuid: string) {
      const index = state.logList.findIndex(log => log.uuid === uuid)

      state.logList.splice(index, 1)
    }
  }
}

export default data