<script setup lang="ts">
import { PropType, ref } from "vue";

import { tokenProperties } from "@/utils/constants/tokenProperties";

import { IRadioButtonOptions } from "@/types";

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
    default: tokenProperties?.defaultFontSize,
  },
  value: {
    type: [String, Boolean],
    default: "",
  },
  options: {
    type: Array as PropType<IRadioButtonOptions[]>,
    default: [] as IRadioButtonOptions[],
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

const internalValue = ref<string | boolean>(props.value);

const customValidator = async (): Promise<void> => {
  if (!props.required) return Promise.resolve();
  if (!internalValue.value) {
    return Promise.reject(`${props.label} is required`);
  } else {
    return Promise.resolve();
  }
};

const updateValue = (event: { target: HTMLInputElement }): void => {
  internalValue.value = event?.target?.value;
  emit("update:value", event?.target?.value);
};
</script>

<template>
  <a-form-item
    :label="label"
    :name="name"
    class="mb-0"
    :rules="[
      {
        required,
        validator: customValidator,
        trigger: 'change',
      },
      ...rules,
    ]"
  >
    <a-config-provider
      :theme="{
        token: {
          fontSize: fontSize,
          fontFamily: tokenProperties?.defaultFontFamily,
          colorPrimary: tokenProperties?.colorPrimary,
        },
      }"
    >
      <a-radio-group
        :value="internalValue"
        button-style="solid"
        class="radio-wrapper"
        @change="updateValue"
      >
        <a-radio
          v-for="option in options"
          :key="option?.key"
          class="radio-class"
          :value="option?.key"
          :disabled="disabled"
        >
          {{ option?.label }}
        </a-radio>
      </a-radio-group>
    </a-config-provider>
  </a-form-item>
</template>

<style scoped lang="scss">
.mb-0 {
  margin-bottom: 0;
}

.radio-wrapper {
  display: flex;
  gap: $size-16;
  @include breakpoint(md, max) {
    gap: $size-12;
  }
  .radio-class {
    width: 100%;
    height: $size-40;
    padding-left: $size-16;
    border-radius: $size-4;
    border: $size-1 solid $input-border;
    background: $white;
    align-items: center;
    margin-inline-end: 0 !important;

    &:hover {
      border-color: $primary;
    }
  }
}
</style>
