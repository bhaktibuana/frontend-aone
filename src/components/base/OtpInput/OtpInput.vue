<script setup lang="ts">
import { PropType, onMounted, reactive } from "vue";

import { colors } from "@/assets/styles/colors";

import { tokenProperties } from "@/utils/constants/tokenProperties";

const props = defineProps({
  fontSize: {
    type: Number,
    default: tokenProperties.defaultFontSize,
  },
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  otpLength: {
    type: Number as PropType<4 | 5 | 6>,
    default: 4,
  },
  isOtpWrong: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:value"]);

const internalValue = reactive<string[]>([]);

const updateValue = (event: Event, index: number): void => {
  const newValue = (event.target as HTMLInputElement).value;
  internalValue[index] = newValue;
  emit("update:value", internalValue.join(""));

  if (internalValue[index].length > 0) {
    const inputElement = document.getElementById(`otpInput-${index + 1}`);
    inputElement?.focus();
  } else {
    const inputElement = document.getElementById(`otpInput-${index - 1}`);
    inputElement?.focus();
  }
};

const onKeypress = (event: KeyboardEvent, index: number): void => {
  const keyCode = event.keyCode || event.which;

  if (!(keyCode >= 48 && keyCode <= 57) && keyCode !== 8) {
    event.preventDefault();
  } else {
    internalValue[index] = "";
  }
};

const handlePaste = (event: ClipboardEvent): void => {
  event.preventDefault();
  const clipboardData = event.clipboardData;
  const pastedText =
    clipboardData?.getData("text").slice(0, props.otpLength) || "";
  const numericRegex = /^\d+$/;

  if (numericRegex.test(pastedText) && pastedText.length > 0) {
    for (let i = 0; i < props.otpLength; i++) {
      internalValue[i] = pastedText[i];
    }
    emit("update:value", pastedText);
    const inputElement = document.getElementById(
      `otpInput-${props.otpLength - 1}`
    );
    inputElement?.focus();
  }
};

onMounted(() => {
  for (let i = 0; i < props.otpLength; i++) {
    internalValue.push("");
  }
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimaryHover: tokenProperties.colorPrimary,
        colorBorder: isOtpWrong ? colors.danger : colors.inputBorder,
        borderRadius: tokenProperties.defaultBorderRadius,
        fontSize: fontSize,
        fontFamily: tokenProperties.defaultFontFamily,
        controlHeight: tokenProperties.defaultControlHeight,
      },
    }"
  >
    <div class="input-group-wrapper">
      <div
        :class="`input-wrapper ${isOtpWrong && 'shake'}`"
        v-for="i of otpLength"
      >
        <a-input
          :id="`otpInput-${i - 1}`"
          style="text-align: center"
          type="text"
          maxLength="1"
          :value="internalValue[i - 1]"
          :disabled="disabled"
          @input="(event: Event) => updateValue(event, i - 1)"
          @keypress="(event: KeyboardEvent) => onKeypress(event, i - 1)"
          @paste="handlePaste"
        />
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped lang="scss">
.mb-0 {
  margin-bottom: 0;
}

.input-group-wrapper {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: $size-16;
}

.input-wrapper {
  width: $size-34;

  &.shake {
    animation: shake 0.5s ease-in-out;
    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-$size-5);
      }
      50% {
        transform: translateX($size-5);
      }
      75% {
        transform: translateX(-$size-5);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
}
</style>
