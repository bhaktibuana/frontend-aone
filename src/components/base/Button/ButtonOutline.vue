<script setup lang="ts">
import { PropType } from "vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import BaseIcon from "@/components/base/Icon/Icon.vue";

defineProps({
  label: {
    type: String,
    default: "Batalkan",
  },
  size: {
    type: String,
    default: "large",
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  form: {
    type: String,
    default: "",
  },
  htmlType: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<string | "default" | "primary" | "danger">,
    default: "default",
  },
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: tokenProperties.defaultBorderRadius,
        fontFamily: tokenProperties.defaultFontFamily,
      },
    }"
  >
    <a-button
      :form="form"
      :html-type="htmlType"
      :size="size"
      :class="`default-cancel-button button ${type === 'danger' && 'danger'} ${
        type === 'primary' && 'primary'
      }`"
      :disabled="disabled"
    >
      <base-icon v-if="icon" :name="icon" :stroke-width="2.5" color="" />
      {{ label }}
    </a-button>
  </a-config-provider>
</template>

<style scoped lang="scss">
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $size-8;
  width: 100%;
  font-weight: 700 !important;

  &:hover {
    border-color: $primary !important;
    color: $primary !important;
  }
}

.danger {
  border-color: $danger !important;
  color: $danger !important;
  &:hover {
    filter: brightness(120%);
  }
}

.primary {
  border-color: $primary !important;
  color: $primary !important;
  &:hover {
    filter: brightness(110%);
  }
}
</style>
