<template>
  <div class="LogExplore">
    <p class="log-explore-title">{{ $t("view.explore.log_explore.title") }}</p>
    <lver-skeleton :animation="true" v-if="skeleton">
      <lver-space direction="vertical" :style="{ width: '100%' }" size="large">
        <lver-skeleton-line :rows="3" />
      </lver-space>
    </lver-skeleton>
    <lver-input-search
      size="mini"
      v-model="searchKey"
      class="search-input"
      v-if="!skeleton"
      :placeholder="$t('view.explore.log_explore.searcher_placeholder')"
    />
    <lver-tree
      blockNode
      selectable
      :data="logList"
      v-if="!skeleton && logList"
      :default-expanded-keys="[]"
      size="mini"
      @select="handleLogSelected"
      v-model:selected-keys="selectedLog"
    >
      <template #extra="nodeData">
        <lver-dropdown>
          <IconMore style="position: absolute; right: 5px; top: 5px;" />
          <template #content>
            <lver-doption
              @click="openInEditor(nodeData)"
            >{{ $t("view.explore.log_explore.context_menu.open") }}</lver-doption>
            <lver-doption
              @click="openInLocal(nodeData)"
            >{{ $t("view.explore.log_explore.context_menu.open_local") }}</lver-doption>
            <lver-doption
              @click="deleteLog(nodeData)"
            >{{ $t("view.explore.log_explore.context_menu.delete") }}</lver-doption>
            <lver-doption>{{ $t("view.explore.log_explore.context_menu.share") }}</lver-doption>
          </template>
        </lver-dropdown>
        <lver-tag
          size="mini"
          style="position: absolute; right: 30px; top: 0px;"
          color="arcoblue"
          v-if="isTagVisiable && nodeData.type === 'local'"
        >{{ $t("view.explore.log_explore.tag.local") }}</lver-tag>
        <lver-tag
          size="mini"
          style="position: absolute; right: 30px; top: 0px;"
          color="green"
          v-if="isTagVisiable && nodeData.type === 'share'"
        >{{ $t("view.explore.log_explore.tag.share") }}</lver-tag>
        <lver-tag
          size="mini"
          style="position: absolute; right: 30px; top: 0px;"
          color="magenta"
          v-if="isTagVisiable && nodeData.type === 'online'"
        >{{ $t("view.explore.log_explore.tag.online") }}</lver-tag>
      </template>
    </lver-tree>
    <lver-empty v-if="!skeleton && !logList" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, h, ref, onMounted } from 'vue';
import { useStore } from "../store";
import { TreeNodeData } from '@arco-design/web-vue/es/tree/interface';
import { IconMore } from '@arco-design/web-vue/es/icon';

const store = useStore();

const skeleton = computed(() => store.state.appearance.logSkeleton);

const searchKey = ref("")

const logList = computed(() => store.getters.renderLogList)
const isTagVisiable = computed(() => store.state.appearance.tag)

const selectedLog = computed({
  get() {
    return [store.state.editorView.activeEditorKey]
  },
  set(activeEditorKey: any[]) {
    store.commit("activeEditor", activeEditorKey[0])
  }
})

const handleLogSelected = (selected: boolean, selectedNode: { node: TreeNodeData }) => {
  store.commit('switchSettingViewVisible', false)
  store.commit('openNewEditor', selectedNode.node)
  store.commit('activeEditor', selectedNode.node.key)
}

const openInEditor = (nodeData: TreeNodeData) => {
  store.commit('switchSettingViewVisible', false)
  store.commit('openNewEditor', nodeData)
  store.commit('activeEditor', nodeData.key)
}

const deleteLog = (nodeData: TreeNodeData) => {
  store.commit('removeLogFile', nodeData.key)
}

const openInLocal = (nodeData: TreeNodeData) => {
  require('electron').shell.showItemInFolder((nodeData as any).path)
}

onMounted(() => {
  // TODO: 模拟
  // setTimeout(() => {
  store.commit("switchLogSkeleton", false)
  // }, 1000);
})
</script>

<style scoped>
.log-explore-title {
  user-select: none;
  font-size: 12px;
  font-weight: 800;
  color: var(--color-text-3);
  margin-bottom: 20px;
}
.search-input {
  margin-bottom: 10px;
}
</style>
