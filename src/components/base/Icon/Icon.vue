<script setup lang="ts">
import { PropType } from "vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import {
  IconLayoutSidebarLeftCollapse,
  IconMenu2,
  IconLogout2,
  IconUserCircle,
  IconBell,
} from "@tabler/icons-vue";

defineProps({
  name: {
    type: String as PropType<
      | string
      | "layout-sidebar-left-collapse"
      | "menu-2"
      | "logout-2"
      | "user-circle"
      | "bell"
    >,
    required: true,
  },
  size: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
  color: {
    type: String,
    default: tokenProperties.defaultTextColor,
  },
});
</script>

<template>
  <IconLayoutSidebarLeftCollapse
    v-if="name === 'layout-sidebar-left-collapse'"
    :size="size"
    :strokeWidth="strokeWidth"
    :color="color"
  />
  <IconMenu2
    v-else-if="name === 'menu-2'"
    :size="size"
    :strokeWidth="strokeWidth"
    :color="color"
  />
  <IconLogout2
    v-else-if="name === 'logout-2'"
    :size="size"
    :strokeWidth="strokeWidth"
    :color="color"
  />
  <IconUserCircle
    v-else-if="name === 'user-circle'"
    :size="size"
    :strokeWidth="strokeWidth"
    :color="color"
  />
  <IconBell
    v-else-if="name === 'bell'"
    :size="size"
    :strokeWidth="strokeWidth"
    :color="color"
  />
</template>
