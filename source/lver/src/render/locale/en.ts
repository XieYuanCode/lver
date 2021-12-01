import { version } from "vue"
import { isMac } from "../utils/system"

const en = {
  view: {
    empty_text: "No Data",
    explore: {
      log_view_btn_text: "log",
      log_rule_view_btn_text: "log rule",
      log_explore: {
        title: "logs",
        searcher_placeholder: "search logs",
        addbutton: {
          import_log: "Import log file"
        },
        context_menu: {
          open: "open",
          open_local: isMac() ? "Reveal in Finder" : "Reveal in File Explore",
          delete: "delete",
          share: "share"
        },
        tag: {
          local: "local",
          share: "share",
          online: "online"
        }
      },
      log_rule_explore: {
        title: "log rules",
        searcher_placeholder: "search log rules",
        addbutton: {
          new_log_rule: "New log rule",
        },
        collapse: {
          local: "local",
          online: "online",
          share: "share"
        }
      }
    },
    setting: {
      header_text: "Setting",
      account: {
        header_text: "Account"
      },
      general: {
        header_text: "General",
        language_label_text: "language",
        tag_label_text: "tag",
        encoding_label_text: "日志解析编码",
        end_of_line_sequence_label_text: "换行符",
        tag_tip_description: 'Open the tag option, you can see the source of the log at the back of the log list.',
        language: {
          ch: "Chinese",
          en: "English",
          jp: "Japanese",
          kor: "Korean"
        }
      },
      theme: {
        header_text: "Theme",
        theme_label_text: "theme color",
        theme: {
          dark: "dark",
          light: "light",
          system: "system"
        }
      },
      about: {
        header_text: "About",
        author: "author: 谢渊",
        version: "version: " + version,
        feedback_btn_text: "Feedback"
      }
    },
    dialog: {
      new_log_rule: {
        title: "New Log Rule",
        create_rule_placrhole_text_press: "press",
        create_rule_placrhole_text_left: "to copy the first text of the clipboard here",
      }
    }
  },

}

export default en