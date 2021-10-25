import {
  create,
  NButton,
  NPopover,
  NModal,
  NSkeleton,
  NIcon,
  NInput,
  NTree,
  NUpload,
  NSpace,
  NPopselect,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NDialog,
  NDialogProvider,
  NConfigProvider,
  NNotificationProvider,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NPopover,
    NIcon,
    NInput,
    NTree,
    NUpload,
    NModal,
    NSkeleton,
    NSpace,
    NPopselect,
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NDialog,
    NDialogProvider,
    NConfigProvider,
    NNotificationProvider,
  ],
});

export { naive };
