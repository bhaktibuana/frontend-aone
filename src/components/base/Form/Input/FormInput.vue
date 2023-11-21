<script setup lang="ts">
import { PropType, ref, watch } from "vue";

import { TValidateStatus } from "@/types";

import { tokenProperties } from "@/utils/constants/tokenProperties";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  fontSize: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
  addonBefore: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  suffixTitle: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
  hasFeedback: {
    type: Boolean,
    default: false,
  },
  validateStatus: {
    type: [String, undefined] as PropType<TValidateStatus>,
    default: undefined,
  },
});

const emit = defineEmits(["update:value"]);

const internalValue = ref<string>(props.value);

const updateValue = (event: { target: HTMLInputElement }): void => {
  internalValue.value = event.target.value;
  emit("update:value", event.target.value);
};

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>

<template>
  <a-form-item
    :label="label"
    :name="name"
    class="mb-0"
    :has-feedback="hasFeedback"
    :validate-status="hasFeedback ? validateStatus : undefined"
    :rules="[
      {
        required: required,
        message: `${label} is required`,
      },
      ...rules,
    ]"
  >
    <a-config-provider
      :theme="{
        token: {
          colorPrimaryHover: tokenProperties.colorPrimary,
          borderRadius: tokenProperties.defaultBorderRadius,
          fontSize: fontSize,
          fontFamily: tokenProperties.defaultFontFamily,
          controlHeight: tokenProperties.defaultControlHeight,
        },
      }"
    >
      <a-input
        :value="internalValue"
        @input="updateValue"
        :addonBefore="addonBefore"
        :type="type"
        :placeholder="placeholder"
        :suffix="suffixTitle"
        :disabled="disabled"
      />
    </a-config-provider>
  </a-form-item>
</template>

<style lang="scss" scoped>
.mb-0 {
  margin-bottom: 0;
}
</style>
