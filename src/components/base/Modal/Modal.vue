<script setup lang="ts">
import { ref, watch } from "vue";

import BaseButton from "@/components/base/Button/Button.vue";
import BaseButtonOutline from "@/components/base/Button/ButtonOutline.vue";
import BaseLoader from "@/components/base/Loader/Loader.vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 800,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  cancelLabel: {
    type: String,
    default: "Cancel",
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  confirmLabel: {
    type: String,
    default: "Submit",
  },
  disableConfirm: {
    type: Boolean,
    default: false,
  },
  formId: {
    type: String,
    default: "",
  },
  confirmIcon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:open", "onConfirmAction"]);

const internalOpen = ref<boolean>(props.open);

watch(internalOpen, (newValue) => {
  emit("update:open", newValue);
});

watch(
  () => props.open,
  (newValue) => {
    internalOpen.value = newValue;
  }
);
</script>

<template>
  <a-modal
    v-model:open="internalOpen"
    :title="title"
    :width="width"
    :closable="closable"
    :onLoading="true"
  >
    <template #footer>
      <slot name="modalFooter">
        <div class="footer-wrapper">
          <div class="button-wrapper">
            <div @click="$emit('update:open', false)">
              <base-button-outline
                :label="cancelLabel"
                :disabled="loading"
                type="default"
              />
            </div>

            <div v-if="showConfirmButton" @click="$emit('onConfirmAction')">
              <base-button
                :form="formId"
                htmlType="submit"
                :label="confirmLabel"
                :disabled="disableConfirm || loading"
                :icon="confirmIcon"
              />
            </div>
          </div>
        </div>
      </slot>
    </template>

    <base-loader :spinning="loading">
      <slot></slot>
    </base-loader>
  </a-modal>
</template>

<style scoped lang="scss">
.footer-wrapper {
  width: 100%;
  display: flex;
  justify-content: end;
  border-top: $size-1 solid $border-color;
  padding-top: $size-16 !important;
  padding: 0 $size-24;

  .button-wrapper {
    display: flex;
    gap: $size-16;
    align-items: center;
  }
}
</style>
