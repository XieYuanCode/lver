<template>
  <lver-typography class="setting-view">
    <lver-typography-title
      type="secondary"
      class="setting-title"
    >{{ $t("view.setting.header_text") }}</lver-typography-title>
    <!-- <lver-divider /> -->
    <lver-tabs :animation="true">
      <!-- 通用 -->
      <lver-tab-pane key="general">
        <template #title>
          <icon-settings />
          {{ $t("view.setting.general.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
            <!-- 默认储存位置 -->
            <lver-form-item field="defaultLogFolder">
              {{ t('view.setting.general.default_log_folder_label_text') }}
              <lver-button
                type="text"
                size="mini"
                :style="{ marginLeft: '10px' }"
                @click="openLogFolderDialog"
              >{{ store.state.appearance.defaultLogFolder }}</lver-button>
            </lver-form-item>
            <!-- 语言 -->
            <lver-form-item
              field="language"
              :label="$t('view.setting.general.language_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="languageChanged"
                v-model="language"
              >
                <lver-radio value="ch">
                  {{
                    $t("view.setting.general.language.ch")
                  }}
                </lver-radio>
                <lver-radio value="en">
                  {{
                    $t("view.setting.general.language.en")
                  }}
                </lver-radio>
                <lver-radio value="jp" disabled>
                  {{
                    $t("view.setting.general.language.jp")
                  }}
                </lver-radio>
                <lver-radio value="kor" disabled>
                  {{
                    $t("view.setting.general.language.kor")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 登录时打开 -->
            <lver-form-item
              field="openOnLogin"
              :label="t('view.setting.general.open_on_login_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="openOnLoginChanged"
                v-model="openOnLogin"
              >
                <lver-radio :value="true">
                  {{
                    $t("view.setting.common.yes_text")
                  }}
                </lver-radio>
                <lver-radio :value="false">
                  {{
                    $t("view.setting.common.no_text")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 下拉菜单类型 -->
            <lver-form-item
              field="dropdownType"
              :label="t('view.setting.general.dropdown_type_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="dropdownTypeChanged"
                v-model="dropdownType"
              >
                <lver-radio value="inside">
                  {{
                    $t("view.setting.general.dropdown_type.inside")
                  }}
                </lver-radio>
                <lver-radio value="system">
                  {{
                    $t("view.setting.general.dropdown_type.system")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 大小 -->
            <lver-form-item field="size" :label="t('view.setting.general.size_label_text')">
              <lver-radio-group type="button" size="mini" @change="sizeChanged" v-model="size">
                <lver-radio :value="true">
                  {{
                    $t("view.setting.common.show_text")
                  }}
                </lver-radio>
                <lver-radio :value="false">
                  {{
                    $t("view.setting.common.hide_text")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.general.header_text") }} | {{ languageText }}</lver-divider>
      </lver-tab-pane>
      <!-- 账户 -->
      <lver-tab-pane key="account">
        <template #title>
          <icon-user />
          {{ $t("view.setting.account.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical" v-if="!isLogined">
          <lver-space direction="vertical" size="mini">
            <!-- 账户 -->
            <lver-form-item field="login" :label="$t('view.setting.account.login_text')">
              <lver-space>
                <lver-button
                  type="outline"
                  size="mini"
                  @click="loginWithGithub"
                  :loading="isLogging"
                  :disable="isLogging"
                >
                  <template #icon>
                    <icon-github />
                  </template>
                  <template #default>{{ $t('view.setting.account.login.github') }}</template>
                </lver-button>
                <lver-button
                  type="outline"
                  size="mini"
                  @click="loginWithGitee"
                  :loading="isLogging"
                  :disable="isLogging"
                >
                  <template #default>{{ $t('view.setting.account.login.gitee') }}</template>
                </lver-button>
              </lver-space>
            </lver-form-item>
            <lver-form-item field="tip">
              <lver-typography-text type="secondary">{{ $t('view.setting.account.tip') }}</lver-typography-text>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <div v-if="isLogined" class="user-info">
          <lver-card
            hoverable
            :style="{
              width: '360px',
              marginBottom: '20px'
            }"
          >
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              
              }"
            >
              <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                <lver-avatar
                  :style="{ marginRight: '8px' }"
                  :size="28"
                  @click="handleAvatarClicked"
                >
                  <img alt="avatar" :src="store.state.user.avatar || ''" />
                </lver-avatar>
                <lver-typography-text>{{ store.state.user.name }}</lver-typography-text>
                <lver-typography-text>{{ store.state.user.type === LoginType.Gitee ? "(Gitee)" : "(Github)" }}</lver-typography-text>
              </span>
              <div>
                <lver-link
                  :disabled="isSyncing"
                  @click="cancelAuth"
                >{{ $t('view.setting.account.cancel_auth_text') }}</lver-link>
                <lver-link
                  :disabled="isSyncing"
                  @click="logout"
                >{{ $t('view.setting.account.logout_text') }}</lver-link>
              </div>
            </div>
          </lver-card>
          <lver-divider />
          <div class="user-info-cards">
            <lver-card
              :style="{ width: '360px' }"
              :title="t('view.setting.account.user_info_card.title')"
              hoverable
              class="user-info-card"
            >
              <template #extra>
                <lver-link
                  @click="goToBlog"
                  v-if="store.state.user.blog"
                >{{ t('view.setting.account.user_info_card.blog_btn_text') }}</lver-link>
                <lver-link
                  @click="goToHtmlUrl"
                  v-if="store.state.user.html_url"
                >{{ t('view.setting.account.user_info_card.html_url_btn_text') }}</lver-link>
              </template>
            </lver-card>
            <lver-card
              :loading="isSyncing"
              :style="{ width: '360px' }"
              :title="t('view.setting.account.cloud_info_card.title')"
              hoverable
              class="user-info-card"
            >
              <template #extra>
                <lver-link>{{ t('view.setting.account.cloud_info_card.management_btn_text') }}</lver-link>
                <lver-link
                  :disabled="isSyncing"
                  @click="syncData"
                >{{ $t('view.setting.account.sync_text') }}</lver-link>
              </template>
              <lver-statistic
                :title="t('view.setting.account.cloud_info_card.log_counts')"
                :value="store.state.user.cloud.log_counts"
                show-group-separator
                :style="{ marginBottom: '10px' }"
              />
              <br />
              <lver-statistic
                :title="t('view.setting.account.cloud_info_card.used_size')"
                :value="store.state.user.cloud.used_size"
                show-group-separator
                :style="{ marginBottom: '10px' }"
              >
                <template #suffix>KB</template>
              </lver-statistic>
              <br />
              <lver-statistic
                :title="t('view.setting.account.cloud_info_card.total_size')"
                :value="store.state.user.cloud.total_size"
                show-group-separator
                :style="{ marginBottom: '10px' }"
              >
                <template #suffix>KB</template>
              </lver-statistic>
              <br />
              <lver-statistic
                :title="t('view.setting.account.cloud_info_card.used_percent')"
                :value="store.state.user.cloud.used_percent"
                show-group-separator
              >
                <template #suffix>%</template>
              </lver-statistic>
            </lver-card>
          </div>
        </div>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.account.header_text") }} {{ isLogined ? '| ' : null }} {{ isLogined ? store.state.user.name : null }}</lver-divider>
      </lver-tab-pane>
      <!-- 日志 -->
      <lver-tab-pane key="log">
        <template #title>
          <icon-file />
          {{ $t("view.setting.log.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
            <!-- 编码 -->
            <lver-form-item
              field="encoding"
              :label="$t('view.setting.general.encoding_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="encodingChanged"
                v-model="encoding"
              >
                <lver-radio value="ascii">ascii</lver-radio>
                <lver-radio value="base64">base64</lver-radio>
                <lver-radio value="base64url">base64url</lver-radio>
                <lver-radio value="binary">binary</lver-radio>
                <lver-radio value="hex">hex</lver-radio>
                <lver-radio value="latin1">latin1</lver-radio>
                <lver-radio value="ucs-2">ucs-2</lver-radio>
                <lver-radio value="ucs2">ucs2</lver-radio>
                <lver-radio value="utf-8">utf-8</lver-radio>
                <lver-radio value="utf16le">utf16le</lver-radio>
                <lver-radio value="utf8">utf8</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 换行符 -->
            <lver-form-item
              field="line_sequence"
              :label="$t('view.setting.general.end_of_line_sequence_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="endOfLineSequenceChanged"
                v-model="endOfLineSequence"
              >
                <lver-radio value="LF">LF</lver-radio>
                <lver-radio value="CRLF">CRLF</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 日志描述 -->
            <lver-form-item
              field="log_description"
              :label="t('view.setting.general.log_description_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                @change="logDescriptionChanged"
                v-model="logDescription"
              >
                <lver-radio :value="true">
                  {{
                    t('view.setting.common.show_text')
                  }}
                </lver-radio>
                <lver-radio :value="false">
                  {{
                    t('view.setting.common.hide_text')
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 分页 -->
            <lver-form-item field="pagination" :label="t('view.setting.log.pagination_title')">
              <lver-radio-group
                type="button"
                size="mini"
                @change="paginationChanged"
                v-model="pagination"
              >
                <lver-radio :value="true">
                  {{
                    t('view.setting.common.open_text')
                  }}
                </lver-radio>
                <lver-radio :value="false">
                  {{
                    t('view.setting.common.close_text')
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <lver-divider orientation="center">{{ $t("view.setting.log.header_text") }}</lver-divider>
      </lver-tab-pane>
      <!-- 主题 -->
      <lver-tab-pane key="theme">
        <template #title>
          <icon-brush />
          {{ $t("view.setting.theme.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
            <lver-form-item field="theme" :label="$t('view.setting.theme.theme_label_text')">
              <lver-radio-group type="button" size="mini" @change="themeChanged" v-model="theme">
                <lver-radio value="Dark">{{ $t('view.setting.theme.theme.dark') }}</lver-radio>
                <lver-radio value="Light">{{ $t('view.setting.theme.theme.light') }}</lver-radio>
                <lver-radio value="System">{{ $t('view.setting.theme.theme.system') }}</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <lver-form-item
              field="opacity"
              :label="$t('view.setting.theme.window_opacity_label_text')"
            >
              <lver-slider
                :step="0.01"
                min="0"
                max="1"
                :format-tooltip="(value: string) => value"
                :style="{ width: '200px' }"
                v-model="windowOpacity"
                @change="windowOpacityChanged"
              />
            </lver-form-item>
          </lver-space>
        </lver-form>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.theme.header_text") }} | {{ themeText }}</lver-divider>
      </lver-tab-pane>
      <!-- 快捷键 -->
      <lver-tab-pane key="shortcut">
        <template #title>
          <icon-thunderbolt />
          {{ $t("view.setting.shortcut.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
            <lver-form-item
              field="shorrcut_enable"
              :label="t('view.setting.shortcut.shorrcut_enable_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                v-model="shortcutEnable"
                @change="shortcutEnableChanged"
              >
                <lver-radio :value="true">
                  {{
                    t('view.setting.common.enable_text')
                  }}
                </lver-radio>
                <lver-radio :value="false">
                  {{
                    t('view.setting.common.disable_text')
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <lver-form-item field="reset_shortcut">{{ t('view.setting.shortcut.reset_btn_text') }}</lver-form-item>
          </lver-space>
        </lver-form>
        <shortcut></shortcut>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.shortcut.header_text") }} | {{ platform }} | {{ isShortcutEnableText }}</lver-divider>
      </lver-tab-pane>
      <!-- 更新 -->
      <lver-tab-pane key="update">
        <template #title>
          <icon-to-bottom />
          {{ $t("view.setting.update.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
            <lver-form-item field="update">
              <!-- {{ $t('view.setting.update.update_btn_text') }} -->
              <lver-button
                style="margin-left: -10px;"
                type="text"
                size="small"
                @click="checkUpdate"
                :loading="isCheckingUpdate"
              >{{ $t('view.setting.update.update_btn_text') }}</lver-button>
            </lver-form-item>
            <lver-form-item field="channel" :label="$t('view.setting.update.channel_label_text')">
              <lver-radio-group
                type="button"
                size="mini"
                v-model="updateChannel"
                @change="updateChannelChanged"
              >
                <lver-radio value="Stable">{{ $t('view.setting.update.stable_channel_text') }}</lver-radio>
                <lver-radio value="Beta" disabled>{{ $t('view.setting.update.beta_channel_text') }}</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <lver-form-item
              field="autoCheck"
              :label="t('view.setting.update.auto_check_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                v-model="isAutoCheckUpdate"
                @change="autoCheckUpdateChanged"
              >
                <lver-radio :value="true">{{ $t('view.setting.common.auto_text') }}</lver-radio>
                <lver-radio :value="false">{{ $t('view.setting.common.manual_text') }}</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <lver-form-item
              field="updateInterval"
              :label="$t('view.setting.update.update_interval_label_text')"
            >
              <lver-radio-group
                type="button"
                size="mini"
                v-model="updateInterval"
                :disabled="!isAutoCheckUpdate"
                @change="updateIntervalChanged"
              >
                <lver-radio :value="1">1 {{ $t('view.setting.update.day_text') }}</lver-radio>
                <lver-radio :value="3">3 {{ $t('view.setting.update.day_text') }}</lver-radio>
                <lver-radio :value="7">7 {{ $t('view.setting.update.day_text') }}</lver-radio>
                <lver-radio :value="30">30 {{ $t('view.setting.update.day_text') }}</lver-radio>
              </lver-radio-group>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.update.header_text") }} | {{ $t("view.setting.update.last_check_time_label_text") }}: {{ lastCheckUpdateTime }}</lver-divider>
      </lver-tab-pane>
      <!-- 关于 -->
      <lver-tab-pane keyd="about">
        <template #title>
          <icon-info-circle />
          {{ $t("view.setting.about.header_text") }}
        </template>
        <lver-typography-title
          type="secondary"
          :heading="6"
          @dblclick="handleAuthorClicked"
        >{{ $t("view.setting.about.author") }}</lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">
          github:
          <lver-link @click="openExternal">https://github.com/XieYuanCode</lver-link>
        </lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">
          {{ $t("view.setting.about.thanks") }}
          <lver-link @click="openZerocsssGithub">zerocsss</lver-link>
        </lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">
          <lver-button-group :style="{ marginRight: '20px' }">
            <lver-button
              @click="openChangelogWebsite"
              size="small"
            >{{ $t("view.setting.about.changelog_btn_text") }}</lver-button>
            <lver-button size="small" @click="openChangelogWebsite">
              <template #icon>
                <icon-share-internal />
              </template>
            </lver-button>
          </lver-button-group>
          <lver-button-group>
            <lver-button
              @click="feedback"
              size="small"
            >{{ $t("view.setting.about.feedback_btn_text") }}</lver-button>
            <lver-button size="small" @click="feedback">
              <template #icon>
                <icon-email />
              </template>
            </lver-button>
          </lver-button-group>
        </lver-typography-title>
        <lver-divider
          orientation="center"
        >{{ $t("view.setting.about.header_text") }} ｜ {{ $t("view.setting.about.version") }}</lver-divider>
      </lver-tab-pane>
    </lver-tabs>
    <!-- 关于 -->
  </lver-typography>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, h } from "vue";
import { ThemeType } from "../model/theme";
import { useStore } from "../store";
import { useI18n } from "vue-i18n"
import { LoginType } from "../store/user";
import { isLinux, isMac, isWin } from "../utils/system";
import Shortcut from "../components/Shortcut.vue";

const { shell, ipcRenderer } = require('electron');
const store = useStore();

const { t } = useI18n()
const internalInstance = getCurrentInstance()

const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);
const size = ref(store.state.appearance.size)
const encoding = ref(store.state.appearance.encoding)
const endOfLineSequence = ref(store.state.appearance.endOfLineSequence)
const isLogined = computed(() => store.state.user.logined)
const logDescription = ref(store.state.appearance.logDescription)
const pagination = ref(store.state.appearance.pagination)
const isAutoCheckUpdate = ref(store.state.appearance.autoUpdate)
const updateInterval = ref(store.state.appearance.updateInterval)
const updateChannel = ref(store.state.appearance.updateChannel)
const shortcutEnable = ref(store.state.appearance.isShortcutEnable)
const windowOpacity = ref(store.state.appearance.windowOpacity)
const openOnLogin = ref(store.state.appearance.openOnLogin)
const dropdownType = ref(store.state.appearance.dropdownType)

const platform = isMac() ? "macOS" : isWin() ? "Windows" : isLinux() ? "Linux" : "Unknown"
const isShortcutEnableText = computed(() => shortcutEnable.value ? t("view.setting.shortcut.enable_text") : t("view.setting.shortcut.disable_text"))
const themeText = computed(() => theme.value === ThemeType.Dark ? t("view.setting.theme.theme.dark") : theme.value === ThemeType.System ? t("view.setting.theme.theme.system") : t("view.setting.theme.theme.light"))
const languageText = computed(() => language.value === 'ch' ? t("view.setting.general.language.ch") : language.value === 'en' ? t("view.setting.general.language.en") : language.value === 'jp' ? t("view.setting.general.language.jp") : t("view.setting.general.language.kor"))
const lastCheckUpdateTime = computed(() => store.state.appearance.lastCheckUpdateTime.toLocaleString())

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
const sizeChanged = (e: boolean) => { store.commit("switchSizeVisible", e) };
const encodingChanged = (e: string) => { store.commit("switchEncoding", e) };
const endOfLineSequenceChanged = (e: string) => { store.commit("switchEndOfLineSequence", e) }
const logDescriptionChanged = (e: boolean) => { store.commit('switchlogDescription', e) }
const paginationChanged = (e: boolean) => { store.commit('switchPagination', e) }
const autoCheckUpdateChanged = (e: boolean) => { store.commit('switchAutoUpdate', e) }
const updateIntervalChanged = (e: number) => { store.commit('switchUpdateInterval', e) }
const updateChannelChanged = (e: string) => { store.commit('switchUpdateChannel', e) }
const shortcutEnableChanged = (e: boolean) => { store.commit("switchShortcutEnable", e) }
const windowOpacityChanged = (e: number) => { store.commit("switchWindowOpacity", e) }
const openOnLoginChanged = (e: boolean) => { store.commit("switchOpenOnLogin", e) }
const dropdownTypeChanged = (e: string) => { store.commit("switchDropdownType", e) }

const isLogging = ref(false)
const isSyncing = ref(false)
const isCheckingUpdate = ref(false)


/**
 * 打开外链
 */
const openExternal = () => {
  shell.openExternal('https://github.com/XieYuanCode')
}

/**
 * 反馈
 */
const feedback = () => {
  shell.openExternal("mailto:17010289943@163.com?subject=lver bug report or feature report&body=")
}

/**
 * github登陆
 */
const loginWithGithub = async () => {
  isLogging.value = true
  try {
    shell.openExternal('https://github.com/login/oauth/authorize?client_id=14d1f9d8eaf6722537d1&redirect_uri=http://81.70.22.185:3001/login/github_redirect')
    const response = await fetch(`http://81.70.22.185:3001/login/github`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Github,
        name: loginResult.login,
        avatar: loginResult.avatar_url,
        html_url: loginResult.html_url,
        bio: loginResult.bio,
        blog: loginResult.blog,
      })
      internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.login_success_tip"))
    } else {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
    }
  } catch (error) {
    internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
  } finally {
    isLogging.value = false
  }
}

/**
 * gitee登录
 */
const loginWithGitee = async () => {
  isLogging.value = true
  try {
    shell.openExternal('https://gitee.com/oauth/authorize?client_id=1592815aa8a6d503cd041d93e6273d16f32664f85507d8b1510e43e875b473f3&redirect_uri=http://81.70.22.185:3001/login/gitee_redirect&response_type=code')
    const response = await fetch(`http://81.70.22.185:3001/login/gitee`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Gitee,
        name: loginResult.name,
        avatar: loginResult.avatar_url,
        html_url: loginResult.html_url,
        bio: loginResult.bio,
        blog: loginResult.blog,
      })
      internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.login_success_tip"))
    } else {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
    }
  } catch (error) {
    internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
  } finally {
    isLogging.value = false
  }
}

/**
 * 点击头像
 */
const handleAvatarClicked = () => {
  shell.openExternal(store.state.user.html_url)
}

const goToBlog = () => {
  shell.openExternal(store.state.user.blog)
}

const goToHtmlUrl = () => {
  shell.openExternal(store.state.user.html_url)
}

/**
 * 同步数据
 */
const syncData = async () => {
  isSyncing.value = true
  setTimeout(() => {
    isSyncing.value = false
  }, 3000)
}

/**
 * 登出
 */
const logout = () => {
  store.commit('logout')
  internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.logout_success_tip"))
}

// 取消授权
const cancelAuth = () => {
  const cancelAuthUrl = store.state.user.type === LoginType.Github ? "https://github.com/settings/connections/applications/14d1f9d8eaf6722537d1" : "https://gitee.com/oauth/applications/13616/authorized_application"
  shell.openExternal(cancelAuthUrl)
  logout()
}

// 更新日志
const openChangelogWebsite = () => {

}

/**
 * 打开Zerocsss的github
 */
const openZerocsssGithub = () => {
  shell.openExternal('https://github.com/zerocsss')
}

/**
 * 双击作者名字 打开赞赏码
 */
const handleAuthorClicked = () => {
  internalInstance && internalInstance.appContext.config.globalProperties.$modal.open({
    title: t("view.dialog.reward.title"),
    content: t("view.dialog.reward.subtitle"),
    okText: t("view.dialog.reward.ok_btn_text"),
    cancelText: t("view.dialog.reward.cancel_btn_text"),
    closable: true,
    onOk: () => {
      internalInstance && internalInstance.appContext.config.globalProperties.$modal.open({
        title: t("view.dialog.reward.title_in"),
        okText: t("view.dialog.reward.ok_btn_1_text"),
        content: () => h('img', {
          src: 'src/render/assets/wechat_reward.jpg',
          style: {
            width: '100%',
            height: '100%',
          },
        }),
        onOk: feedback
      })
    }
  })
}
// 打开目录选择
const openLogFolderDialog = () => {
  const folder = ipcRenderer.sendSync('open-log-folder-dialog', {
    title: t("view.setting.general.default_log_folder_label_text"),
  })
  store.commit('switchDefaultLogFolder', folder[0])
}

// 检查更新
const checkUpdate = () => {
  isCheckingUpdate.value = true
  store.commit('switchLastCheckUpdateTime', new Date())
}

// 重置快捷键
const resetShortcut = () => {
  store.commit('resetShortcut')
}
</script>

<style scoped>
.setting-title {
  margin-bottom: 30px;
}

.user-info-cards {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.user-info-card {
  margin-right: 20px;
}

.shortcut-table {
  width: 99%;
}

.setting-view {
  user-select: none;
}
</style>