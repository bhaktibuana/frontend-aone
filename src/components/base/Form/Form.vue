<script setup lang="ts">
import { tokenProperties } from "@/utils/constants/tokenProperties";

defineProps({
  id: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["onFormFinishAction"]);

const onSubmit = (isError: boolean, formData?: object): void => {
  emit("onFormFinishAction", isError, formData);
};

const onFinish = (formData: object): void => {
  onSubmit(false, formData);
};

const onFinishFailed = (): void => {
  onSubmit(true);
};
</script>

<template>
  <div class="wrapper">
    <a-form
      :id="id"
      layout="vertical"
      :model="formData"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-config-provider
        :theme="{
          token: {
            fontSize: tokenProperties.fontSize14,
            fontFamily: tokenProperties.defaultFontFamily,
          },
        }"
      >
        <div class="form-content">
          <slot></slot>
        </div>
      </a-config-provider>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}

.form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $size-16;
}
</style>
