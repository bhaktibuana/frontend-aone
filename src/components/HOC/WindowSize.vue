<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";

const isMobileView = ref<boolean>(false);

const calculateIsMobileView = (): boolean => {
  return document.documentElement.clientWidth <= 768;
};

const handleResizeWindow = (): void => {
  isMobileView.value = calculateIsMobileView();
};

onMounted(() => {
  isMobileView.value = calculateIsMobileView();
  window.addEventListener("resize", handleResizeWindow);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResizeWindow);
});

provide("isMobileView", isMobileView);
</script>

<template>
  <div ref="scrollWrapper">
    <slot :is-mobile-view="isMobileView"></slot>
  </div>
</template>
