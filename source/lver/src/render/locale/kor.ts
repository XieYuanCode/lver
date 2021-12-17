import { version } from "vue"
import { isMac } from "../utils/system"

const kor = {
  view: {
    empty_text: "무수한 증거",
    explore: {
      log_view_btn_text: "통나무",
      log_rule_view_btn_text: "로그 규칙",
      log_explore: {
        title: "통나무",
        searcher_placeholder: "검색 로그",
        addbutton: {
          import_log: "로그 파일 가져오기"
        },
        context_menu: {
          open: "開ける",
          open_local: isMac() ? "Finder에 표시" : "File Explore에 표시",
          delete: "삭제",
          share: "공유하다"
        },
        tag: {
          local: "현지의",
          share: "공유하다",
          online: "온라인"
        }
      },
      log_rule_explore: {
        title: "로그 규칙",
        searcher_placeholder: "로그 규칙 검색",
        addbutton: {
          new_log_rule: "새 로그 규칙",
        },
        collapse: {
          local: "로컬",
          online: "온라인",
          share: "나누기"
        }
      }
    },
    setting: {
      header_text: "설정",
      account: {
        header_text: "계정"
      },
      general: {
        header_text: "보통",
        language_label_text: "언어",
        tag_label_text: "상표",
        encoding_label_text: "日志解析编码",
        end_of_line_sequence_label_text: "换行符",
        tag_tip_description: '레이블 옵션을 열면 로그 목록 뒷면에서 로그 소스를 볼 수 있습니다.',
        language: {
          ch: "简体中文",
          en: "English",
          jp: "日本語",
          kor: "한국어",
        }
      },
      theme: {
        header_text: "테마",
        theme_label_text: "테마 색상",
        theme: {
          dark: "짙은 색",
          light: "연한 색상",
          system: "시스템"
        }
      },
      about: {
        header_text: "정보",
        author: "작가: 谢渊",
        version: "버전: " + version,
        feedback_btn_text: "피드백"
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

export default kor