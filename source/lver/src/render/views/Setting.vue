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
              field="encoding"
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
            <!-- 语言 -->
            <lver-form-item field="login" :label="$t('view.setting.account.login_text')">
              <lver-space>
                <lver-button type="outline" size="mini" @click="loginWithWechat">
                  <template #icon>
                    <icon-wechat />
                  </template>
                  <template #default>{{ $t('view.setting.account.login.wechat') }}</template>
                </lver-button>
                <lver-button type="outline" size="mini" @click="loginWithQQ">
                  <template #icon>
                    <icon-qq />
                  </template>
                  <template #default>{{ $t('view.setting.account.login.qq') }}</template>
                </lver-button>
                <lver-button type="outline" size="mini" @click="loginWithGithub">
                  <template #icon>
                    <icon-github />
                  </template>
                  <template #default>{{ $t('view.setting.account.login.github') }}</template>
                </lver-button>
              </lver-space>
            </lver-form-item>
            <lver-form-item field="tip">
              <lver-typography-text type="secondary">{{ $t('view.setting.account.tip') }}</lver-typography-text>
            </lver-form-item>
          </lver-space>
        </lver-form>
        <div v-if="isLogined" class="user-info">
          <lver-card :style="{ width: '360px' }" :title="store.state.user.name" hoverable>
            <template #extra>
              <lver-link>Log out</lver-link>
            </template>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in
            China and around the world. Toutiao started out as a news recommendation
            engine and gradually evolved into a platform delivering content in various
            formats.
          </lver-card>
        </div>
        <lver-divider orientation="center">{{ $t("view.setting.account.header_text") }}</lver-divider>
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
      </lver-tab-pane>关于
      <lver-tab-pane key="about">
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
import { ref, computed } from "vue";
import { ThemeType } from "../model/theme";
import { useStore } from "../store";

const store = useStore();
const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);
const tag = ref(store.state.appearance.tag)
const encoding = ref(store.state.appearance.encoding)
const endOfLineSequence = ref(store.state.appearance.endOfLineSequence)
const isLogined = computed(() => store.state.user.logined)

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
const tagChanged = (e: string) => { store.commit("switchTagVisible", e) };
const encodingChanged = (e: string) => { store.commit("switchEncoding", e) };
const endOfLineSequenceChanged = (e: string) => { store.commit("switchEndOfLineSequence", e) }

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
 * 微信登陆
 */
const loginWithWechat = () => { store.commit('login') }
/**
 * QQ登陆
 */
const loginWithQQ = () => { store.commit('login') }
/**
 * github登陆
 */
const loginWithGithub = () => { store.commit('login') }
</script>

<style scoped>
.setting-title {
  margin-bottom: 30px;
}
</style>