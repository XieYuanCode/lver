
<template>
  <div>
    <p class="log-rule-explore-title">{{ $t("view.explore.log_rule_explore.title") }}</p>
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
      :placeholder="$t('view.explore.log_rule_explore.searcher_placeholder')"
    />
    <lver-collapse :bordered="false" v-if="!skeleton">
      <lver-collapse-item :header="$t('view.explore.log_rule_explore.collapse.local')" key="1"></lver-collapse-item>
      <lver-collapse-item :header="$t('view.explore.log_rule_explore.collapse.online')" key="2"></lver-collapse-item>
      <lver-collapse-item :header="$t('view.explore.log_rule_explore.collapse.share')" key="3"></lver-collapse-item>
    </lver-collapse>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "../store";

const store = useStore();

const skeleton = computed(() => store.state.appearance.logRuleSkeleton);

const searchKey = ref()

onMounted(() => {
  // TODO: 模拟
  // setTimeout(() => {
  store.commit("switchLogRuleSkeleton", false)
  // }, 1000);
})
</script>

<style scoped>
.log-rule-explore-title {
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