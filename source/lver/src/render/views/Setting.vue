<template>
  <lver-typography>
    <lver-typography-title
      type="secondary"
      class="setting-title"
    >{{ $t("view.setting.header_text") }}</lver-typography-title>
    <!-- <lver-divider /> -->
    <lver-tabs>
      <!-- 通用 -->
      <lver-tab-pane key="general">
        <template #title>
          <icon-settings />
          {{ $t("view.setting.general.header_text") }}
        </template>
        <lver-form :model="{}" layout="vertical">
          <lver-space direction="vertical" size="mini">
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
                <lver-radio value="jp">
                  {{
                    $t("view.setting.general.language.jp")
                  }}
                </lver-radio>
                <lver-radio value="kor">
                  {{
                    $t("view.setting.general.language.kor")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <!-- 标签 -->
            <lver-form-item field="tag" :label="$t('view.setting.general.tag_label_text')">
              <lver-switch size="small" v-model="tag" @change="tagChanged"></lver-switch>
              <lver-trigger class="tip" position="right" auto-fit-position>
                <icon-question-circle-fill style="margin-left: 10px;" />
                <template #content>
                  <lver-card
                    :style="{ width: '360px' }"
                    :title="$t('view.setting.general.tag_label_text')"
                  >
                    <img :src="tag_tip_img_url" />
                    <br />
                    {{
                      $t('view.setting.general.tag_tip_description')
                    }}
                  </lver-card>
                </template>
              </lver-trigger>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <lver-divider orientation="center">{{ $t("view.setting.general.header_text") }}</lver-divider>
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
          <lver-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }"
            >
              <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                <lver-avatar :style="{ marginRight: '8px' }" :size="28">
                  <img alt="avatar" :src="store.state.user.avatar" />
                </lver-avatar>
                <lver-typography-text>{{ store.state.user.name }}</lver-typography-text>
              </span>
              <div>
                <lver-link @click="syncData">{{ $t('view.setting.account.sync_text') }}</lver-link>
                <lver-link @click="logout">{{ $t('view.setting.account.logout_text') }}</lver-link>
              </div>
            </div>
          </lver-card>
        </div>
        <lver-divider orientation="center">{{ $t("view.setting.account.header_text") }}</lver-divider>
      </lver-tab-pane>
      <!-- 日志 -->
      <lver-tab-pane key="log">
        <template #title>
          <icon-brush />
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
              :label="$t('view.setting.general.log_description_label_text')"
            >
              <lver-switch size="small" v-model="logDescription" @change="logDescriptionChanged"></lver-switch>
            </lver-form-item>
            <!-- 分页 -->
            <lver-form-item field="pagination" :label="$t('view.setting.log.pagination_title')">
              <lver-switch size="small" v-model="pagination" @change="paginationChanged"></lver-switch>
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
          </lver-space>
        </lver-form>
        <lver-divider orientation="center">{{ $t("view.setting.theme.header_text") }}</lver-divider>
      </lver-tab-pane>
      <!-- 关于 -->
      <lver-tab-pane keyd="about">
        <template #title>
          <icon-info-circle />
          {{ $t("view.setting.about.header_text") }}
        </template>
        <lver-typography-title type="secondary" :heading="6">{{ $t("view.setting.about.author") }}</lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">
          github:
          <lver-link @click="openExternal">https://github.com/XieYuanCode</lver-link>
        </lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">{{ $t("view.setting.about.version") }}</lver-typography-title>
        <lver-typography-title type="secondary" :heading="6">
          <lver-button @click="feedback">{{ $t("view.setting.about.feedback_btn_text") }}</lver-button>
        </lver-typography-title>
        <lver-divider orientation="center">{{ $t("view.setting.about.header_text") }}</lver-divider>
      </lver-tab-pane>
    </lver-tabs>
    <!-- 关于 -->
  </lver-typography>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import { ThemeType } from "../model/theme";
import { useStore } from "../store";
import { useI18n } from "vue-i18n"
import { LoginType } from "../store/user";

const { t } = useI18n()
const internalInstance = getCurrentInstance()

const store = useStore();
const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);
const tag = ref(store.state.appearance.tag)
const encoding = ref(store.state.appearance.encoding)
const endOfLineSequence = ref(store.state.appearance.endOfLineSequence)
const isLogined = computed(() => store.state.user.logined)
const logDescription = ref(store.state.appearance.logDescription)
const pagination = ref(store.state.appearance.pagination)

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
const tagChanged = (e: boolean) => { store.commit("switchTagVisible", e) };
const encodingChanged = (e: string) => { store.commit("switchEncoding", e) };
const endOfLineSequenceChanged = (e: string) => { store.commit("switchEndOfLineSequence", e) }
const logDescriptionChanged = (e: boolean) => { store.commit('switchlogDescription', e) }
const paginationChanged = (e: boolean) => { store.commit('switchPagination', e) }

const tag_tip_img_url = computed(() => {
  if (store.state.appearance.theme === ThemeType.Dark) {
    return "src/render/assets/setting_tag_tip_dark.png"
  } else if (store.state.appearance.theme === ThemeType.Light) {
    return "src/render/assets/setting_tag_tip_light.png"
  } else if (store.state.appearance.theme === ThemeType.System) {
    if (window.matchMedia('(prefers-color-scheme: Dark)').matches) {
      return "src/render/assets/setting_tag_tip_dark.png"
    } else {
      return "src/render/assets/setting_tag_tip_light.png"
    }
  }
})

const isLogging = ref(false)

/**
 * 打开外链
 */
const openExternal = () => {
  require('electron').shell.openExternal('https://github.com/XieYuanCode')
}

/**
 * 反馈
 */
const feedback = () => {
  require('electron').shell.openExternal("mailto:17010289943@163.com?subject=lver反馈说明&body=")
}

/**
 * github登陆
 */
const loginWithGithub = async () => {
  isLogging.value = true
  try {
    require('electron').shell.openExternal('https://github.com/login/oauth/authorize?client_id=14d1f9d8eaf6722537d1&redirect_uri=http://localhost:8000/login/github_redirect')
    const response = await fetch(`http://localhost:8000/login/github`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Github, name: loginResult.login, avatar: loginResult.avatar_url
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
    require('electron').shell.openExternal('https://gitee.com/oauth/authorize?client_id=1592815aa8a6d503cd041d93e6273d16f32664f85507d8b1510e43e875b473f3&redirect_uri=http://localhost:8000/login/gitee_redirect&response_type=code')
    const response = await fetch(`http://localhost:8000/login/gitee`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Gitee, name: loginResult.name, avatar: loginResult.avatar_url
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

const syncData = async () => { }

const logout = () => {
  store.commit('logout')
  internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.logout_success_tip"))
}
</script>

<style scoped>
.setting-title {
  margin-bottom: 30px;
}
</style>