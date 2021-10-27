<template>
  <n-card title="Setting" :bordered="false" size="huge">
    <n-card hoverable>
      <n-tabs default-value="account" type="line">
        <n-tab-pane name="account" tab="Account">
          <n-avatar :size="100" round>
            <n-icon>
              <div v-html="svgCode"></div>
            </n-icon>
          </n-avatar>
        </n-tab-pane>
        <n-tab-pane name="theme" tab="Theme">Hey Jude</n-tab-pane>
        <n-tab-pane name="about" tab="About">七里香</n-tab-pane>
      </n-tabs>
    </n-card>

    <template #action>
      <n-space justify="end">
        <n-button :disabled="isSettingChanged" @click="confirmSetting">confirm</n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import multiavatar from '@multiavatar/multiavatar'

const svgCode = ref(multiavatar('Binx Bond'))

const isSettingChanged = computed(() => {
  return true
})

const confirmSetting = () => { }

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