<script setup lang="ts">
import { onMounted, onUnmounted, provide, reactive, ref, watch } from "vue";

import { IScreenSize } from "@/types";

const emit = defineEmits(["onMobileViewChange", "onScreenSizeChange"]);

const isMobileView = ref<boolean>(false);
const screenSize = reactive<IScreenSize>({
  width: 0,
  height: 0,
});

const calculateIsMobileView = (): boolean => {
  screenSize.width = document.documentElement.clientWidth;
  screenSize.height = document.documentElement.clientHeight;
  return document.documentElement.clientWidth <= 768;
};

const handleResizeWindow = (): void => {
  isMobileView.value = calculateIsMobileView();
};

watch(
  isMobileView,
  (newValue) => {
    emit("onMobileViewChange", newValue);
  },
  { immediate: true }
);

watch(
  () => screenSize,
  (newValue) => {
    emit("onScreenSizeChange", newValue);
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  isMobileView.value = calculateIsMobileView();
  window.addEventListener("resize", handleResizeWindow);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResizeWindow);
});

provide("isMobileView", isMobileView);
provide("screenSize", screenSize);
</script>

<template>
  <div ref="scrollWrapper">
    <slot :is-mobile-view="isMobileView" :screenSize="screenSize"></slot>
  </div>
</template>
