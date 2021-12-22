<template>
  <lver-layout class="layout">
    <lver-layout style="height: 100%">
      <lver-layout-sider style="width:280px; height: 100%;">
        <explore></explore>
      </lver-layout-sider>
      <lver-layout-content class="lver-layout-content">
        <editor v-if="!isSettingView"></editor>
        <setting v-if="isSettingView"></setting>
      </lver-layout-content>
    </lver-layout>
  </lver-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Explore from "./views/Explore.vue";
import { useStore } from "./store";
import Setting from "./views/Setting.vue"
import Editor from "./views/Editor.vue"
import { switchTheme } from "./utils/theme";
import i18n from "./locale";

const store = useStore();

const isSettingView = computed(() => store.state.appearance.settingViewVisible)

onMounted(() => {
  // TODO: 读取用户配置
  switchTheme(store.state.appearance.theme);
  i18n.global.locale = store.state.appearance.language as "ch" | "en" | "jp" | "kor";
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
  box-shadow: 0 2px 5px 0 var(--color-text-2);
}

.lver-layout-content {
  height: calc(100% - 20px);
  padding-left: 20px;
  padding-top: 20px;
  background: var(--color-menu-light-bg);
}
</style>
