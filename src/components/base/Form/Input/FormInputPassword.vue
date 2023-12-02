<script setup lang="ts">
import { ref, watch } from "vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: [String, Array],
    default: "",
  },
  fontSize: {
    type: Number,
    default: tokenProperties?.defaultFontSize,
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
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
          colorPrimaryHover: tokenProperties?.colorPrimary,
          borderRadius: tokenProperties?.defaultBorderRadius,
          fontSize: fontSize,
          fontFamily: tokenProperties?.defaultFontFamily,
          controlHeight: tokenProperties?.defaultControlHeight,
        },
      }"
    >
      <a-input-password
        autoComplete="new-password"
        :value="internalValue"
        @input="updateValue"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </a-config-provider>
  </a-form-item>
</template>

<style scoped lang="scss">
.mb-0 {
  margin-bottom: 0;
}
</style>
