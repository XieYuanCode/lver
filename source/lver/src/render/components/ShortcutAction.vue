<template>{{ $t(`view.shortcut.action.${props.action}`) }}</template>

<script setup lang="ts">
import { ShortcutAction } from '../model/shortcut';

type ShortcutActionProps = {
  action: ShortcutAction
  actionTip?: string
}
const props = defineProps<ShortcutActionProps>()
</script>