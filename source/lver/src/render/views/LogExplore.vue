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
    <lver-dropdown
      trigger="contextMenu"
      alignPoint
      :style="{ display: 'block' }"
      v-if="store.state.appearance.dropdownType === 'inside'"
      v-model="isInsideLogContentMenuShow"
      :popup-container="dropdownMountedELement"
    >
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
        <template #extra="nodeData" v-if="store.state.appearance.size">
          <lver-typography-text code style="position: absolute; right: 5px">{{ nodeData.sizeText }}</lver-typography-text>
        </template>
      </lver-tree>
      <template #content>
        <lver-doption @click="openInEditor(nodeData)">
          <template #icon>
            <icon-eye />
          </template>
          {{ $t("view.explore.log_explore.context_menu.open") }}
        </lver-doption>
        <lver-doption @click="openInEditor(nodeData)">
          <template #icon>
            <icon-edit />
          </template>
          {{ $t("view.explore.log_explore.context_menu.editDetail") }}
        </lver-doption>
        <lver-divider orientation="center" />
        <lver-doption @click="openInLocal(nodeData)">
          <template #icon>
            <icon-folder />
          </template>
          {{ $t("view.explore.log_explore.context_menu.open_local") }}
        </lver-doption>
        <lver-doption @click="rename(nodeData)">
          <template #icon>
            <icon-tool />
          </template>
          {{ $t("view.explore.log_explore.context_menu.rename") }}
        </lver-doption>
        <lver-doption @click="deleteLog(nodeData)">
          <template #icon>
            <icon-delete />
          </template>
          {{ $t("view.explore.log_explore.context_menu.delete") }}
        </lver-doption>
        <lver-doption @click="deleteLocalLog(nodeData)">
          <template #icon>
            <icon-delete />
          </template>
          {{ $t("view.explore.log_explore.context_menu.delete_local") }}
        </lver-doption>
        <lver-doption @click="shareLog(nodeData)" :disabled="!store.state.user.logined">
          <template #icon>
            <icon-share-alt />
          </template>
          {{ $t("view.explore.log_explore.context_menu.share") }}
        </lver-doption>
      </template>
    </lver-dropdown>
    <lver-tree
      v-if="store.state.appearance.dropdownType === 'system'"
      blockNode
      selectable
      :data="logList"
      :default-expanded-keys="[]"
      size="mini"
      @select="handleLogSelected"
      @contextmenu="handleLogContextMenu"
      v-model:selected-keys="selectedLog"
    >
      <template #extra="nodeData">
        <lver-typography-text
          code
          v-if="store.state.appearance.size"
          style="position: absolute; right: 5px"
        >{{ nodeData.sizeText }}</lver-typography-text>
      </template>
    </lver-tree>

    <lver-empty v-if="!skeleton && !logList" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, h, ref, onMounted, render, createApp, getCurrentInstance, defineComponent } from 'vue';
import { useStore } from "../store";
import ILog from '../model/iLog';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const store = useStore();
const currentInstance = getCurrentInstance()

const skeleton = computed(() => store.state.appearance.logSkeleton);

const searchKey = ref("")

const logList = computed(() => store.getters.renderLogList)
const isInsideLogContentMenuShow = ref(true)
const dropdownMountedELement = ref(null)

const selectedLog = computed({
  get() {
    return [store.state.editorView.activeEditorKey]
  },
  set(activeEditorKey: any[]) {
    store.commit("activeEditor", activeEditorKey[0])
  }
})

const handleLogSelected = (selected: boolean, selectedNode: { node: ILog }) => {
  store.commit('switchSettingViewVisible', false)
  store.commit('openNewEditor', selectedNode.node)
  store.commit('activeEditor', selectedNode.node.key)
}

const openInEditor = (nodeData: ILog) => {
  console.log(dropdownMountedELement.value);
  store.commit('switchSettingViewVisible', false)
  store.commit('openNewEditor', nodeData)
  store.commit('activeEditor', nodeData.key)
}

const deleteLog = (nodeData: ILog) => {
  store.commit('removeLogFile', nodeData.key)
}

const deleteLocalLog = (nodeData: ILog) => {
  require('electron').ipcRenderer.send('delete-file', nodeData.file)
  store.commit('removeLogFile', nodeData.key)
}

const openInLocal = (nodeData: ILog) => {
  require('electron').shell.beep()
  require('electron').shell.showItemInFolder((nodeData as any).file)
}

const shareLog = (nodeData: ILog) => {
  console.log("shareLog");
}

const handleLogContextMenu = (e: PointerEvent, arg: any) => {
  console.log(store.state.appearance.dropdownType);
  if (store.state.appearance.dropdownType === 'inside') {
    isInsideLogContentMenuShow.value = true
  } else {

    e.preventDefault();
    const contentMenuTemplate: any = [
      {
        id: 'log_content_menu_open',
        label: t("view.explore.log_explore.context_menu.open")
      },
      {
        id: 'log_content_menu_edit',
        label: t("view.explore.log_explore.context_menu.editDetail")
      },
      { type: 'separator' },
      {
        id: 'log_content_menu_open_local',
        label: t("view.explore.log_explore.context_menu.open_local")
      },
      { type: 'separator' },
      {
        id: 'log_content_menu_rename',
        label: t("view.explore.log_explore.context_menu.rename")
      },
      { type: 'separator' },
      {
        id: 'log_content_menu_delete',
        label: t("view.explore.log_explore.context_menu.delete")
      },
      {
        id: 'log_content_menu_delete_local',
        label: t("view.explore.log_explore.context_menu.delete_local")
      },
      { type: 'separator' },
      {
        id: 'log_content_menu_share',
        label: t("view.explore.log_explore.context_menu.share"),
        enabled: store.state.user.logined
      }
    ]
    require('electron').ipcRenderer.send('show-context-menu', {
      contentMenuTemplate,
      x: e.clientX,
      y: e.clientY
    })
  }

}

const rename = (nodeData: ILog) => {
  // 找到所有的treeNode
  const treeNodes = document.getElementsByClassName("arco-tree-node")
  // 找到目标treeNode
  const targetElementNode = Array.from(treeNodes).find(treeNode => treeNode.getAttribute('uuid') === nodeData.uuid)
  if (!targetElementNode) return

  const parentElement = targetElementNode?.parentElement;
  let restored = false

  const input = document.createElement("input")
  input.style.width = "200px"
  input.style.height = "12px"
  input.style.marginLeft = "22px"
  input.style.fontSize = "12px"
  input.style.color = "var(--color-text-1)"
  input.style.backgroundColor = "var(--color-fill-2)"
  input.style.border = "1px solid var(--color-border-2)"
  input.style.borderRadius = "var(--border-radius-small)"
  input.style.lineHeight = "1.667"
  input.style.padding = '5px'
  input.style.transition = "color .1s cubic-bezier(0,0,1,1),border-color .1s cubic-bezier(0,0,1,1),background-color .1s cubic-bezier(0,0,1,1)"
  input.style.outline = "none"
  input.spellcheck = false;
  input.value = nodeData.name;
  input.addEventListener('focusout', () => {
    if (restored === false) {
      if (!input.value || input.value.trim() === "") {
        currentInstance?.appContext.config.globalProperties.$message.error(t("view.explore.log_explore.context_menu.rename_empty"))
      } else {
        store.commit("changeLogName", { uuid: nodeData.uuid, value: input.value })
        parentElement?.replaceChild(targetElementNode, input)
      }
    }
  })
  input.addEventListener("keydown", e => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if (!input.value || input.value.trim() === "") {
        currentInstance?.appContext.config.globalProperties.$message.error(t("view.explore.log_explore.context_menu.rename_empty"))
      } else {
        store.commit("changeLogName", { uuid: nodeData.uuid, value: input.value })
        restored = true
        parentElement?.replaceChild(targetElementNode, input)
      }
    } else if (e.code === "Escape") {
      restored = true
      parentElement?.replaceChild(targetElementNode, input)
    }
  })
  parentElement?.replaceChild(input, targetElementNode)
  input.focus()
}

const editDetail = (nodeData: ILog) => {
}

onMounted(() => {
  store.commit("switchLogSkeleton", false)
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

.arco-dropdown-option {
  height: 25px;
  line-height: 25px;
}
</style>
