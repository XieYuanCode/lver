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
          rename: "重命名",
          delete: "删除",
          share: "分享",
          rename_empty: "无法重命名为空或者一个或多个空格"
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
      log: {
        header_text: "日志",
        pagination_title: "分页"
      },
      account: {
        header_text: "账户",
        login_text: "登陆",
        logout_text: "登出",
        login: {
          wechat: "微信",
          qq: "QQ",
          github: "github"
        },
        login_success_tip: "登陆成功",
        login_failed_tip: "登录失败",
        logout_success_tip: "登出成功",
        tip: "登陆后可以使用云端备份、日志分享、规则上传等功能"
      },
      general: {
        header_text: "通用",
        language_label_text: "语言",
        tag_label_text: "标签",
        encoding_label_text: "日志解析编码",
        end_of_line_sequence_label_text: "换行符",
        log_description_label_text: "日志描述",
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
      },
      import_log_file: {
        title: "导入日志文件"
      }
    },
    editor: {
      log_editor: {
        log_description: {
          name: "名称",
          filename: "文件名",
          file: '文件路径',
          recordDate: "记录时间",
          createDate: "产生时间",
          uuid: "唯一标识",
          analyseSuccessful: "成功分析",
          lastModifiedData: "最后编辑时间",
          description: "描述"
        },
        close_descriotion_btn_text: "关闭",
        edit_descriotion_btn_text: "编辑",
        log_table_label_text: "日志详情",
        log_description_closed_text: "日志描述已经关闭，你可以稍后在设置中重新打开",
        search_input_placeholder: "搜索日志, 支持使用类似：level: ERROR的筛选模式",
      },
    }
  },
}

export default ch