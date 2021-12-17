import { version } from "vue"
import { isMac } from "../utils/system"

const jp = {
  view: {
    empty_text: "無数の根拠",
    explore: {
      log_view_btn_text: "ログ",
      log_rule_view_btn_text: "ログ ルール",
      log_explore: {
        title: "ログ",
        searcher_placeholder: "探す ログ",
        addbutton: {
          import_log: "ログファイルのインポート"
        },
        context_menu: {
          open: "開ける",
          open_local: isMac() ? "Finder で開く" : "File Explore で開く",
          delete: "消去",
          share: "共有"
        },
        tag: {
          local: "ローカル",
          share: "共有",
          online: "オンライン"
        }
      },
      log_rule_explore: {
        title: "ログ ルール",
        searcher_placeholder: "探す ログ ルール",
        addbutton: {
          new_log_rule: "新しいログルール",
        },
        collapse: {
          local: "地元",
          online: "オンライン",
          share: "分かち合い"
        }
      }
    },
    setting: {
      header_text: "設置",
      account: {
        header_text: "口座"
      },
      general: {
        header_text: "通常",
        language_label_text: "言語",
        tag_label_text: "ラベル",
        encoding_label_text: "日志解析编码",
        end_of_line_sequence_label_text: "换行符",
        tag_tip_description: 'ラベルオプションを開くと、ログリストの最後にログのソースが表示されます。',
        language: {
          ch: "简体中文",
          en: "English",
          jp: "日本語",
          kor: "한국어",
        }
      },
      theme: {
        header_text: "テーマ",
        theme_label_text: "テーマカラー",
        theme: {
          dark: "濃い色の",
          light: "薄い",
          system: "システム"
        }
      },
      about: {
        header_text: "だいたい",
        author: "著者: 谢渊",
        version: "版本: " + version,
        feedback_btn_text: "反馈"
      }
    },
    dialog: {
      new_log_rule: {
        title: "新しいログルール",
        create_rule_placrhole_text_press: "押す",
        create_rule_placrhole_text_left: "to copy the first text of the clipboard here",
      }
    }
  },

}

export default jp