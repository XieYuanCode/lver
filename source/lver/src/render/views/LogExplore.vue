<template>
  <div class="LogExplore">
    <p class="log-explore-title">{{ $t("view.explore.log_explore.title") }}</p>
    <lver-skeleton :animation="true" v-if="skeleton">
      <lver-space direction="vertical" :style="{ width: '100%' }" size="large">
        <lver-skeleton-line :rows="3" />
      </lver-space>
    </lver-skeleton>
    <lver-input-search
      id="log-search-input"
      size="mini"
      v-model="searchKey"
      class="search-input"
      v-if="!skeleton"
      @keydown="handleLogSearchKeyDown"
      :placeholder="$t('view.explore.log_explore.searcher_placeholder')"
    />
    <lver-dropdown
      size="mini"
      trigger="contextMenu"
      alignPoint
      :style="{ display: 'block' }"
      v-if="store.state.appearance.dropdownType === 'inside'"
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
      @contextmenu.capture="handleLogContextMenu"
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
import { createRenameInput } from '../utils/createElement';

const { t } = useI18n()
const store = useStore();
const currentInstance = getCurrentInstance()

const skeleton = computed(() => store.state.appearance.logSkeleton);

const searchKey = ref("")

const logList = computed(() => store.getters.renderedLogList)

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

const handleLogSearchKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    searchKey.value = ""
    document.getElementById("log-search-input")?.children[0]?.blur()
  }
}

const openInEditor = (nodeData: ILog) => {
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

const handleLogContextMenu = (e: any, arg: any) => {
  if (store.state.appearance.dropdownType === 'inside') return
  e.preventDefault();

  const clickedLogUuid = e?.path?.find((item: any) => item?.className?.split(" ")?.includes('arco-tree-node'))?.attributes?.uuid?.nodeValue

  const contentMenuTemplate: any = [
    {
      id: `log_content_menu_open:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.open")
    },
    {
      id: `log_content_menu_edit:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.editDetail")
    },
    { type: 'separator' },
    {
      id: `log_content_menu_open_local:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.open_local")
    },
    { type: 'separator' },
    {
      id: `log_content_menu_rename:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.rename")
    },
    { type: 'separator' },
    {
      id: `log_content_menu_delete:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.delete")
    },
    {
      id: `log_content_menu_delete_local:${clickedLogUuid}`,
      label: t("view.explore.log_explore.context_menu.delete_local")
    },
    { type: 'separator' },
    {
      id: `log_content_menu_share:${clickedLogUuid}`,
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

const createNewGroup = () => {
  console.log('createNewGroup');
}

const rename = (nodeData: ILog) => {
  // 找到所有的treeNode
  const treeNodes = document.getElementsByClassName("arco-tree-node")
  // 找到目标treeNode
  const targetElementNode = Array.from(treeNodes).find(treeNode => treeNode.getAttribute('uuid') === nodeData.uuid)
  if (!targetElementNode) return

  const parentElement = targetElementNode?.parentElement;
  let restored = false

  const input = createRenameInput()
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


  const { ipcRenderer } = require('electron')

  ipcRenderer.on('search_log_file', (e, arg) => {
    document.getElementById("log-search-input")?.children[0]?.focus()
  })

  ipcRenderer.on('context-menu-click', (e, arg) => {
    const [command, uuid] = arg.split(":")
    const clickedLog = store.state.logView.logList.find(log => log.uuid === uuid)

    if (!clickedLog) return

    if (command === "log_content_menu_open") {
      openInEditor(clickedLog)
    } else if (command === "log_content_menu_edit") {
      openInEditor(clickedLog)
    } else if (command === "log_content_menu_open_local") {
      openInLocal(clickedLog)
    } else if (command === "log_content_menu_rename") {
      rename(clickedLog)
    } else if (command === "log_content_menu_delete") {
      deleteLog(clickedLog)
    } else if (command === "log_content_menu_delete_local") {
      deleteLocalLog(clickedLog)
    } else if (command === "log_content_menu_share") {
      shareLog(clickedLog)
    }
  })
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
