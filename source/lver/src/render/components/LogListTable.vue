<template>
  <div class="log-list-table">
    <lver-spin :loading="isFileLoading" dot>
      <lver-table :columns="tableColumns" :data="tableData" />
    </lver-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, ref } from 'vue';
import { LineSequence } from '../model/LineSequence';
import { useStore } from '../store';

const store = useStore()

const fileContent = ref("")
const isFileLoading = ref(true)

const tableColumns = ref([{
  title: 'Content',
  dataIndex: 'content',
}])

const tableData = ref<any>([])

const props = defineProps({
  path: String
})

const readFileData = () => {
  const fs = require("fs")

  fs.readFile(props.path, store.state.appearance.encoding, (err: Error, data: string) => {
    isFileLoading.value = false;
    fileContent.value = data

    analyse()
  })
}

const analyse = () => {
  const endOfLineSequence = store.state.appearance.endOfLineSequence === LineSequence.CRLF ? "\r\n" : "\n";

  fileContent.value.split(endOfLineSequence).forEach(lineContent => {
    tableData.value.push({
      content: lineContent
    })
  })
}

onMounted(() => {
  readFileData()
})
</script>

<style scoped>
.log-list-table {
  height: 100%;
  overflow-y: scroll;
}
.arco-tabs-content {
  height: 100%;
}
</style>