<script setup lang="ts">
import { ref, watch } from "vue";

import { blankcard, visa, mastercard } from "@/assets/images";

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
const prefixTitle = ref<string>("unknown");

const updateValue = (event: { target: HTMLInputElement }): void => {
  const formattedNumber = cardNumberFormat(event.target.value);
  const rawValue = formattedNumber.split(" ").join("");
  prefixTitle.value = classifyInput(rawValue);

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

  return (
    numericInput
      .slice(0, 16)
      .match(/.{1,4}/g)
      ?.join(" ") || ""
  );
};

const classifyInput = (value: string): string => {
  const visaRegex = /^4/;
  const mastercardRegex = /^5[1-5]/;

  if (value.length < 4) {
    return "unknown";
  } else if (visaRegex.test(value)) {
    return "visa";
  } else if (mastercardRegex.test(value)) {
    return "mastercard";
  } else {
    return "unknown";
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
      >
        <template #prefix>
          <div class="card-image-wrapper">
            <img
              v-if="prefixTitle === 'unknown'"
              class="card-image"
              :src="blankcard"
              alt="blankcard"
            />
            <img
              v-if="prefixTitle === 'visa'"
              class="card-image"
              :src="visa"
              alt="visa"
            />
            <img
              v-if="prefixTitle === 'mastercard'"
              class="card-image"
              :src="mastercard"
              alt="mastercard"
            />
          </div>
        </template>
      </a-input>
    </a-config-provider>
  </a-form-item>
</template>

<style lang="scss" scoped>
.mb-0 {
  margin-bottom: 0;
}

.card-image-wrapper {
  width: 40px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  img.card-image {
    position: absolute;
    left: -4px;
    height: 60px;
  }
}
</style>
