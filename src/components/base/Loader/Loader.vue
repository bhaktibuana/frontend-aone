<script setup lang="ts">
import { tokenProperties } from "@/utils/constants/tokenProperties";

defineProps({
  spinning: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: tokenProperties?.colorPrimary,
      },
    }"
  >
    <a-spin :spinning="spinning">
      <slot></slot>
    </a-spin>
  </a-config-provider>
</template>
