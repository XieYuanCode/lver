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
      <lver-dropdown>
        <lver-button type="primary" shape="circle">
          <icon-plus />
        </lver-button>
        <template #content>
          <lver-doption v-if="currentExploreSelected === 'log'" :disabled="store.state.appearance.logSkeleton">
            {{
              $t("view.explore.log_explore.addbutton.new_folder")
            }}
          </lver-doption>
          <lver-doption v-if="currentExploreSelected === 'log'" :disabled="store.state.appearance.logSkeleton">
            {{
              $t("view.explore.log_explore.addbutton.import_log")
            }}
          </lver-doption>
          <lver-doption v-else :disabled="store.state.appearance.logRuleSkeleton">
            {{
              $t("view.explore.log_rule_explore.addbutton.new_log_rule")
            }}
          </lver-doption>
        </template>
      </lver-dropdown>
    </div>
    <!-- <lver-space align="end">
      <n-popover trigger="hover" :delay="500">
        <template #trigger>
          <n-button size="small" @click="switchLogExploreView" :type="exploreLogSwitchButtonType">
            <template #icon>
              <log-icon />
            </template>
          </n-button>
        </template>
        <span>{{ $t("view.explore.log_view_btn_text") }}</span>
      </n-popover>
      <n-popover trigger="hover" :delay="500">
        <template #trigger>
          <n-button
            size="small"
            @click="switchLogRuleExploreView"
            :type="exploreLogRuleSwitchButtonType"
          >
            <template #icon>
              <log-rule-icon />
            </template>
          </n-button>
        </template>
        <span>{{ $t("view.explore.log_rule_view_btn_text") }}</span>
      </n-popover>
    </lver-space>
    <component :is="exploreViewType" class="explore-view"></component>
    <n-space justify="end">
      <n-button circle  @click="showSetting">
        <template #icon>
          <setting-icon />
        </template>
      </n-button>
      <n-popselect
        :options="optionsBtnList"
        trigger="click"
        size="small"
        @update:value="popselected"
      >
        <n-button circle>
          <template #icon>
            <cross-icon />
          </template>
        </n-button>
      </n-popselect>
    </n-space>
    <n-modal v-model:show="showCreateLogRuleDialog" preset="card" :style="{ width: '70%' }">
      <create-log-rule-dialog></create-log-rule-dialog>
    </n-modal>
    <n-modal v-model:show="showImportLogFileDialog" preset="card" :style="{ width: '70%' }">
      <import-log-file-dialog></import-log-file-dialog>
    </n-modal>
    <n-modal v-model:show="showSettingDialog" preset="card" :style="{ width: '70%' }">
      <setting-dialog></setting-dialog>
    </n-modal>-->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import LogExplore from "./LogExplore.vue";
import LogRuleExplore from "./LogRuleExplore.vue";
import { useStore } from '../store';

const store = useStore()

const currentExploreSelected = ref("log")
const exploreView = computed(() => currentExploreSelected.value === "log" ? LogExplore : LogRuleExplore)
// import { shallowRef, computed, reactive, ref } from "vue";
// import { useStore } from "../store";
// import LogIcon from "../components/icons/LogIcon.vue";
// import LogRuleIcon from "../components/icons/LogRuleIcon.vue";
// import CrossIcon from "../components/icons/CrossIcon.vue";
// // import { SelectBaseOption } from "naive-ui/lib/select/src/interface";
// import CreateLogRuleDialog from "../components/CreateLogRuleDialog.vue";
// import ImportLogFileDialog from "../components/ImportLogFileDialog.vue";
// import { useI18n } from "vue-i18n";
// import SettingIcon from "../components/icons/SettingIcon.vue";
// import SettingDialog from "../components/SettingDialog.vue";

// const showCreateLogRuleDialog = ref(false);
// const showImportLogFileDialog = ref(false);
// const showSettingDialog = ref(false)

// const exploreViewType = shallowRef(LogExplore);
// const store = useStore();
// const { t } = useI18n();

// const optionsBtnList = computed(() => {
//   return exploreViewType.value === LogExplore
//     ? reactive([
//       {
//         label: computed(() =>
//           t("view.explore.log_explore.addbutton.new_folder")
//         ),
//         value: "new_folder",
//         disabled: ref(store.state.appearance.logSkeleton),
//       },
//       {
//         label: computed(() =>
//           t("view.explore.log_explore.addbutton.import_log")
//         ),
//         value: "import_log_file",
//         disabled: store.state.appearance.logSkeleton,
//       },
//     ])
//     : reactive([
//       {
//         label: computed(() =>
//           t("view.explore.log_rule_explore.addbutton.new_log_rule")
//         ),
//         value: "new_log_rule",
//         disabled: store.state.appearance.logRuleSkeleton,
//       },
//     ]);
// });

// const exploreLogSwitchButtonType = computed(() =>
//   exploreViewType.value === LogExplore ? "primary" : "default"
// );

// const exploreLogRuleSwitchButtonType = computed(() =>
//   exploreViewType.value === LogRuleExplore ? "primary" : "default"
// );

// function switchLogExploreView() {
//   exploreViewType.value = LogExplore;
// }
// function switchLogRuleExploreView() {
//   exploreViewType.value = LogRuleExplore;
// }

// // const popselected = (
// //   value: string | number | Array<string | number> | null,
// //   option: SelectBaseOption | null | Array<SelectBaseOption>
// // ) => {
// //   switch (value) {
// //     case "new_log_rule":
// //       showCreateLogRuleDialog.value = true;
// //       break;
// //     case "import_log_file":
// //       showImportLogFileDialog.value = true;
// //       break;
// //     default:
// //       break;
// //   }
// // };
// const showSetting = () => {
//   showSettingDialog.value = true
// }
</script>

<style scoped>
.explore-main {
  height: 97%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
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
  justify-content: end;
}

.explore-view {
  height: 80%;
}
</style>
