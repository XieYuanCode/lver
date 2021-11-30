<template>
  <lver-layout class="layout">
    <lver-layout>
      <lver-layout-sider style="width:280px;">
        <explore></explore>
      </lver-layout-sider>
      <lver-layout-content>
        <lver-form :style="{ width: '1000px' }" :model="{}">
          <lver-space direction="vertical" size="mini">
            <lver-form-item field="testpage" :label="$t('temp.title_text')"></lver-form-item>
            <lver-form-item field="theme" :label="$t('temp.theme_btn_text')">
              <lver-radio-group type="button" size="mini" @change="themeChanged" v-model="theme">
                <lver-radio value="Dark">Dark</lver-radio>
                <lver-radio value="Light">Light</lver-radio>
                <lver-radio value="System">System</lver-radio>
              </lver-radio-group>
            </lver-form-item>
            <lver-divider />
            <lver-form-item field="LogSkeleton" :label="$t('temp.closeLogSkeleton_btn_text')">
              <lver-switch size="small" v-model="logSkeleton" @change="logSkeletonChanged" />
            </lver-form-item>
            <lver-form-item
              field="LogRuleSkeleton"
              :label="$t('temp.closeLogRuleSkeleton_btn_text')"
            >
              <lver-switch size="small" v-model="logRuleSkeleton" @change="LogRuleSkeletonChanged" />
            </lver-form-item>
            <lver-divider />
            <lver-form-item field="language" :label="$t('temp.switchLanguage_btn_text')">
              <lver-radio-group
                type="button"
                size="mini"
                @change="languageChanged"
                v-model="language"
              >
                <lver-radio value="ch">
                  {{
                    $t("temp.language.ch")
                  }}
                </lver-radio>
                <lver-radio value="en">
                  {{
                    $t("temp.language.en")
                  }}
                </lver-radio>
                <lver-radio value="jp">
                  {{
                    $t("temp.language.jp")
                  }}
                </lver-radio>
                <lver-radio value="kor">
                  {{
                    $t("temp.language.kor")
                  }}
                </lver-radio>
              </lver-radio-group>
            </lver-form-item>
          </lver-space>
        </lver-form>
      </lver-layout-content>
    </lver-layout>
  </lver-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Explore from "./views/Explore.vue";
import { useStore } from "./store";

const store = useStore();

const language = ref(store.state.appearance.language);
const theme = ref(store.state.appearance.theme);
const logSkeleton = ref(store.state.appearance.logSkeleton);
const logRuleSkeleton = ref(store.state.appearance.logRuleSkeleton);

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) };
const logSkeletonChanged = (e: boolean) => { store.commit("switchLogSkeleton", e) }
const LogRuleSkeletonChanged = (e: boolean) => { store.commit("switchLogRuleSkeleton", e) }

onMounted(() => {
  // TODO: 读取用户配置
})

</script>

<style scoped>
body {
  background: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(10px);
}

.layout {
  height: 100%;
}

.arco-layout-sider {
  width: 400px;
}

/* .arco-layout-content {
  width: 200px;
  min-width: 10px;
  max-width: 400px;
} */
</style>
