<script setup lang="ts">
import { PropType } from "vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import { generateAvatarLetter, generateColor } from "@/utils/functions";

defineProps({
  isBadgeActive: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<"circle" | "square">,
    default: "circle",
  },
  size: {
    type: [String, Number] as PropType<number | "large" | "small" | "default">,
    default: "default",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: {},
  },
  fontSize: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
});
</script>

<template>
  <a-badge :dot="isBadgeActive">
    <a-avatar
      :shape="shape"
      :size="size"
      :style="{
        backgroundColor: generateColor(`${firstName} ${lastName}`).lightShade,
        color: generateColor(`${firstName} ${lastName}`).darkShade,
        fontSize: fontSize,
        ...style,
      }"
    >
      {{ generateAvatarLetter(firstName, lastName) }}
    </a-avatar>
  </a-badge>
</template>
