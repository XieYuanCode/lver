<template>
  <div class="log-description">
    <div class="log-description-header">
      <lver-typography-title :heading="5">
        {{
          $t("view.setting.general.log_description_label_text")
        }}
      </lver-typography-title>
      <lver-button-group>
        <lver-button type="text" @click="closeLogDescription" size="mini">
          <template #icon>
            <icon-close />
          </template>
          {{
            $t("view.editor.log_editor.close_descriotion_btn_text")
          }}
        </lver-button>
        <lver-button
          type="text"
          size="mini"
          @click="editLogDescription"
          v-if="!isDescriptionEditing"
        >
          <template #icon>
            <icon-edit />
          </template>
          {{
            $t("view.editor.log_editor.edit_descriotion_btn_text")
          }}
        </lver-button>
        <lver-button type="primary" size="mini" @click="saveLogDescription" v-else>
          <template #icon>
            <icon-save />
          </template>
          {{
            $t("view.editor.log_editor.save_descriotion_btn_text")
          }}
        </lver-button>
      </lver-button-group>
    </div>

    <description-panel
      :isEditing="isDescriptionEditing"
      ref="descriptionPanel"
      :log="props.log"
      @saveEmit="saveLogDescription"
    ></description-panel>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "../store";
import DescriptionPanel from "./DescriptionPanel.vue";

import ILog from "../model/iLog";

const store = useStore();

const { t } = useI18n();
const currentInstance = getCurrentInstance();

type PropsType = {
  log: ILog;
};

const props = defineProps<PropsType>();
const descriptionPanel = ref<any>(null)

const isDescriptionEditing = ref(false);

const editLogDescription = () => {
  isDescriptionEditing.value = !isDescriptionEditing.value;
};

const closeLogDescription = () => {
  store.commit("switchlogDescription", false);
  currentInstance?.appContext.config.globalProperties.$message.success(
    t("view.editor.log_editor.log_description_closed_text")
  );
};

const saveLogDescription = () => {
  descriptionPanel.value && descriptionPanel.value.save()
  descriptionPanel.value && (isDescriptionEditing.value = false)
}
</script>

<style scoped>
.log-description {
  width: 99%;
}

.log-description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.log-description-editpanel {
  margin-top: 20px;
}
</style>
