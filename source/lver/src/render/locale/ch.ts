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
          import_log: "本地日志",
          import_shared_log: "共享日志",
        },
        context_menu: {
          open: "打开",
          editDeitil: "编辑详情",
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
        sync_text: "同步",
        cancel_auth_text: "取消授权",
        user_info_card: {
          title: '账户详情',
          registry_date: "注册日期",
          login_times: "登录次数"
        },
        cloud_info_card: {
          title: '云储存详情',
          management_btn_text: "管理",
          log_counts: "日志数量",
          used_size: "已用",
          total_size: "总量",
          used_percent: "已用百分比",
        },
        login: {
          wechat: "微信",
          qq: "QQ",
          github: "github",
          gitee: '码云'
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
          ch: "简体中文",
          en: "English",
          jp: "日本語",
          kor: "한국어",
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
      shortcut: {
        header_text: "快捷键",
        tabel_action_text: "行为",
        table_key_text: "快捷键",
        shorrcut_enable_label_text: "启用快捷键"
      },
      update: {
        header_text: "更新",
        channel_label_text: "更新渠道",
        stable_channel_text: "稳定版",
        beta_channel_text: "测试版",
        auto_check_label_text: "自动检查更新",
        update_interval_label_text: "更新间隔",
        day_text: "天",
        last_check_time_label_text: "上次检查时间",
      },
      about: {
        header_text: "关于",
        author: "作者: 谢渊",
        version: version,
        feedback_btn_text: "反馈",
        changelog_btn_text: "更新日志",
        developer: "开发者"
      }
    },
    dialog: {
      edit_log_detail: {
        confirm_btn_text: "确认",
        cancel_btn_text: "取消",
      },
      new_log_rule: {
        title: "新建日志规则",
        create_rule_placrhole_text_press: "按下",
        create_rule_placrhole_text_left: "将剪贴板第一条文本复制到这里",
      },
      import_log_file: {
        title: "导入本地日志文件"
      }
    },
    editor: {
      log_editor: {
        log_description: {
          name: "名称",
          filename: "文件名",
          file: '文件路径',
          recordDate: "导入时间",
          createDate: "产生时间",
          uuid: "唯一标识",
          analyseSuccessful: "成功分析",
          lastModifiedData: "最后编辑时间",
          description: "描述"
        },
        close_descriotion_btn_text: "关闭",
        edit_descriotion_btn_text: "编辑",
        save_descriotion_btn_text: "保存",
        log_table_label_text: "日志详情",
        log_description_closed_text: "日志描述已经关闭，你可以稍后在设置中重新打开",
        search_input_placeholder: "搜索日志, 支持使用类似：level: ERROR的筛选模式",
      },
    }
  },
}

export default ch