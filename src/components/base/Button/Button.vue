<script setup lang="ts">
import { PropType } from "vue";

import { colors } from "@/assets/styles/colors";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import BaseIcon from "@/components/base/Icon/Icon.vue";

const props = defineProps({
  form: {
    type: String,
    default: "",
  },
  htmlType: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  fontSize: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
  size: {
    type: String,
    default: "large",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<string | "primary" | "danger">,
    default: "primary",
  },
  icon: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  widthAuto: {
    type: Boolean,
    default: false,
  },
});

const getStylingValue = (property: string): string => {
  let value = "";
  switch (property) {
    case "colorBorder": {
      if (props.disabled) {
        value = colors.white;
      } else if (props.type === "danger") {
        value = colors.danger;
      } else {
        value = colors.primary;
      }
      break;
    }
    case "colorPrimary":
      if (props.type === "danger") {
        value = colors.white;
      } else if (props.type === "primary") {
        value = colors.white;
      } else {
        value = colors.primary;
      }
      break;
    case "colorBgContainer":
      if (props.type === "danger") {
        value = colors.danger;
      } else if (props.type === "primary") {
        value = colors.primary;
      } else {
        value = colors.white;
      }
      break;
    case "colorText":
      if (props.type === "danger") {
        value = colors.white;
      } else if (props.type === "primary") {
        value = colors.white;
      } else {
        value = colors.primary;
      }
      break;
    default:
      break;
  }
  return value;
};
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: getStylingValue('colorPrimary'),
        borderRadius: tokenProperties.defaultBorderRadius,
        fontSize: fontSize,
        fontSizeLG: fontSize,
        colorBgContainer: getStylingValue('colorBgContainer'),
        colorText: getStylingValue('colorText'),
        fontFamily: tokenProperties.defaultFontFamily,
        colorBorder: getStylingValue('colorBorder'),
      },
    }"
  >
    <a-button
      :form="form"
      :html-type="htmlType"
      :class="`button ${widthAuto && 'width-auto'}`"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :danger="type === 'danger'"
    >
      <base-icon v-if="icon" :name="icon" :stroke-width="2.5" color="" />
      {{ label }}
    </a-button>
  </a-config-provider>
</template>

<style scoped lang="scss">
.button {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $size-8;
  font-weight: 700 !important;

  &.width-auto {
    width: auto;
  }
}
</style>
