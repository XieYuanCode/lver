<template>
  <div class="description-panel">
    <lver-typography class="description-panel-typography">
      <lver-typography-title :heading="5">{{ props.log.name }}</lver-typography-title>
    </lver-typography>

    <table class="description-panel-table" frame="hsides">
      <tr>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.name") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.uuid") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.filename") }}</th>
      </tr>
      <tr>
        <td
          align="center"
          :style="{ padding: '10px', width: '33%' }"
          v-if="!props.isEditing"
        >{{ props.log.name }}</td>
        <td align="center" :style="{ padding: '6px', width: '33%' }" v-if="props.isEditing">
          <lver-input :style="{ width: '80%' }" size="mini" v-model="editedLogData.name" />
        </td>
        <td align="center" :style="{ padding: '10px', width: '33%' }">{{ props.log.uuid }}</td>
        <td align="center" :style="{ padding: '10px', width: '33%' }">{{ props.log.filename }}</td>
      </tr>
    </table>
    <table class="description-panel-table" frame="hsides">
      <tr>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.createDate") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.lastModifiedData") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.recordDate") }}</th>
      </tr>
      <tr>
        <td
          align="center"
          :style="{ padding: '10px', width: '33%' }"
          v-if="!props.isEditing"
        >{{ props.log.createDate }}</td>
        <td align="center" :style="{ padding: '6px', width: '33%' }" v-if="props.isEditing">
          <lver-date-picker
            :style="{ width: '80%' }"
            size="mini"
            v-model="editedLogData.createDate"
          />
        </td>
        <td
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ props.log.lastModifiedData }}</td>
        <td align="center" :style="{ padding: '10px', width: '33%' }">{{ props.log.recordDate }}</td>
      </tr>
    </table>
    <table class="description-panel-table" frame="hsides">
      <tr>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.description") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.file") }}</th>
        <th
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ $t("view.editor.log_editor.log_description.analyseSuccessful") }}</th>
      </tr>
      <tr>
        <td
          align="center"
          :style="{ padding: '10px', width: '33%' }"
          v-if="!props.isEditing"
        >{{ props.log.description }}</td>
        <td align="center" :style="{ padding: '6px', width: '33%' }" v-if="props.isEditing">
          <lver-input :style="{ width: '80%' }" size="mini" v-model="editedLogData.description" />
        </td>
        <td align="center" :style="{ padding: '10px', width: '33%' }">{{ props.log.file }}</td>
        <td
          align="center"
          :style="{ padding: '10px', width: '33%' }"
        >{{ props.log.analyseSuccessful === true ? "√" : "×" }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import ILog from '../model/iLog';
import { defineProps, computed, reactive, defineExpose } from 'vue';
import { useI18n } from "vue-i18n";
import { useStore } from '../store';
const { t } = useI18n()
const store = useStore()

type PropsType = {
  isEditing: Boolean
  log: ILog
}
const props = defineProps<PropsType>()

const editedLogData = reactive({
  name: props.log.name,
  description: props.log.description,
  createDate: props.log.createDate
})

const save = () => {
  store.commit("updateLogInfo", {
    uuid: props.log.uuid,
    log: editedLogData
  })
}

defineExpose({
  save
})
</script>

<style scoped>
.description-panel {
  padding: 0 20px 0 20px;
  border: 1px solid var(--color-border-2);
}

.description-panel-table {
  width: 100%;
  color: var(--color-text-1);
  margin-bottom: 10px;
}
</style>