<template>
  <div class="log-list-table">
    <div class="log-editor-header">
      <lver-typography-title :heading="5">{{ $t('view.editor.log_editor.log_table_label_text') }}</lver-typography-title>
      <lver-auto-complete
        size="mini"
        :data="searchData"
        @search="handleSearch"
        :style="{ width: '320px', height: '24px', marginBottom: '10px' }"
        :placeholder="$t('view.editor.log_editor.search_input_placeholder')"
      />
    </div>
    <lver-table
      :columns="tableColumns"
      :data="tableData"
      size="small"
      class="lver-table"
      :loading="isFileLoading"
      :virtual-list-props="virtualListProps"
      :pagination="isPaginationAvliable"
      :style="{ height: '50%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue';
import ILog from '../model/iLog';
import { LineSequence } from '../model/LineSequence';
import { useStore } from '../store';
import { logRuleManager } from '../utils/logRuleManager';

const store = useStore()

type IProps = {
  editor: ILog
}

const searchData = ref<any>([])

const isPaginationAvliable = computed(() => store.state.appearance.pagination)
const virtualListProps = computed(() => isPaginationAvliable.value === true ? null : { height: 400 })
// 文件内容
const fileContent = ref("")
// 是否正在加载
const isFileLoading = ref(true)

const tableColumns = ref<any>([])

let tableData = reactive<any>([])

const props = defineProps<IProps>()

const readFileData = () => {
  const fs = require("fs")

  fs.readFile(props.editor.file, store.state.appearance.encoding, (err: Error, data: string) => {
    fileContent.value = data

    analyse()
  })
}

const analyse = () => {
  const endOfLineSequence = store.state.appearance.endOfLineSequence === LineSequence.CRLF ? "\r\n" : "\n";

  const logRule = logRuleManager.getLogRuleByName(props.editor.ruleName || "log4js_basic")

  tableColumns.value = logRule?.keys.map(key => { return { title: key, dataIndex: key } })
  searchData.value = logRule?.keys.map(key => `${key}:`)

  fileContent.value.split(endOfLineSequence).forEach(lineContent => {
    const analyseResult = logRule?.analyse(lineContent)
    tableData.push(analyseResult)
  })

  isFileLoading.value = false;
}

const handleSearch = (searchString: string) => {
  if (searchString.includes(":")) {
    // 筛选搜索模式
    const searchKey = searchString.substring(0, searchString.indexOf(":"))
    const searchValue = searchString.substring(searchString.indexOf(":") + 1)
    const filterData = tableData.filter(tableDataItem => tableDataItem[searchKey].includes(searchValue))
  } else {
    // 全局搜索模式
    console.log("全局搜索", tableData);
  }
}

onMounted(() => {
  readFileData()
})
</script>

<style scoped>
.log-list-table {
  width: 99%;
}
.arco-tabs-content {
  height: 100%;
}


.log-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>