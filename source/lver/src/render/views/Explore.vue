<template>
  <div class="explore-main">
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
      <lver-dropdown>
        <lver-button type="primary" shape="circle">
          <icon-plus />
        </lver-button>
        <template #content>
          <lver-doption
            v-if="currentExploreSelected === 'log'"
            :disabled="store.state.appearance.logSkeleton"
            @click="openFileSelectDialog"
          >
            {{
              $t("view.explore.log_explore.addbutton.import_log")
            }}
            <input
              id="file-input"
              type="file"
              name="name"
              v-show="false"
              multiple
              @input="uploadLogFile"
            />
          </lver-doption>
          <lver-doption v-else :disabled="store.state.appearance.logRuleSkeleton">
            {{
              $t("view.explore.log_rule_explore.addbutton.new_log_rule")
            }}
          </lver-doption>
        </template>
      </lver-dropdown>
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

const store = useStore()

const currentExploreSelected = ref("log")
const exploreView = computed(() => currentExploreSelected.value === "log" ? LogExplore : LogRuleExplore)

const settingViewVisible = computed(() => store.state.appearance.settingViewVisible)
const switchSettingViewVisible = () => { store.commit("switchSettingViewVisible", !settingViewVisible.value) }

// const internalInstance = getCurrentInstance()
let selectFileInput: HTMLInputElement

const openFileSelectDialog = () => {
  selectFileInput = document.getElementById("file-input") as HTMLInputElement
  selectFileInput?.click()
}

const uploadLogFile = () => {
  if (!selectFileInput?.files?.length) return
  if (selectFileInput?.files?.length <= 0) return

  store.commit("changeSelectedFiles", selectFileInput.files)

  for (let index = 0; index < selectFileInput.files.length; index++) {
    const file = selectFileInput.files.item(index)
    const log = new Log(file?.name || "", uuid(), (file as any)?.path as string)

    store.commit("appendNewLogFile", log)
  }
}
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
