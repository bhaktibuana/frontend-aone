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
    default: tokenProperties.defaultFontSize,
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
  const formattedNumber = cardNumberFormat(event.target.value);
  const rawValue = formattedNumber.split(" ").join("");

  internalValue.value = formattedNumber;
  emit("update:value", rawValue);
};

const onKeypress = (event: KeyboardEvent): void => {
  const keyCode = event.keyCode || event.which;

  if (!(keyCode >= 48 && keyCode <= 57) && keyCode !== 8) {
    event.preventDefault();
  }
};

const cardNumberFormat = (value: string): string => {
  const numericInput = value.replace(/\D/g, "");

  return numericInput.slice(0, 3);
};

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = cardNumberFormat(newValue);
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
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        @keypress="onKeypress"
      />
    </a-config-provider>
  </a-form-item>
</template>

<style lang="scss" scoped>
.mb-0 {
  margin-bottom: 0;
}
</style>
