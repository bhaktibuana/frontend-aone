<script setup lang="ts">
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { Rule } from "ant-design-vue/es/form";

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
  } else if (internalValue.value === "" || internalValue.value === undefined) {
    if (!(keyCode >= 48 && keyCode <= 49)) {
      event.preventDefault();
    }
  } else if (
    internalValue.value[0] === "1" &&
    internalValue.value.length === 1
  ) {
    if (!(keyCode >= 48 && keyCode <= 50)) {
      event.preventDefault();
    }
  }
};

const cardNumberFormat = (value: string): string => {
  const numericInput = value.replace(/\D/g, "");

  return (
    numericInput
      .slice(0, 4)
      .match(/.{1,2}/g)
      ?.join("/") || ""
  );
};

const customValidation = async (_rule: Rule, value: string): Promise<void> => {
  const year = value?.length === 5 ? parseInt(value.split("/")[1]) : 0;
  const currentYear = parseInt(dayjs().get("year").toString().slice(2, 4));
  const month = value?.length >= 2 ? parseInt(value.split("/")[0]) : 0;
  const currentMonth = dayjs().get("M");

  if (!props.required) return Promise.resolve();

  if (value === "" || value === undefined) {
    return Promise.reject(`${props.label} is required`);
  } else if (year < currentYear && year !== 0) {
    return Promise.reject("Your card has expired");
  } else if (year === currentYear && year !== 0) {
    if (month <= currentMonth && month !== 0) {
      return Promise.reject("Your card has expired");
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
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
        required,
        trigger: 'change',
        validator: customValidation,
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
