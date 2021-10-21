<template>
  <n-card title="Import Log File" :bordered="false" size="huge">
    <n-card hoverable>
      <n-upload
        v-if="configureView"
        :default-upload="false"
        multiple
        class="import-log-file-box"
        @update:file-list="importFileChanged"
      >
        <n-upload-dragger class="import-log-file-drag-box">
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px"
            >Click or drag the file to the area to import</n-text
          >
          <n-p depth="3" style="margin: 8px 0 0 0"
            >You can upload multiple log files at once and configure them
            later</n-p
          >
        </n-upload-dragger>
      </n-upload>
      <n-space v-else>
        <ul>
          <li v-for="log in importLogs" :key="log.id">{{log.name}}</li>
        </ul>
      </n-space>
    </n-card>

    <template #action>
      <n-space justify="end">
        <n-button :disabled="configureButtonDisabled" @click="configure"
          >configure</n-button
        >
      </n-space>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { UploadFileInfo } from "naive-ui";

let importLogs = ref<UploadFileInfo[]>([]);
const configureButtonDisabled = ref(true);
const configureView = ref(true);

watch(importLogs, (newValue) => {
  configureButtonDisabled.value = !Boolean(newValue.length > 0);
});

const importFileChanged = (logs: UploadFileInfo[]) => {
  importLogs.value = logs;
  console.log(logs);
};

const configure = () => {
  configureView.value = false;
};
</script>

<style scoped>
.import-log-file-box,
.import-log-file-drag-box {
  width: 100%;
}
</style>

<style>
.n-upload-trigger {
  width: 100%;
}
</style>