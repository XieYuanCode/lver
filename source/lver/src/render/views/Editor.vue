<template>
  <div class="editor-view">
    <lver-tabs
      :active-key="activeEditorKey"
      :editable="true"
      size="mini"
      :animation="true"
      v-if="editors.length > 0"
      @delete="closeEditor"
      @change="handleActiveEditorChanged"
      class="editor-tab"
    >
      <lver-tab-pane v-for="(editor, index) in editors" :key="editor.key" :title="editor.title">
        <lver-descriptions
          class="lver-descriptions"
          :data="createDescriptions(editor as any)"
          :title="editor.title"
          bordered
        />
        editor.key{{editor.key}}
        activeEditorKey{{activeEditorKey}}
        <log-list-table :path="editor.path"></log-list-table>
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
import LogListTable from '../components/LogListTable.vue';
import ILog from '../model/iLog';

const store = useStore()

const editors = computed(() => store.state.editorView.editorList)
const activeEditorKey = ref(store.state.editorView.activeEditorKey)

const handleActiveEditorChanged = (key: string) => { store.commit("activeEditor", key); }

const createDescriptions = (editor: ILog) => {
  const descriptions = new Array()

  Object.keys(editor).forEach(editorKey => {
    descriptions.push({
      label: editorKey,
      value: (editor as any)[editorKey] || ""
    })
  })

  return descriptions
}

const closeEditor = (key: string) => store.commit("closeEditor", key)

</script>

<style scoped>
.editor-view {
  height: 100%;
}

.editor-tab {
  height: 100%;
}

.lver-descriptions {
  width: 90%;
  margin-bottom: 20px;
}
</style>