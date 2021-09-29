<template>
  <n-config-provider :theme="theme" class="full-config-panel">
  </n-config-provider>
</template>

<script>
import { defineComponent, ref } from "vue";
import { darkTheme } from "naive-ui";

export default defineComponent({
  setup() {
    return {
      darkTheme,
      theme: ref(null),
    };
  },
});
</script>


<style>
.full-config-panel {
  width: 100%;
  height: 100%;
}
</style>
