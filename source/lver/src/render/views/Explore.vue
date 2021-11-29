<template>
  <div vertical justify="space-between" class="explore-main">
    <n-space justify="end">
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
    </n-space>
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
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, computed, reactive, ref } from "vue";
import { useStore } from "../store";
import LogIcon from "../components/icons/LogIcon.vue";
import LogRuleIcon from "../components/icons/LogRuleIcon.vue";
import LogExplore from "./LogExplore.vue";
import LogRuleExplore from "./LogRuleExplore.vue";
import CrossIcon from "../components/icons/CrossIcon.vue";
// import { SelectBaseOption } from "naive-ui/lib/select/src/interface";
import CreateLogRuleDialog from "../components/CreateLogRuleDialog.vue";
import ImportLogFileDialog from "../components/ImportLogFileDialog.vue";
import { useI18n } from "vue-i18n";
import SettingIcon from "../components/icons/SettingIcon.vue";
import SettingDialog from "../components/SettingDialog.vue";

const showCreateLogRuleDialog = ref(false);
const showImportLogFileDialog = ref(false);
const showSettingDialog = ref(false)

const exploreViewType = shallowRef(LogExplore);
const store = useStore();
const { t } = useI18n();

const optionsBtnList = computed(() => {
  return exploreViewType.value === LogExplore
    ? reactive([
      {
        label: computed(() =>
          t("view.explore.log_explore.addbutton.new_folder")
        ),
        value: "new_folder",
        disabled: ref(store.state.appearance.logSkeleton),
      },
      {
        label: computed(() =>
          t("view.explore.log_explore.addbutton.import_log")
        ),
        value: "import_log_file",
        disabled: store.state.appearance.logSkeleton,
      },
    ])
    : reactive([
      {
        label: computed(() =>
          t("view.explore.log_rule_explore.addbutton.new_log_rule")
        ),
        value: "new_log_rule",
        disabled: store.state.appearance.logRuleSkeleton,
      },
    ]);
});

const exploreLogSwitchButtonType = computed(() =>
  exploreViewType.value === LogExplore ? "primary" : "default"
);

const exploreLogRuleSwitchButtonType = computed(() =>
  exploreViewType.value === LogRuleExplore ? "primary" : "default"
);

function switchLogExploreView() {
  exploreViewType.value = LogExplore;
}
function switchLogRuleExploreView() {
  exploreViewType.value = LogRuleExplore;
}

// const popselected = (
//   value: string | number | Array<string | number> | null,
//   option: SelectBaseOption | null | Array<SelectBaseOption>
// ) => {
//   switch (value) {
//     case "new_log_rule":
//       showCreateLogRuleDialog.value = true;
//       break;
//     case "import_log_file":
//       showImportLogFileDialog.value = true;
//       break;
//     default:
//       break;
//   }
// };
const showSetting = () => {
  showSettingDialog.value = true
}
</script>

<style scoped>
.explore-view {
  height: 80%;
}
.explore-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
