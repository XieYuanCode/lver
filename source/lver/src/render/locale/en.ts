import { version } from "vue"
import { isMac } from "../utils/system"

const en = {
  view: {
    empty_text: "No Data",
    explore: {
      log_view_btn_text: "log",
      log_rule_view_btn_text: "log rule",
      log_explore: {
        title: "log",
        searcher_placeholder: "search log",
        addbutton: {
          import_log: "Import log file",
          import_shared_log: "import shared log",
          add_group: "add group",
        },
        context_menu: {
          open: "open",
          editDetail: "edit detail",
          open_local: isMac() ? "Reveal in Finder" : "Reveal in File Explore",
          rename: "rename",
          delete: "delete",
          delete_local: "delete local log",
          share: "share",
          rename_empty: "can not rename to empty or multiple spaces"
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
      common: {
        yes_text: "yes",
        no_text: "no",
        show_text: "show",
        hide_text: "hide",
        open_text: "open",
        close_text: "close",
        enable_text: "enable",
        disable_text: "disable",
        auto_text: "auto",
        manual_text: "manual",
      },
      header_text: "Setting",
      log: {
        header_text: "log",
        pagination_title: "pagination"
      },
      account: {
        header_text: "Account",
        login_text: "login",
        logout_text: "logout",
        sync_text: "sync",
        cancel_auth_text: "cancel auth",
        user_info_card: {
          title: 'Account detail',
          blog_btn_text: 'blog',
          html_url_btn_text: 'homepage',
        },
        cloud_info_card: {
          title: 'Cloud storage detail',
          management_btn_text: "management",
          log_counts: "log counts",
          used_size: "used",
          total_size: "total",
          used_percent: "used percent",
        },
        login: {
          wechat: "wechat",
          qq: "QQ",
          github: "github(because of network reasons, not recommended to use)",
          gitee: 'gitee'
        },
        login_success_tip: "login success",
        login_failed_tip: "login failed",
        logout_success_tip: "logout success",
        tip: "login after can use cloud backup, log share, log rule upload, etc."
      },
      general: {
        header_text: "General",
        language_label_text: "language",
        tag_label_text: "tag",
        default_log_folder_label_text: "default log folder",
        open_on_login_label_text: "open on login",
        encoding_label_text: "encoding",
        end_of_line_sequence_label_text: "end of line sequence",
        log_description_label_text: "log description",
        tag_tip_description: 'Open the tag option, you can see the source of the log at the back of the log list.',
        language: {
          ch: "简体中文",
          en: "English",
          jp: "日本語",
          kor: "한국어",
        },
        dropdown_type: {
          inside: "inside",
          system: "system",
        },
      },
      theme: {
        header_text: "Theme",
        theme_label_text: "theme color",
        window_opacity_label_text: "window opacity",
        theme: {
          dark: "dark",
          light: "light",
          system: "system"
        }
      },
      shortcut: {
        key_label_text: "key",
        action_label_text: "action",
        reset_btn_text: "reset",
        header_text: "Shortcut",
        tabel_action_text: "action",
        table_key_text: "key",
        shorrcut_enable_label_text: "enable",
        enable_text: "enable",
        disable_text: "disable",
        spin_tip: "enable shortcut to edit",
        none_key_tip: "none key",
        edit_input_placeholder: "esc to cancel",
      },
      update: {
        header_text: "Update",
        update_btn_text: "check update",
        channel_label_text: "channel",
        stable_channel_text: "stable",
        beta_channel_text: "beta",
        auto_check_label_text: "auto check",
        update_interval_label_text: "update interval",
        day_text: "day",
        last_check_time_label_text: "last check",
      },
      about: {
        header_text: "About",
        author: "author: Creaster",
        version: version,
        feedback_btn_text: "feedback",
        changelog_btn_text: "changelog",
        developer: "developer",
        thanks: "thanks",
      }
    },
    dialog: {
      edit_log_detail: {
        confirm_btn_text: "confirm",
        cancel_btn_text: "cancel",
      },
      new_log_rule: {
        title: "New log rule",
        create_rule_placrhole_text_press: "press",
        create_rule_placrhole_text_left: "to paste the first text from the clipboard here",
      },
      import_log_file: {
        title: "Import log file",
      },
      reward: {
        title: 'Reward',
        title_in: 'Thank you for your support',
        subtitle: 'If you like this extension, please consider to donate to the author.',
        ok_btn_text: 'OK~',
        ok_btn_1_text: "I'm done paying. I need to make a request",
        cancel_btn_text: 'No, thanks',
      }
    },
    editor: {
      log_editor: {
        log_description: {
          name: "name",
          filename: "filename",
          file: 'path',
          recordDate: "record date",
          createDate: "create date",
          uuid: "uuid",
          analyseSuccessful: "analyse successful",
          lastModifiedData: "last modified data",
          description: "description",
        },
        close_descriotion_btn_text: "close",
        edit_descriotion_btn_text: "edit",
        save_descriotion_btn_text: "save",
        log_table_label_text: "log table",
        log_description_closed_text: "log description closed, you can reopen it on performance panel",
        search_input_placeholder: "search log",
      },
    },
    welcome: {
      steper: {
        welcome_step_label_text: "welcome",
        login_step_label_text: "account",
        setting_step_label_text: "setting",
        finish_step_label_text: "finish",
      },
      bottom_button: {
        prev_button_text: "prev",
        next_button_text: "next",
        finish_button_text: "finish",
      },
      welcome_page: {
        description_1: "is a log management tool",
        description_2: "Supports custom log resolution rules",
        description_3: "Support a variety of encoding format, a variety of display, support screening, search keywords",
        description_4: "After login, you can synchronize logs in the cloud, share logs, and log rules",
      },
      finish_page: {
        title: "congratulations",
        subtitle: "You have completed the necessary setup, click the button below to start using it",
      }
    },
    shortcut: {
      action: {
        import_local_log: 'import local log',
        import_shared_log: 'import shared log',
        settings: 'settings',
        setting_general: 'setting-general',
        setting_shortcut: 'setting-shortcut',
        setting_account: 'setting-account',
        setting_about: 'setting-about',
        setting_log: 'setting-log',
        setting_theme: 'setting-theme',
        setting_update: 'setting-update',
        search_log_file: 'search log',
        search_log_rule: 'search log rule',
        search_log_field: 'search log field',
        switch_opend_tab: 'switch opened tab(1-9)',
        share_log: 'share log',
        share_log_rule: 'share log rule',
        close_current_tab: 'close current tab',
        close_all_tabs: 'close all tabs',
        close_other_tabs: 'close other tabs',
      }
    }
  },
}

export default en