<template>
  <div class="editor-view">
    <lver-tabs
      :editable="true"
      size="mini"
      :animation="true"
      v-if="editors.length > 0"
      @delete="closeEditor"
    >
      <lver-tab-pane v-for="(editor, index) in editors" :key="editor.key" :title="editor.title"></lver-tab-pane>
    </lver-tabs>
    <lver-empty v-else>
      {{
        $t("view.empty_text")
      }}
    </lver-empty>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore()

const editors = computed(() => store.state.editorView.editorList)

const closeEditor = (key: string) => store.commit("closeEditor", key)

</script>

<style scoped>
.editor-view {
  height: 100%;
}
</style>