<template>
  <lver-typography>
    <lver-typography-title type="secondary">{{ $t("view.setting.header_text") }}</lver-typography-title>
    <lver-divider />
    <lver-typography-title
      type="secondary"
      :heading="3"
    >{{ $t("view.setting.account.header_text") }}</lver-typography-title>
    <lver-divider />
    <lver-typography-title
      type="secondary"
      :heading="3"
    >{{ $t("view.setting.general.header_text") }}</lver-typography-title>
    <lver-form :model="{}" layout="vertical">
      <lver-space direction="vertical" size="mini">
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
      </lver-space>
    </lver-form>
    <lver-divider />
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
  </lver-typography>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../store";

const store = useStore();
const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
</script>

<style scoped></style>