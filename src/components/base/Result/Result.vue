<script setup lang="ts">
import { tokenProperties } from "@/utils/constants/tokenProperties";
import { PropType } from "vue";

defineProps({
  status: {
    type: String as PropType<
      "success" | "error" | "info" | "warning" | 404 | 403 | 500
    >,
    default: "info",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        fontFamily: tokenProperties.defaultFontFamily,
      },
    }"
  >
    <a-result :status="status">
      <template #extra>
        <div class="description-wrapper">
          <span class="title">{{ title }}</span>
          <span class="description">{{ description }}</span>
        </div>
        <slot name="extra"></slot>
      </template>
    </a-result>
  </a-config-provider>
</template>

<style scoped lang="scss">
.ant-result {
  padding: 0 !important;
}
.description-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-8;

  .title {
    font-size: $size-20;
    font-weight: 600;
    line-height: $size-28;

    @include breakpoint(md, max) {
      font-size: $size-16;
      line-height: $size-24;
    }
  }

  .description {
    color: $text-description;
    font-size: $size-16;
    line-height: $size-24;

    @include breakpoint(md, max) {
      font-size: $size-14;
      line-height: $size-22;
    }
  }
}
</style>
