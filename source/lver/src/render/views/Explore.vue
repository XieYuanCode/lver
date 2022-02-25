<template>
  <div class="explore-main">
    <input id="file-input" type="file" name="name" v-show="false" multiple @input="uploadLogFile" />
    <div class="explore-main-hearder">
      <lver-radio-group type="button" size="mini" v-model="currentExploreSelected">
        <lver-radio value="log">
          {{
            $t("view.explore.log_view_btn_text")
          }}
        </lver-radio>
        <lver-radio value="log_rule">
          {{
            $t("view.explore.log_rule_view_btn_text")
          }}
        </lver-radio>
      </lver-radio-group>
    </div>
    <component :is="exploreView" class="explore-view"></component>
    <div class="export-view-bottom">
      <lver-button
        :type="settingViewVisible === true ? 'primary' : 'text'"
        shape="circle"
        @click="switchSettingViewVisible"
      >
        <template #icon>
          <icon-settings />
        </template>
      </lver-button>
      <lver-dropdown v-if="store.state.appearance.dropdownType === 'inside'" size="mini">
        <lver-button type="primary" shape="circle">
          <icon-plus />
        </lver-button>
        <template #content>
          <lver-doption
            v-if="currentExploreSelected === 'log'"
            :disabled="store.state.appearance.logSkeleton"
            @click="openFileSelectDialog"
          >
            <icon-import />
            {{
              $t("view.explore.log_explore.addbutton.import_log")
            }}
          </lver-doption>
          <lver-doption
            v-if="currentExploreSelected === 'log'"
            :disabled="store.state.appearance.logSkeleton"
            @click="importSharedLog"
          >
            <icon-cloud-download />
            {{
              $t("view.explore.log_explore.addbutton.import_shared_log")
            }}
          </lver-doption>
          <lver-doption
            v-else
            :disabled="store.state.appearance.logRuleSkeleton"
            @click="openNewRuleDialog"
          >
            {{
              $t("view.explore.log_rule_explore.addbutton.new_log_rule")
            }}
          </lver-doption>
        </template>
      </lver-dropdown>
      <lver-button type="primary" shape="circle" @click="showLogExploreAddButton" v-else>
        <icon-plus />
      </lver-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, getCurrentInstance, h } from 'vue';
import LogExplore from "./LogExplore.vue";
import LogRuleExplore from "./LogRuleExplore.vue";
import { useStore } from '../store';
import { IconSettings } from '@arco-design/web-vue/es/icon';
import { Log } from '../model/iLog';
import { uuid } from '../utils/uuid';
import { ShortcutAction } from '../model/shortcut';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const store = useStore()

const currentExploreSelected = ref("log")
const exploreView = computed(() => currentExploreSelected.value === "log" ? LogExplore : LogRuleExplore)

const settingViewVisible = computed(() => store.state.appearance.settingViewVisible)
const switchSettingViewVisible = () => { store.commit("switchSettingViewVisible", !settingViewVisible.value) }

// const internalInstance = getCurrentInstance()
let selectFileInput: HTMLInputElement

const showLogExploreAddButton = (e: PointerEvent) => {
  if (store.state.appearance.dropdownType === 'inside') return

  let contentMenuTemplate;
  if (currentExploreSelected.value === "log") {
    contentMenuTemplate = [
      {
        id: 'log_explore_content_menu_add_group',
        label: t("view.explore.log_explore.addbutton.add_group")
      },
      { type: 'separator' },
      {
        id: 'log_explore_content_menu_import_log',
        label: t("view.explore.log_explore.addbutton.import_log")
      },
      {
        id: 'log_explore_content_menu_import_shared_log',
        label: t("view.explore.log_explore.addbutton.import_shared_log")
      }
    ]
  } else {
    contentMenuTemplate = [
      {
        id: 'log_explore_content_menu_new_log_rule',
        label: t("view.explore.log_rule_explore.addbutton.new_log_rule")
      }
    ]
  }

  require('electron').ipcRenderer.send('show-context-menu', {
    contentMenuTemplate,
    x: e.clientX,
    y: e.clientY
  })
}

const openFileSelectDialog = () => {
  selectFileInput = document.getElementById("file-input") as HTMLInputElement
  selectFileInput?.click()
}

const importSharedLog = () => {
  console.log('importSharedLog');
}

const uploadLogFile = () => {
  if (!selectFileInput?.files?.length) return
  if (selectFileInput?.files?.length <= 0) return

  for (let index = 0; index < selectFileInput.files.length; index++) {
    const file = selectFileInput.files.item(index)

    const log = new Log(file?.name || "", uuid(), (file as any)?.path as string, file?.size)
    log.lastModifiedData = (file as any)?.lastModifiedDate

    store.commit("appendNewLogFile", log)
  }
}

const openNewRuleDialog = () => {
}

onMounted(() => {
  const { ipcRenderer } = require('electron')
  // 快捷键监听
  ipcRenderer.on(ShortcutAction.ImportLocalLog, () => openFileSelectDialog())
  ipcRenderer.on(ShortcutAction.ImportSharedLog, () => importSharedLog())


  ipcRenderer.on('context-menu-click', (e, arg) => {
    if (arg === "log_explore_content_menu_import_log") {
      openFileSelectDialog()
    } else if (arg === "log_explore_content_menu_import_shared_log") {
      importSharedLog()
    } else if (arg === "log_explore_content_menu_new_log_rule") {
      openNewRuleDialog()
    } else if (arg === "log_explore_content_menu_add_group") {
      console.log('add group');
    }
  })
})
</script>

<style scoped>
.explore-main {
  height: 97%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
}

.explore-main-hearder {
  width: 100%;
  display: flex;
  justify-content: end;
}

.export-view-bottom {
  /* height: 10%; */
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.explore-view {
  height: 85%;
}
</style>
