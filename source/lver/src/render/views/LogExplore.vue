<template>
  <div class="LogExplore">
    <span class="log-explore-title">{{$t("view.explore.log_explore.title")}}</span>
    <n-skeleton v-if="skeleton" text :repeat="3"></n-skeleton>
    <n-input
      v-model:value="pattern"
      v-else
      :placeholder="$t('view.explore.log_explore.searcher_placeholder')"
      class="log-search-input"
    />
    <n-tree
      :pattern="pattern"
      v-if="!skeleton"
      block-line
      :data="logList"
      selectable
      virtual-scroll
      class="loglist"
      draggable
      @drop="handleDrop"
      @update:selected-keys="selectedLog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from "vue";
import { NIcon, useNotification } from "naive-ui";
import FileIcon from "../components/icons/FileIcon.vue";
import FolderIcon from "../components/icons/FolderIcon.vue";
import { useStore } from "../store";
import logManager from "../utils/logManager";
import { NButton } from "naive-ui";

const store = useStore();

const fileIconComponent = () => h(NIcon, {}, [h(FileIcon)]);
const folderIconComponent = () => h(NIcon, {}, [h(FolderIcon)]);
const pattern = ref(null);
const notification = useNotification();

const logList = reactive([
  {
    key: "00000001",
    label: "农行",
    children: [
      {
        key: "00000002",
        label: "2021-08",
        prefix: folderIconComponent,
        children: [
          {
            key: "00000003",
            label: "UI显示异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "00000004",
            label: "技术组件执行异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary" },
                { default: () => "R" }
              ),
          },
        ],
      },
      {
        key: "00000005",
        label: "2021-09",
        prefix: folderIconComponent,
        children: [
          {
            key: "00000006",
            label: "执行速度日志",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "00000007",
            label: "数值传递异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
        ],
      },
    ],
    prefix: folderIconComponent,
  },
  {
    key: "00000008",
    label: "张家港",
    children: [
      {
        key: "00000009",
        label: "2021-08",
        prefix: folderIconComponent,
        children: [
          {
            key: "0000010",
            label: "UI显示异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "0000011",
            label: "技术组件执行异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
        ],
      },
      {
        key: "0000012",
        label: "2021-09",
        prefix: folderIconComponent,
        children: [
          {
            key: "0000013",
            label: "执行速度日志",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "0000014",
            label: "数值传递异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
        ],
      },
    ],
    prefix: folderIconComponent,
  },
  {
    key: "0000015",
    label: "昆山",
    children: [
      {
        key: "0000016",
        label: "2021-08",
        prefix: folderIconComponent,
        children: [
          {
            key: "0000017",
            label: "UI显示异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "0000018",
            label: "技术组件执行异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
        ],
      },
      {
        key: "0000019",
        label: "2021-09",
        prefix: folderIconComponent,
        children: [
          {
            key: "0000020",
            label: "执行速度日志",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
          {
            key: "0000021",
            label: "数值传递异常",
            prefix: fileIconComponent,
            suffix: () =>
              h(
                NButton,
                { text: true, type: "primary", onClick: test },
                { default: () => "R" }
              ),
          },
        ],
      },
    ],
    prefix: folderIconComponent,
  },
]);

const handleDrop = () => {
  notification.warning({
    content: "拖拽还没做好呢",
    meta: "先使用右键排序功能吧！",
    duration: 3000,
  });
};

const test = () => {
  console.log(123);
};
const skeleton = computed(() => store.state.appearance.logSkeleton);

const selectedLog = (node: string | number[]) => {
  if (node.length === 0) return 
  console.log(node);
};
</script>

<style scoped>
.loglist {
  overflow-y: scroll;
}
.log-explore-title {
  user-select: none;
  font-size: 10px;
  font-weight: 900;
  color: rgb(119, 119, 119);
  margin-bottom: 20px;
}
.log-search-input {
  margin: 10px;
}
</style>
