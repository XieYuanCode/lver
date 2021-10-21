<template>
  <n-config-provider :theme="theme" class="full-config-panel">
    <n-notification-provider>
      <n-dialog-provider>
        <n-layout has-sider class="layout">
          <n-layout-sider
            class="explore"
            :native-scrollbar="false"
            collapse-mode="transform"
            :collapsed-width="10"
            :width="240"
            show-trigger="arrow-circle"
            content-style="padding: 24px; height: 100%;"
            bordered
          >
            <explore></explore>
          </n-layout-sider>
          <n-layout-content content-style="padding: 24px;">
            <n-button @click="swtichTheme" size="tiny">
              {{
                $t("temp.theme_btn_text")
              }}
            </n-button>
            <n-button @click="closeLogSkeleton" size="tiny">
              {{
                $t("temp.closeLogSkeleton_btn_text")
              }}
            </n-button>
            <n-button @click="closeLogRuleSkeleton" size="tiny">
              {{
                $t("temp.closeLogRuleSkeleton_btn_text")
              }}
            </n-button>
            <n-popselect
              v-model:value="language"
              :options="languageOptions"
              @update:value="languageChanged"
              trigger="click"
            >
              <n-button size="tiny">
                {{
                  $t("temp.switchLanguage_btn_text")
                }}
              </n-button>
            </n-popselect>
          </n-layout-content>
        </n-layout>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { darkTheme } from "naive-ui";
import Explore from "./views/Explore.vue";
import { useStore } from "vuex";
import { key } from "./store";
import { SelectBaseOption } from "naive-ui/lib/select/src/interface";

const store = useStore(key);

const theme = computed(() => store.state.appearance.theme);
const language = computed(() => store.state.appearance.language);

const languageOptions = [
  {
    label: "ch",
    value: "ch",
  },
  {
    label: "en",
    value: "en",
  },
  {
    label: "jp",
    value: "jp",
  },
  {
    label: "fr",
    value: "fr",
  },
  {
    label: "kor",
    value: "kor",
  },
];

const languageChanged = (
  value: string | number | Array<string | number> | null
) => {
  store.commit("switchLanguage", value);
};

const swtichTheme = () => store.commit("switchTheme");
const closeLogSkeleton = () => store.commit("closeLogSkeleton");
const closeLogRuleSkeleton = () => store.commit("closeLogRuleSkeleton");
</script>


<style>
body {
  background: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(10px);
}
.full-config-panel {
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(10px);
}

.explore,
.layout {
  height: 100%;
}

.explore {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
