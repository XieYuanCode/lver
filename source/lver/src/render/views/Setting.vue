<template>
  <lver-typography>
    <lver-typography-title type="secondary">{{ $t("view.setting.header_text") }}</lver-typography-title>
    <lver-divider />
    <!-- 账户 -->
    <lver-typography-title
      type="secondary"
      :heading="3"
    >{{ $t("view.setting.account.header_text") }}</lver-typography-title>
    <lver-divider />
    <!-- 通用 -->
    <lver-typography-title
      type="secondary"
      :heading="3"
    >{{ $t("view.setting.general.header_text") }}</lver-typography-title>
    <lver-form :model="{}" layout="vertical">
      <lver-space direction="vertical" size="mini">
        <!-- 语言 -->
        <lver-form-item field="language" :label="$t('view.setting.general.language_label_text')">
          <lver-radio-group type="button" size="mini" @change="languageChanged" v-model="language">
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
                <img
                  :src="tag_tip_img_url"
                />
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
    <lver-divider />
    <!-- 主题 -->
    <lver-typography-title type="secondary" :heading="3">{{ $t("view.setting.theme.header_text") }}</lver-typography-title>
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
    <lver-divider />
    <!-- 关于 -->
    <lver-typography-title type="secondary" :heading="3">{{ $t("view.setting.about.header_text") }}</lver-typography-title>
    <lver-typography-title type="secondary" :heading="6">{{ $t("view.setting.about.author") }}</lver-typography-title>
    <lver-typography-title type="secondary" :heading="6">github: <lver-link @click="openExternal">https://github.com/XieYuanCode</lver-link></lver-typography-title>
    <lver-typography-title type="secondary" :heading="6">{{ $t("view.setting.about.version") }}</lver-typography-title>
    <lver-typography-title type="secondary" :heading="6"><lver-button @click="feedback">{{ $t("view.setting.about.feedback_btn_text") }}</lver-button></lver-typography-title>
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

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
const tagChanged = (e: string) => { store.commit("switchTagVisible", e) };

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
const openExternal = ()=>{
  require('electron').shell.openExternal('https://github.com/XieYuanCode')
}

/**
 * 反馈
 */
const feedback = ()=>{
  require('electron').shell.openExternal("mailto:17010289943@163.com?subject=lver反馈说明&body=")
}
</script>

<style scoped>
</style>