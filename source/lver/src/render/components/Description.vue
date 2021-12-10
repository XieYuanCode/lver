<template>
  <div class="log-description">
    <div class="log-description-header">
      <lver-typography-title
        :heading="5"
      >{{ $t('view.setting.general.log_description_label_text') }}</lver-typography-title>
      <lver-typography-title :heading="5" style="margin-left: 20px;">
        <lver-button
          type="text"
          @click="closeLogDescription"
        >{{ $t('view.editor.log_editor.close_descriotion_btn_text') }}</lver-button>
        <lver-button
          type="text"
          @click="editLogDescription"
        >{{ $t('view.editor.log_editor.edit_descriotion_btn_text') }}</lver-button>
      </lver-typography-title>
    </div>
    <lver-descriptions
      size="mini"
      :data="descriptionData"
      layout="inline-vertical"
      bordered
      v-if="!isDescriptionEditing"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, getCurrentInstance, ref } from "vue"
import ILog from "../model/iLog"
import { useI18n } from "vue-i18n"
import { useStore } from "../store"

const store = useStore()
const { t } = useI18n()
const currentInstance = getCurrentInstance()

type PropsType = {
  log: ILog
}

const props = defineProps<PropsType>()

const descriptionData = computed(() => {
  return [{
    label: t("view.editor.log_editor.log_description.name"),
    value: props.log.name
  },
  {
    label: t("view.editor.log_editor.log_description.uuid"),
    value: props.log.uuid
  },
  {
    label: t("view.editor.log_editor.log_description.description"),
    value: props.log.description
  },
  {
    label: t("view.editor.log_editor.log_description.filename"),
    value: props.log.filename
  },
  {
    label: t("view.editor.log_editor.log_description.file"),
    value: props.log.file
  },
  {
    label: t("view.editor.log_editor.log_description.recordDate"),
    value: props.log.recordDate.toString()
  },
  {
    label: t("view.editor.log_editor.log_description.createDate"),
    value: props.log.createDate?.toString()
  },
  {
    label: t("view.editor.log_editor.log_description.lastModifiedData"),
    value: props.log.lastModifiedData?.toString()
  },
  {
    label: t("view.editor.log_editor.log_description.analyseSuccessful"),
    value: props.log.analyseSuccessful === true ? "✅" : "❌"
  },
  ]
})

const isDescriptionEditing = ref(false)

const editLogDescription = () => {
  isDescriptionEditing.value = !isDescriptionEditing.value
}

const closeLogDescription = () => {
  store.commit('switchlogDescription', false);
  currentInstance?.appContext.config.globalProperties.$message.success(t('view.editor.log_editor.log_description_closed_text'))
}

</script>

<style scoped>
.log-description {
  width: 98%;
}

.log-description-header {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>