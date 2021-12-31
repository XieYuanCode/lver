<template>
  <div class="short-cut-panel">
    <lver-spin
      :loading="!store.state.appearance.isShortcutEnable"
      :style="{ width: '100%', cursor: !store.state.appearance.isShortcutEnable ? 'not-allowed' : 'auto' }"
      :tip="$t('view.setting.shortcut.spin_tip')"
    >
      <template #element>
        <icon-stop />
      </template>
      <table class="short-cut-table" style="border-spacing: 5px; border-collapse: collapse;">
        <tr class="short-cut-table-header">
          <td class="short-cut-table-key">
            <h3>{{ $t('view.setting.shortcut.action_label_text') }}</h3>
          </td>
          <td class="short-cut-table-value">
            <h3>{{ $t('view.setting.shortcut.key_label_text') }}</h3>
          </td>
          <td>
            <lver-button type="text" size="mini" @click="resetShortcut">{{ $t('view.setting.shortcut.reset_btn_text') }}</lver-button>
          </td>
        </tr>
        <tr
          v-for="shortcut in shortcutList"
          class="shortcut-field"
          @dblclick="editShortcut($event, shortcut)"
        >
          <td class="short-cut-table-key">
            <shortcut-action :action="shortcut.action" :action-tip="shortcut.action"></shortcut-action>
          </td>
          <td class="short-cut-table-value">
            <input
              :id="`shortcut-key-${shortcut.action}`"
              v-if="shortcut.isEditing"
              class="edit-shortcut-input"
              @keydown="handleShortcutKeydown($event, shortcut)"
              @blur="handleShortcutBlur($event, shortcut)"
              :placeholder="$t('view.setting.shortcut.edit_input_placeholder')"
            />
            <shortcut-key
              :show-key="shortcut.action !== Action.SwitchOpendTab"
              :shortcut-key="shortcut.key"
              v-if="!shortcut.isEditing"
              :extend-string="shortcut.action === Action.SwitchOpendTab ? '1-9' : undefined"
            ></shortcut-key>
          </td>
        </tr>
      </table>
    </lver-spin>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store"
import ShortcutKey from "./ShortcutKey.vue";
import ShortcutAction from "./ShortcutAction.vue";
import { IShortcut } from "../store/shortcut";
import { computed, nextTick, ref } from "vue";
import { Key, ShortcutAction as Action } from "../model/shortcut";

const store = useStore()
const shortcutList = computed(() => store.state.shortcut.shortcutList)

const editShortcut = (e: MouseEvent, arg: IShortcut) => {
  store.commit("startEditShortcut", arg)
  nextTick(() => {
    document.getElementById(`shortcut-key-${arg.action}`)?.focus()
  })

}

const handleShortcutBlur = (e: FocusEvent, arg: IShortcut) => {
  store.commit("finishEditShortcut", arg)
}

const handleShortcutKeydown = (e: KeyboardEvent, arg: IShortcut) => {
  e.preventDefault()
  if (e.key === Key.Escape) {
    store.commit("finishEditShortcut", arg)
  }
}

const resetShortcut = () => {
  store.commit("resetShortcut")
}
</script>

<style scoped>
.short-cut-panel {
  width: 100%;
}

.short-cut-table {
  width: 90%;
}

.short-cut-table-key {
  width: 30%;
}

.short-cut-table-value {
  width: 40%;
}

.shortcut-field {
  height: 30px;
}
.shortcut-field:hover {
  background-color: var(--color-neutral-2);
}

.edit-shortcut-input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--color-neutral-3);
  outline: none;
  height: 20px;
  background-color: var(--color-neutral-3);
}

/* .edit-shortcut-input:hover {
  background-color: var(--color-neutral-2);
} */
</style>