<template>
  <div class="log-description">
    <div class="log-description-header">
      <lver-typography-title :heading="5">{{
        $t("view.setting.general.log_description_label_text")
      }}</lver-typography-title>
      <lver-typography-title :heading="5">
        <lver-button type="text" @click="closeLogDescription">{{
          $t("view.editor.log_editor.close_descriotion_btn_text")
        }}</lver-button>
        <lver-button type="text" @click="editLogDescription">{{
          $t("view.editor.log_editor.edit_descriotion_btn_text")
        }}</lver-button>
      </lver-typography-title>
    </div>
    <lver-descriptions
      size="mini"
      :data="descriptionData"
      layout="inline-vertical"
      bordered
      v-if="!isDescriptionEditing"
    />
    <template v-else>
      <div class="log-description-editpanel">
        <lver-form :model="state.form" :style="{ width: '600px' }">
          <lver-form-item field="name" label="名称">
            <lver-input
              v-model="state.form.name"
              placeholder="自定义日志名称"
            />
          </lver-form-item>
          <lver-form-item field="name" label="产生时间">
            <lver-date-picker
              style="width: 220px;"
              show-time
              :time-picker-props="{
                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
              }"
              format="YYYY-MM-DD HH:mm:ss"
              @change="onChangeDate"
              @select="onChangeDate"
              @ok="onChangeDate"
            />
          </lver-form-item>
          <lver-form-item field="name" label="描述">
            <lver-textarea v-model="state.form.description" placeholder="自定义描述" allow-clear/>
          </lver-form-item>

          <lver-form-item>
            <lver-button style="margin-right: 20px" @click="handleCancel">取消</lver-button>
            <lver-button type="primary" :disabled="state.form.name ==='' && state.form.description ==='' && state.form.createDate ===''" @click="handleClickSubmit">确定</lver-button>
          </lver-form-item>
        </lver-form>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, getCurrentInstance, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "store";
import dayjs from "dayjs";

import ILog from "../model/iLog";

const store = useStore();
const { t } = useI18n();
const currentInstance = getCurrentInstance();

type PropsType = {
  log: ILog;
};

type StateType = {
  form: {
    name: string;
    description: string;
    createDate: string;
  };
};

const props = defineProps<PropsType>();

const state = reactive<StateType>({
  form: {
    name: "",
    description: "",
    createDate: "",
  },
});

const descriptionData = computed(() => {
  return [
    {
      label: t("view.editor.log_editor.log_description.name"),
      value: props.log.name,
    },
    {
      label: t("view.editor.log_editor.log_description.uuid"),
      value: props.log.uuid,
    },
    {
      label: t("view.editor.log_editor.log_description.description"),
      value: props.log.description,
    },
    {
      label: t("view.editor.log_editor.log_description.filename"),
      value: props.log.filename,
    },
    {
      label: t("view.editor.log_editor.log_description.file"),
      value: props.log.file,
    },
    {
      label: t("view.editor.log_editor.log_description.recordDate"),
      value: props.log.recordDate.toString(),
    },
    {
      label: t("view.editor.log_editor.log_description.createDate"),
      value: props.log.createDate?.toString(),
    },
    {
      label: t("view.editor.log_editor.log_description.lastModifiedData"),
      value: props.log.lastModifiedData?.toString(),
    },
    {
      label: t("view.editor.log_editor.log_description.analyseSuccessful"),
      value: props.log.analyseSuccessful === true ? "✅" : "❌",
    },
  ];
});

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

const onChangeDate = (dateString: string) => {
  state.form.createDate = dateString;
}

const handleClickSubmit = () => {
  console.log(state.form)
  store.commit("updateLogInfo", state.form);
  handleCancel();
}

const handleCancel = () => {
  isDescriptionEditing.value = false
}
</script>

<style scoped>
.log-description {
  width: 98%;
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
