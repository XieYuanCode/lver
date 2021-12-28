<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "./store";
import { switchTheme } from "./utils/theme";
import i18n from "./locale";

const store = useStore();

onMounted(() => {
  // TODO: 读取用户配置
  switchTheme(store.state.appearance.theme);
  i18n.global.locale = store.state.appearance.language as "ch" | "en" | "jp" | "kor";
})

</script>

<style scoped>
</style>
