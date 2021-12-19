<template>
  <div class="short-cut-panel">
    <table class="short-cut-table">
      <tr>
        <td class="short-cut-table-key">Key</td>
        <td>Action</td>
      </tr>
      <tr v-for="shortcut in store.state.shortcut.shortcutList">
        <td class="short-cut-table-key">{{shortcut.key}}</td>
        <td>{{shortcut.action}}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store"

const store = useStore()
console.log(store.state.shortcut.shortcutList);
</script>

<style scoped>
.short-cut-panel {
  width: 100%;
}

.short-cut-table {
  width: 100%;
}

.short-cut-table-key {
  width: 20%;
}
</style>