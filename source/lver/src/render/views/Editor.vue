<template>
  <div class="editor-view">
    <lver-tabs
      v-model:active-key="activeEditorKey"
      :editable="true"
      size="mini"
      :animation="true"
      v-if="editors.length > 0"
      @delete="closeEditor"
      class="editor-tab"
    >
      <lver-tab-pane v-for="(editor, index) in editors" :key="editor.key" :title="editor.title">
        <description :log="editor" v-if="isDescriptionShow"></description>
        <log-list-table :editor="editor"></log-list-table>
      </lver-tab-pane>
    </lver-tabs>
    <lver-empty v-else>
      {{
        $t("view.empty_text")
      }}
    </lver-empty>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store';
import Description from '../components/Description.vue';
import LogListTable from '../components/LogListTable.vue';
import ILog from '../model/iLog';

const store = useStore()

const editors = computed(() => store.state.editorView.editorList)
const isDescriptionShow = computed(() => store.state.appearance.logDescription)
const activeEditorKey = computed({
  get() {
    return store.state.editorView.activeEditorKey
  },
  set(key) {
    console.log(key);
    store.commit("activeEditor", key)
  }
})

const closeEditor = (key: string) => store.commit("closeEditor", key)

</script>

<style scoped>
.editor-view {
  height: 100%;
}

.editor-tab {
  height: 100%;
  user-select: none;
}

.lver-descriptions {
  width: 96%;
  margin-bottom: 20px;
  border: 1px solid var(--color-neutral-3);
  padding: 10px;
}
</style>