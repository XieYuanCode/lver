import { version } from "../utils/appInfo"
import { isMac, isWin } from "../utils/system"

const ch = {
  view: {
    empty_text: "暂无数据",
    explore: {
      log_view_btn_text: "日志",
      log_rule_view_btn_text: "日志规则",
      log_explore: {
        title: "日志",
        searcher_placeholder: "搜索日志",
        addbutton: {
          import_log: "导入日志文件"
        },
        context_menu: {
          open: "打开",
          open_local: isMac() ? "在访达中打开" : "在资源管理器中打开",
          delete: "删除",
          share: "分享"
        },
        tag: {
          local: "本地",
          share: "分享",
          online: "在线"
        }
      },
      log_rule_explore: {
        title: "日志规则",
        searcher_placeholder: "搜索日志规则",
        addbutton: {
          new_log_rule: "新建日志规则",
        },
        collapse: {
          local: "本地",
          online: "在线",
          share: "分享"
        }
      }
    },
    setting: {
      header_text: "设置",
      account: {
        header_text: "账户"
      },
      general: {
        header_text: "通用",
        language_label_text: "语言",
        tag_label_text: "标签",
        tag_tip_description: '打开标签选项，可以在日志列表的后方看到日志的来源。',
        language: {
          ch: "中文",
          en: "英文",
          jp: "日语",
          kor: "韩语"
        }
      },
      theme: {
        header_text: "主题",
        theme_label_text: "外观",
        theme: {
          dark: "深色",
          light: "浅色",
          system: "系统"
        }
      },
      about: {
        header_text: "关于",
        author: "作者: 谢渊",
        version: "版本: " + version,
        feedback_btn_text: "反馈"
      }
    },
    dialog: {
      new_log_rule: {
        title: "新建日志规则",
        create_rule_placrhole_text_press: "按下",
        create_rule_placrhole_text_left: "将剪贴板第一条文本复制到这里",
      }
    }
  },
}

export default ch