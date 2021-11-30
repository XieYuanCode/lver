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
    ></lver-tree>
    <lver-empty v-if="!skeleton && !logList" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, h, ref, onMounted } from 'vue';
import { useStore } from "../store";
import { TreeNodeData } from '@arco-design/web-vue/es/tree/interface';

const store = useStore();

const skeleton = computed(() => store.state.appearance.logSkeleton);

const searchKey = ref("")

const logList = computed(() => store.getters.renderLogList)

const handleLogSelected = (selected: boolean, selectedNode: { node: TreeNodeData }) => {
  // 如果选择的不是目录 就打开
  !selectedNode.node.children && store.commit('openNewEditor', selectedNode.node)
}

onMounted(() => {
  // TODO: 模拟
  setTimeout(() => {
    store.commit("switchLogSkeleton", false)
  }, 1000);
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
